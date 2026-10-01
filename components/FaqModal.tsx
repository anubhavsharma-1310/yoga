'use client';

import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { LotusIcon } from './icons/LotusIcon';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'faq' | 'privacy' | 'terms';
}

export function FaqModal({ isOpen, onClose, type = 'faq' }: FaqModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'I am a complete beginner. Which class should I begin with?',
      a: 'We warmly suggest starting with "Deep Stretch" or "Morning Flow". Both classes move at an approachable pace with comprehensive instruction on posture alignment, prop usage, and breathing techniques.',
    },
    {
      q: 'Do I need to bring my own yoga mat and props?',
      a: 'We provide complimentary natural cork mats, organic cotton bolsters, blocks, and straps. However, you are always welcome to bring your personal mat if you prefer.',
    },
    {
      q: 'What should I wear to studio practice?',
      a: 'Comfortable, breathable athletic or loungewear that allows you to move freely. Shoes and socks are left in our shoe sanctuary cubbies outside the studio door.',
    },
    {
      q: 'What is your cancellation and booking policy?',
      a: 'You can cancel or reschedule any class booking up to 2 hours prior to start time without penalty directly through your confirmation link.',
    },
    {
      q: 'Do you offer private 1-on-1 sessions or sound healing?',
      a: 'Yes, our certified master teachers offer personalized 1-on-1 consultations, therapeutic yoga rehab, and private Tibetan singing bowl sound immersions upon request.',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#FAF8F5] rounded-3xl border border-[#ECE5DA] shadow-2xl p-7 sm:p-9 my-8 text-[#1E1C1A]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A7165] hover:text-[#1E1C1A] hover:bg-[#F2ECE1] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {type === 'faq' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#7A7165]">
              <LotusIcon className="w-5 h-5 stroke-[1.4]" />
              <span className="text-[11px] uppercase tracking-[0.26em] font-semibold">
                STUDIO QUESTIONS
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] font-normal mb-6">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#ECE5DB] rounded-2xl overflow-hidden bg-[#FAF8F5]"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-4.5 text-left flex items-center justify-between gap-4 hover:bg-[#F6F2EA]/60 transition-colors"
                    >
                      <span className="font-serif text-base sm:text-lg text-[#1E1C1A] font-normal">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7A7165] transition-transform duration-200 shrink-0 stroke-[1.5] ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4.5 pb-4 pt-1 text-sm text-[#554F47] font-light leading-relaxed border-t border-[#F1EDE5] bg-[#F6F2EA]/35">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div>
            <span className="text-[11px] uppercase tracking-[0.26em] text-[#7A7165] font-semibold block mb-2">
              POLICIES
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] font-normal mb-4">
              Privacy Policy
            </h3>
            <div className="text-sm text-[#554F47] space-y-4 font-light leading-relaxed">
              <p>
                At Yoga Harmony, we deeply respect your personal privacy. We collect only the information necessary to provide reservations, confirm class schedules, and ensure personal wellness safety.
              </p>
              <p>
                We do not sell, rent, or lease your personal information to third parties. All booking information is processed through secure, encrypted channels.
              </p>
              <p>
                You may request access to or deletion of your personal records at any time by writing to hello@yogaharmony.com.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <span className="text-[11px] uppercase tracking-[0.26em] text-[#7A7165] font-semibold block mb-2">
              STUDIO ETIQUETTE &amp; TERMS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] font-normal mb-4">
              Terms of Sanctuary
            </h3>
            <div className="text-sm text-[#554F47] space-y-4 font-light leading-relaxed">
              <p>
                To preserve a peaceful, restorative environment for all practitioners, we kindly ask that shoes be removed prior to entering the practice floor, and all mobile devices be placed on silent mode.
              </p>
              <p>
                Please arrive 10 minutes prior to class start. Doors close promptly at start time to ensure undistracted meditation and opening breathwork.
              </p>
              <p>
                Practitioners are encouraged to listen to their own bodies and take resting poses whenever needed.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#ECE5DA] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs uppercase tracking-[0.16em] bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833]"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

