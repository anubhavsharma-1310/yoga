'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Check,
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LotusIcon } from './icons/LotusIcon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedClass?: string;
}

export function BookingModal({ isOpen, onClose, preselectedClass }: BookingModalProps) {
  const [selectedClass, setSelectedClass] = useState(preselectedClass || 'Morning Flow');
  const [prevPreselected, setPrevPreselected] = useState(preselectedClass);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('07:30 AM');
  const [level, setLevel] = useState('All Levels');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ fullName?: string; email?: string }>({});
  const [bookingRef, setBookingRef] = useState('');

  // Sync state with preselectedClass prop during render (React 19 pattern)
  if (preselectedClass !== prevPreselected) {
    setPrevPreselected(preselectedClass);
    if (preselectedClass) {
      setSelectedClass(preselectedClass);
    }
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const classesList = [
    { name: 'Morning Flow', desc: 'Gentle sunrise mobility & breath' },
    { name: 'Deep Stretch', desc: 'Restorative bolsters & fascia release' },
    { name: 'Mindful Vinyasa', desc: 'Dynamic breath-movement flow' },
    { name: 'Breathwork & Sound', desc: 'Pranayama & Tibetan bowls' },
    { name: 'Restorative Yin', desc: 'Stillness, calm & evening reset' },
  ];

  const dates = [
    { label: 'Today', day: 'Wed', date: 'Oct 1' },
    { label: 'Tomorrow', day: 'Thu', date: 'Oct 2' },
    { label: 'Friday', day: 'Fri', date: 'Oct 3' },
    { label: 'Saturday', day: 'Sat', date: 'Oct 4' },
    { label: 'Sunday', day: 'Sun', date: 'Oct 5' },
  ];

  const timeSlots = ['07:30 AM', '09:00 AM', '12:00 PM', '05:30 PM', '07:00 PM'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    // Validation
    const errors: { fullName?: string; email?: string } = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          practice: selectedClass,
          day: selectedDate,
          time: selectedTime,
          fullName: trimmedName,
          email: trimmedEmail,
          experienceLevel: level,
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(
          data.message || 'Unable to save your booking right now. Please try again.'
        );
        setIsSubmitting(false);
        return;
      }

      setBookingRef(data.bookingRef || `YH-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const errorText =
        err instanceof Error
          ? err.message
          : 'Network error occurred while submitting your booking. Please try again.';
      setErrorMessage(errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFieldErrors({});
    setFullName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-form-title"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-xl w-full bg-[#FAF8F5] rounded-3xl border border-[#ECE5DA] shadow-2xl p-6 sm:p-8 my-auto text-[#1E1C1A] max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#7A7165] hover:text-[#1E1C1A] hover:bg-[#F2ECE1] transition-colors cursor-pointer z-10"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#EAEFE8] border border-[#CCD8C8] text-[#55624E] flex items-center justify-center mx-auto mb-5 shadow-xs">
                <CheckCircle2 className="w-8 h-8 stroke-[1.6]" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.24em] text-[#55624E] font-semibold block mb-1">
                COMPLIMENTARY FIRST VISIT CONFIRMED
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-normal mb-3">
                Your slot has been booked successfully!
              </h3>

              <p className="text-sm text-[#554F47] max-w-md mx-auto mb-6 leading-relaxed font-light">
                Your booking information has been registered and synced with our studio roster. A welcome package and preparation guide has been dispatched to{' '}
                <strong className="font-medium text-[#1E1C1A]">{email}</strong>.
              </p>

              {/* Summary card */}
              <div className="bg-[#F5F0E6] rounded-2xl p-5 border border-[#E4DCD0] text-left max-w-md mx-auto mb-8 space-y-2.5 text-xs text-[#554F47]">
                <div className="flex justify-between items-center border-b border-[#E8E1D5] pb-2">
                  <span className="text-[#7A7165]">Class Session:</span>
                  <span className="font-medium text-[#1E1C1A]">{selectedClass}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8E1D5] pb-2">
                  <span className="text-[#7A7165]">Schedule:</span>
                  <span className="font-medium text-[#1E1C1A]">
                    {selectedDate} • {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8E1D5] pb-2">
                  <span className="text-[#7A7165]">Practitioner:</span>
                  <span className="font-medium text-[#1E1C1A]">{fullName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8E1D5] pb-2">
                  <span className="text-[#7A7165]">Experience Level:</span>
                  <span className="font-medium text-[#1E1C1A]">{level}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8E1D5] pb-2">
                  <span className="text-[#7A7165]">Status:</span>
                  <span className="font-medium text-[#55624E] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55624E]" />
                    Confirmed (Synced with Google Sheet)
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[#7A7165]">Reservation Pass:</span>
                  <span className="font-mono font-medium text-[#55624E]">{bookingRef}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 mb-2 text-[#7A7165]">
                <LotusIcon className="w-5 h-5 stroke-[1.4] text-[#55624E]" />
                <span className="text-[11px] uppercase tracking-[0.26em] font-semibold text-[#55624E]">
                  COMPLIMENTARY FIRST VISIT
                </span>
              </div>
              <h3 id="booking-form-title" className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] font-normal mb-1.5">
                Book Your First Class
              </h3>
              <p className="text-xs text-[#7A7165] mb-5 font-light leading-relaxed">
                Step into a serene space. Organic herbal tea, mats, and bolsters are warmly provided.
              </p>

              {/* Error banner if submission failed */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-[#FDF2F2] border border-[#F6D0D0] text-[#9E2A2B] text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Booking could not be recorded</p>
                    <p className="mt-0.5 text-[11px] text-[#A83232] font-light leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-[#9E2A2B] hover:text-[#501314] cursor-pointer p-0.5"
                    aria-label="Dismiss error"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Practice Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-2">
                    1. Choose Practice
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {classesList.map((cls) => {
                      const isSelected = selectedClass === cls.name;
                      return (
                        <button
                          type="button"
                          key={cls.name}
                          disabled={isSubmitting}
                          onClick={() => setSelectedClass(cls.name)}
                          className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#23201D] text-[#FAF8F5] border-[#23201D] shadow-xs'
                              : 'bg-[#FDFCFB] text-[#554F47] border-[#ECE5DA] hover:bg-[#F6F2EA]'
                          } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          <div>
                            <span className="block text-xs font-medium">{cls.name}</span>
                            <span
                              className={`block text-[10px] mt-0.5 ${
                                isSelected ? 'text-[#D2C9BC]' : 'text-[#8C8275]'
                              }`}
                            >
                              {cls.desc}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#FAF8F5] shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Date Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-2">
                    2. Select Day
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {dates.map((d) => {
                      const isSelected = selectedDate === d.label;
                      return (
                        <button
                          type="button"
                          key={d.label}
                          disabled={isSubmitting}
                          onClick={() => setSelectedDate(d.label)}
                          className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#23201D] text-[#FAF8F5] border-[#23201D] shadow-xs'
                              : 'bg-[#FDFCFB] text-[#554F47] border-[#ECE5DA] hover:bg-[#F6F2EA]'
                          } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          <span className="block text-[10px] uppercase font-mono opacity-75">{d.day}</span>
                          <span className="block text-xs font-semibold my-0.5">{d.date}</span>
                          <span className="block text-[9px] opacity-75 hidden sm:block">{d.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Time Slots */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-2">
                    3. Select Time Slot
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          disabled={isSubmitting}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3.5 py-1.5 text-xs rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#55624E] text-[#FAF8F5] border-[#55624E] shadow-2xs'
                              : 'bg-[#FAF8F5] text-[#554F47] border-[#DDD5C8] hover:border-[#8C8275]'
                          } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          <Clock className="w-3 h-3 opacity-70" />
                          <span>{time}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Practitioner Details */}
                <div className="pt-1 border-t border-[#ECE5DA]">
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-3">
                    4. Your Information
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
                        <input
                          type="text"
                          required
                          disabled={isSubmitting}
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (fieldErrors.fullName) {
                              setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
                            }
                          }}
                          placeholder="Your Full Name *"
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-[#FDFCFB] border rounded-xl text-sm focus:outline-none focus:border-[#23201D] text-[#1E1C1A] ${
                            fieldErrors.fullName ? 'border-[#E05252] bg-[#FFF8F8]' : 'border-[#DDD5C8]'
                          } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      {fieldErrors.fullName && (
                        <p className="text-[11px] text-[#E05252] mt-1 ml-1 font-light">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
                        <input
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (fieldErrors.email) {
                              setFieldErrors((prev) => ({ ...prev, email: undefined }));
                            }
                          }}
                          placeholder="Email Address *"
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-[#FDFCFB] border rounded-xl text-sm focus:outline-none focus:border-[#23201D] text-[#1E1C1A] ${
                            fieldErrors.email ? 'border-[#E05252] bg-[#FFF8F8]' : 'border-[#DDD5C8]'
                          } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-[11px] text-[#E05252] mt-1 ml-1 font-light">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
                      <input
                        type="tel"
                        disabled={isSubmitting}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile Number (optional, for SMS class reminders)"
                        className={`w-full pl-10 pr-3.5 py-2.5 bg-[#FDFCFB] border border-[#DDD5C8] rounded-xl text-sm focus:outline-none focus:border-[#23201D] text-[#1E1C1A] ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Experience Level */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1.5">
                    Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['First-Timer', 'Occasional', 'Regular / Advanced'].map((lvl) => (
                      <button
                        type="button"
                        key={lvl}
                        disabled={isSubmitting}
                        onClick={() => setLevel(lvl)}
                        className={`py-2 px-2 text-center rounded-xl border transition-all cursor-pointer ${
                          level === lvl
                            ? 'border-[#23201D] bg-[#F1EDE5] text-[#1E1C1A] font-medium'
                            : 'border-[#ECE5DA] bg-[#FDFCFB] text-[#7A7165]'
                        } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-all duration-300 shadow-[0_4px_16px_rgba(35,32,29,0.1)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-[#E6DFD3] animate-spin" />
                        <span>Reserving Slot & Syncing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#E6DFD3]" />
                        <span>Confirm Free First Class Reservation</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-[#7A7165] font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#55624E]" />
                    <span>100% Complimentary First Session • No credit card needed</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
