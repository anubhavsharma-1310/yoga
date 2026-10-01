'use client';

import React from 'react';
import { Calendar, Mail } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface CtaSectionProps {
  onBookClass: () => void;
  onContactUs: () => void;
}

export function CtaSection({ onBookClass, onContactUs }: CtaSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-[#F1EDE5] relative overflow-hidden border-t border-[#E5DFD4]">
      {/* Subtle organic ambient backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FAF8F5]/70 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <ScrollReveal direction="up">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7E8A79]" />
            <span>JOIN THE SANCTUARY</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-[3.75rem] text-[#1E1C1A] font-normal leading-[1.1] mb-6 tracking-tight">
            Your journey to balance{' '}
            <span className="italic text-[#46413A] font-light">begins here.</span>
          </h2>

          {/* Supporting text */}
          <p className="text-[15px] sm:text-[17px] text-[#554F47] font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Take a moment for yourself. Join a community dedicated to mindful movement, breath-led vitality, and meaningful wellbeing.
          </p>
        </ScrollReveal>

        {/* Buttons with clean responsive alignment */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookClass}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-all duration-300 shadow-[0_4px_16px_rgba(35,32,29,0.08)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5 opacity-80" />
              <span>Book Your First Class</span>
            </button>
            <button
              onClick={onContactUs}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#FAF8F5] text-[#1E1C1A] border border-[#D5CDBD] rounded-full hover:bg-white hover:border-[#BEB5A4] transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 opacity-80" />
              <span>Contact Us</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
