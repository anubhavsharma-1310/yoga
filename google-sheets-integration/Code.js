/**
 * Google Apps Script Web App for Yoga Harmony Booking System
 * 
 * Instructions:
 * 1. Open your Google Sheet (or create a new one at sheets.new).
 * 2. In the top menu, go to: Extensions > Apps Script.
 * 3. Replace any code in the editor with this script.
 * 4. Click 'Deploy' > 'New deployment'.
 * 5. Select type: 'Web app'.
 * 6. Set Description: 'Yoga Harmony Bookings Webhook'.
 * 7. Set 'Execute as': 'Me' (your Google account).
 * 8. Set 'Who has access': 'Anyone' (essential so your server can POST).
 * 9. Click 'Deploy' and copy the 'Web app URL'.
 * 10. Add that URL as GOOGLE_SHEETS_WEBHOOK_URL in your Vercel Environment Variables.
 */

function doPost(e) {
  // Use LockService to prevent race conditions during simultaneous bookings
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    lockAcquired = lock.tryLock(15000); // Wait up to 15 seconds
    if (!lockAcquired) {
      return jsonResponse({
        success: false,
        message: "Server is busy recording another booking. Please try again."
      });
    }

    var sheet = getBookingsSheet();
    ensureHeaders(sheet);

    // Parse incoming JSON data
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        return jsonResponse({
          success: false,
          message: "Malformed JSON payload: " + parseErr.message
        });
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      return jsonResponse({
        success: false,
        message: "No booking data received in request."
      });
    }

    // Validate required fields
    if (!data.fullName || !data.email || !data.practice) {
      return jsonResponse({
        success: false,
        message: "Missing required fields (fullName, email, or practice)."
      });
    }

    // Format fields matching the exact required 8 columns:
    // Practice | Day | Time | Full Name | Email Address | Experience Level | Booking Date/Time | Booking Status
    var practice = String(data.practice || "").trim();
    var day = String(data.day || "").trim();
    var time = String(data.time || "").trim();
    var fullName = String(data.fullName || "").trim();
    var email = String(data.email || "").trim();
    var experienceLevel = String(data.experienceLevel || "All Levels").trim();
    
    // Automatically generate timestamp if not provided
    var bookingDateTime = data.bookingDateTime
      ? String(data.bookingDateTime)
      : Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "UTC", "yyyy-MM-dd HH:mm:ss 'UTC'");
      
    var bookingStatus = String(data.bookingStatus || "Confirmed").trim();

    // Append as a new row in exact column sequence
    sheet.appendRow([
      practice,
      day,
      time,
      fullName,
      email,
      experienceLevel,
      bookingDateTime,
      bookingStatus
    ]);

    return jsonResponse({
      success: true,
      message: "Booking saved successfully",
      bookingId: data.bookingId || ""
    });

  } catch (error) {
    return jsonResponse({
      success: false,
      message: "Unable to save booking: " + error.toString()
    });
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}

function doGet(e) {
  return jsonResponse({
    success: true,
    message: "Yoga Harmony Bookings Webhook is active and listening for POST requests."
  });
}

/**
 * Gets or creates the Bookings sheet
 */
function getBookingsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Bookings") || ss.getActiveSheet();
  return sheet;
}

/**
 * Ensures Row 1 contains the exact 8 headers requested
 */
function ensureHeaders(sheet) {
  var requiredHeaders = [
    "Practice",
    "Day",
    "Time",
    "Full Name",
    "Email Address",
    "Experience Level",
    "Booking Date/Time",
    "Booking Status"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(requiredHeaders);
    var headerRange = sheet.getRange(1, 1, 1, requiredHeaders.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#F3ECE3");
    headerRange.setFontColor("#1E1C1A");
    sheet.setFrozenRows(1);
    
    // Auto-resize columns for readability
    for (var i = 1; i <= requiredHeaders.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}

/**
 * Utility to return JSON with CORS headers
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
