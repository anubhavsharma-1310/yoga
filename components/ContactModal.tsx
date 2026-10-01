'use client';

import React, { useState } from 'react';
import { X, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { LotusIcon } from './icons/LotusIcon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('General Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
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
          aria-label="Close contact modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#EAEFE8] border border-[#CCD8C8] text-[#55624E] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 stroke-[1.6]" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#7A7165] font-semibold block mb-1">
              MESSAGE SENT
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-normal mb-3">
              Thank you for reaching out
            </h3>
            <p className="text-sm text-[#554F47] max-w-sm mx-auto mb-8 font-light leading-relaxed">
              Our studio care coordinator will reply to <strong className="font-medium text-[#1E1C1A]">{email}</strong> within one business day.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#7A7165]">
              <LotusIcon className="w-5 h-5 stroke-[1.4]" />
              <span className="text-[11px] uppercase tracking-[0.26em] font-semibold">
                STUDIO CONNECT
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] font-normal mb-1.5">
              Get in Touch
            </h3>
            <p className="text-xs text-[#7A7165] font-light mb-6">
              Have questions about class suitability, private sessions, or corporate mindfulness retreats?
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Maya Lin"
                    className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#DDD5C8] rounded-xl text-sm focus:outline-none focus:border-[#23201D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#DDD5C8] rounded-xl text-sm focus:outline-none focus:border-[#23201D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#DDD5C8] rounded-xl text-sm focus:outline-none focus:border-[#23201D]"
                >
                  <option value="General Question">General Question</option>
                  <option value="Private 1-on-1 Session">Private 1-on-1 Session</option>
                  <option value="Upcoming Retreats">Upcoming Retreats</option>
                  <option value="Corporate Wellness">Corporate Wellness & Workshops</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#696259] font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we support your practice today?"
                  className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#DDD5C8] rounded-xl text-sm focus:outline-none focus:border-[#23201D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-colors shadow-[0_4px_14px_rgba(35,32,29,0.08)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-[#ECE5DA] grid grid-cols-2 gap-3 text-[11px] text-[#7A7165]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C8275]" />
                <span>hello@yogaharmony.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8C8275]" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

