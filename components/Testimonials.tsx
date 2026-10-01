'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  duration: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Yoga Harmony has completely transformed my relationship with movement. Every class leaves me feeling stronger, calmer, and more present.',
    author: 'Sarah L.',
    role: 'Happy Member',
    duration: 'Practicing for 2 years',
  },
  {
    quote:
      'Beautiful space, thoughtful instructors, and an incredibly welcoming community. It feels like stepping into a serene sanctuary every single day.',
    author: 'Maya R.',
    role: 'Yoga Practitioner',
    duration: 'Practicing for 1 year',
  },
  {
    quote:
      'I started as a complete beginner and now yoga is one of the most important parts of my weekly routine. The instructors meet you exactly where you are.',
    author: 'Emily K.',
    role: 'Happy Member',
    duration: 'Practicing for 3 years',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#F6F2EA]/45 border-t border-[#ECE5DA] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
        {/* Eyebrow */}
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-4 block">
          VOICES OF HARMONY
        </span>

        {/* Minimal Quote Icon */}
        <div className="flex justify-center mb-7">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E4DDD0] flex items-center justify-center text-[#7E8A79] shadow-2xs">
            <Quote className="w-4 h-4 opacity-75" />
          </div>
        </div>

        {/* Quote Content with Smooth Transition */}
        <div className="min-h-[170px] sm:min-h-[140px] flex items-center justify-center">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-[#1E1C1A] font-light leading-[1.38] max-w-3xl transition-opacity duration-300">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
        </div>

        {/* Author Details */}
        <div className="mt-8">
          <div className="font-serif text-lg sm:text-xl text-[#1E1C1A] font-normal tracking-wide">
            — {current.author}
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#7A7165] mt-1 font-light">
            {current.role} <span className="opacity-50">·</span> {current.duration}
          </div>
        </div>

        {/* Carousel Controls: Arrows & Dots */}
        <div className="flex items-center justify-center gap-6 mt-11">
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-[#D5CDBD] bg-[#FAF8F5] hover:bg-white text-[#1E1C1A] flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-[#BEB5A4] shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-400 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-1.5 bg-[#1E1C1A]'
                    : 'w-2 h-1.5 bg-[#D2C9BC] hover:bg-[#A3998B]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-[#D5CDBD] bg-[#FAF8F5] hover:bg-white text-[#1E1C1A] flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-[#BEB5A4] shadow-2xs"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}

