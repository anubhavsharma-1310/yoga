'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreClasses: () => void;
  onStartJourney: () => void;
}

export function Hero({ onExploreClasses, onStartJourney }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* Background Image with Warm Organic Linen / Travertine Scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_beige_texture_1790835371917.jpg"
          alt="Warm marble and natural flowing fabric texture"
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover object-center scale-[1.02] filter brightness-[1.01] contrast-[0.96]"
        />
        {/* Soft luxury veil for serene contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/88 via-[#FAF8F5]/68 to-[#FAF8F5]/92 backdrop-blur-[1.5px]" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(247,244,238,0.75)_100%)] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F5]/85 border border-[#E4DDD0] mb-8 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#7A7165] font-medium shadow-[0_2px_8px_rgba(40,36,30,0.02)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7E8A79]" />
          <span>MINDFUL MOVEMENT · INNER BALANCE</span>
        </div>

        {/* Large Heading */}
        <h1 className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.06] tracking-[-0.015em] text-[#1E1C1A] mb-7 font-normal">
          Find Your Balance.{' '}
          <span className="block italic text-[#48423B] font-light mt-1 sm:mt-2">
            Live Mindfully.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-xl text-[15px] sm:text-[17px] md:text-lg text-[#5A534B] font-light leading-relaxed mb-11">
          Move with intention, breathe deeply, and create space for a healthier, calmer life.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClasses}
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-all duration-300 shadow-[0_4px_16px_rgba(35,32,29,0.08)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Classes
          </button>
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#FAF8F5]/90 backdrop-blur-xs text-[#23201D] border border-[#D5CFC2] rounded-full hover:bg-white hover:border-[#BEB6A6] transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shadow-[0_2px_8px_rgba(40,36,30,0.02)]"
          >
            Start Your Journey
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-65 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8275] font-light">
          Scroll
        </span>
        <a
          href="#about"
          aria-label="Scroll down to About section"
          className="p-1 rounded-full text-[#7A7165] hover:text-[#1E1C1A] animate-bounce"
        >
          <ChevronDown className="w-4 h-4 stroke-[1.5]" />
        </a>
      </div>
    </section>
  );
}

