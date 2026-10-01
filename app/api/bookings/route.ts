import { NextRequest, NextResponse } from 'next/server';

interface BookingPayload {
  practice: string;
  day: string;
  time: string;
  fullName: string;
  email: string;
  experienceLevel: string;
  phone?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getGoogleWebhookUrl(): string {
  const envVal = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim();
  if (envVal.startsWith('http://') || envVal.startsWith('https://')) {
    return envVal;
  }
  if (envVal.startsWith('AKfycb')) {
    return `https://script.google.com/macros/s/${envVal}/exec`;
  }
  // Fallback to the configured Google Apps Script Web App deployed by the user
  return 'https://script.google.com/macros/s/AKfycbxcclsE_J9Ii1qZOev34KGf9dJLfCiAm1XO1cOHT9NNxZEWCwKeTPy6MNT3MelyotKJ/exec';
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json();
    const { practice, day, time, fullName, email, experienceLevel, phone } = body;

    // 1. Rigorous input validation
    if (!practice || typeof practice !== 'string' || !practice.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please select a practice/class session.' },
        { status: 400 }
      );
    }

    if (!day || typeof day !== 'string' || !day.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please select a booking day.' },
        { status: 400 }
      );
    }

    if (!time || typeof time !== 'string' || !time.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please select a class time slot.' },
        { status: 400 }
      );
    }

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide your full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!experienceLevel || typeof experienceLevel !== 'string' || !experienceLevel.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please choose your experience level.' },
        { status: 400 }
      );
    }

    // 2. Generate automatic metadata
    const bookingRef = `YH-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    // Formatted readable date/time (e.g. "2026-10-01 12:35 PM UTC")
    const bookingDateTime = `${now.toISOString().replace('T', ' ').substring(0, 19)} UTC`;
    const bookingStatus = 'Confirmed';

    const sheetsPayload = {
      practice: practice.trim(),
      day: day.trim(),
      time: time.trim(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      experienceLevel: experienceLevel.trim(),
      phone: phone ? phone.trim() : '',
      bookingDateTime,
      bookingStatus,
      bookingId: bookingRef,
    };

    // 3. Resolve Google Sheets Webhook URL
    const googleWebhookUrl = getGoogleWebhookUrl();

    if (!googleWebhookUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Google Sheets Webhook URL is not configured. Please add the GOOGLE_SHEETS_WEBHOOK_URL environment variable to your deployment settings.',
        },
        { status: 503 }
      );
    }

    // 4. Forward to Google Apps Script Web App securely from the server
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20-second timeout

    try {
      // Step A: POST payload to Google Apps Script endpoint
      // Google Apps Script processes doPost(e) and returns a 302 redirect with Location
      const initialResponse = await fetch(googleWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(sheetsPayload),
        signal: controller.signal,
        redirect: 'manual', // Manually capture redirect to follow with clean GET
      });

      let responseText = '';
      let isSuccess = initialResponse.ok;

      // Step B: Follow redirect if Google Apps Script returned a 302/301/307 Location
      if (
        initialResponse.status === 302 ||
        initialResponse.status === 301 ||
        initialResponse.status === 307
      ) {
        const redirectUrl = initialResponse.headers.get('location');
        if (redirectUrl) {
          const redirectedResponse = await fetch(redirectUrl, {
            method: 'GET',
            signal: controller.signal,
          });
          isSuccess = redirectedResponse.ok;
          responseText = await redirectedResponse.text();
        } else {
          responseText = await initialResponse.text();
        }
      } else {
        responseText = await initialResponse.text();
      }

      clearTimeout(timeoutId);

      let resultData: { success?: boolean; message?: string } = {};

      try {
        resultData = JSON.parse(responseText);
      } catch {
        // If response is not JSON
        if (!isSuccess) {
          return NextResponse.json(
            {
              success: false,
              message: `Google Sheets endpoint returned status ${initialResponse.status}. Please check your Google Apps Script deployment.`,
            },
            { status: 502 }
          );
        }
      }

      if (resultData.success === false) {
        return NextResponse.json(
          {
            success: false,
            message: resultData.message || 'Unable to save booking to Google Sheets.',
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Your slot has been booked successfully!',
        bookingRef,
        booking: sheetsPayload,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      const errorMessage = isTimeout
        ? 'Request to Google Sheets timed out after 20 seconds. Please verify your Apps Script Web App.'
        : err instanceof Error
        ? err.message
        : 'Network error connecting to Google Sheets endpoint.';

      return NextResponse.json(
        {
          success: false,
          message: `Unable to save booking: ${errorMessage}`,
        },
        { status: 504 }
      );
    }
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? `Invalid request payload: ${err.message}`
            : 'Internal server error processing booking.',
      },
      { status: 500 }
    );
  }
}
