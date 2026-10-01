'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, User, Mail, ShieldCheck } from 'lucide-react';
import { LotusIcon } from './icons/LotusIcon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedClass?: string;
}

export function BookingModal({ isOpen, onClose, preselectedClass }: BookingModalProps) {
  const [selectedClass, setSelectedClass] = useState(preselectedClass || 'Morning Flow');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('07:30 AM');
  const [level, setLevel] = useState('All Levels');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const classesList = [
    'Morning Flow',
    'Deep Stretch',
    'Mindful Vinyasa',
    'Breathwork & Sound',
    'Restorative Yin',
  ];

  const dates = [
    { label: 'Today', sub: 'Oct 1' },
    { label: 'Tomorrow', sub: 'Oct 2' },
    { label: 'Friday', sub: 'Oct 3' },
    { label: 'Saturday', sub: 'Oct 4' },
    { label: 'Sunday', sub: 'Oct 5' },
  ];

  const timeSlots = ['07:30 AM', '09:00 AM', '12:00 PM', '05:30 PM', '07:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    const ref = `YH-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[#FAF8F5] rounded-3xl border border-[#ECE5DA] shadow-2xl p-7 sm:p-9 my-8 text-[#1E1C1A]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A7165] hover:text-[#1E1C1A] hover:bg-[#F2ECE1] transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#EAEFE8] border border-[#CCD8C8] text-[#55624E] flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 stroke-[1.6]" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.24em] text-[#7A7165] font-semibold block mb-1">
              RESERVATION CONFIRMED
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-normal mb-3">
              We look forward to welcoming you
            </h3>

            <p className="text-sm text-[#554F47] max-w-md mx-auto mb-6 leading-relaxed font-light">
              A confirmation email with studio arrival details and directions has been sent to{' '}
              <strong className="font-medium text-[#1E1C1A]">{email}</strong>.
            </p>

            {/* Booking Summary Box */}
            <div className="bg-[#F6F2EA] rounded-2xl p-5 border border-[#E5DED2] text-left max-w-sm mx-auto mb-8 space-y-2 text-xs text-[#554F47]">
              <div className="flex justify-between border-b border-[#ECE5DA] pb-2">
                <span className="text-[#7A7165]">Class:</span>
                <span className="font-medium text-[#1E1C1A]">{selectedClass}</span>
              </div>
              <div className="flex justify-between border-b border-[#ECE5DA] pb-2">
                <span className="text-[#7A7165]">Date & Time:</span>
                <span className="font-medium text-[#1E1C1A]">
                  {selectedDate} • {selectedTime}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#ECE5DA] pb-2">
                <span className="text-[#7A7165]">Practitioner:</span>
                <span className="font-medium text-[#1E1C1A]">{fullName}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#7A7165]">Reservation ID:</span>
                <span className="font-mono font-medium text-[#55624E]">{bookingRef}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 text-[#7A7165]">
              <LotusIcon className="w-5 h-5 stroke-[1.4]" />
              <span className="text-[11px] uppercase tracking-[0.26em] font-semibold">
                RESERVE YOUR MAT
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] font-normal mb-1.5">
              Book a Mindful Practice
            </h3>
            <p className="text-xs text-[#7A7165] mb-6 font-light">
              Complimentary organic herbal tea and sanitized cork mats provided for every session.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Select Practice */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-2">
                  Select Practice
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {classesList.map((cls) => (
                    <button
                      type="button"
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`px-3 py-2 text-xs rounded-xl border text-center transition-all cursor-pointer ${
                        selectedClass === cls
                          ? 'bg-[#23201D] text-[#FAF8F5] border-[#23201D]'
                          : 'bg-[#FDFCFB] text-[#554F47] border-[#ECE5DA] hover:bg-[#F6F2EA]'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Date */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-2">
                  Select Day
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {dates.map((d) => (
                    <button
                      type="button"
                      key={d.label}
                      onClick={() => setSelectedDate(d.label)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDate === d.label
                          ? 'bg-[#23201D] text-[#FAF8F5] border-[#23201D]'
                          : 'bg-[#FDFCFB] text-[#554F47] border-[#ECE5DA] hover:bg-[#F6F2EA]'
                      }`}
                    >
                      <span className="block text-xs font-medium">{d.label}</span>
                      <span className="block text-[10px] opacity-75">{d.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time Slot */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-2">
                  Select Time
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3.5 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
                        selectedTime === time
                          ? 'bg-[#55624E] text-[#FAF8F5] border-[#55624E]'
                          : 'bg-[#FAF8F5] text-[#554F47] border-[#D8D0C3] hover:border-[#8C8275]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1.5">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Clara Bennett"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FDFCFB] border border-[#DDD5C8] rounded-xl text-sm focus:outline-none focus:border-[#23201D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clara@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FDFCFB] border border-[#DDD5C8] rounded-xl text-sm focus:outline-none focus:border-[#23201D]"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1.5">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['First-Timer', 'Occasional', 'Regular / Advanced'].map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`py-2 px-2 text-center rounded-xl border transition-all cursor-pointer ${
                        level === lvl
                          ? 'border-[#23201D] bg-[#F1EDE5] text-[#1E1C1A] font-medium'
                          : 'border-[#ECE5DA] bg-[#FDFCFB] text-[#7A7165]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-all duration-300 shadow-[0_4px_14px_rgba(35,32,29,0.08)] cursor-pointer"
                >
                  Confirm Reservation (Complimentary First Visit)
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-[#7A7165] font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#55624E]" />
                  <span>No credit card required • Cancel anytime up to 2 hours prior</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

