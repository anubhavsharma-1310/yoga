'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface WellnessExperienceProps {
  onExplorePrograms: () => void;
}

export function WellnessExperience({ onExplorePrograms }: WellnessExperienceProps) {
  const highlights = [
    'Personalized guidance with certified master teachers',
    'Small supportive groups capped at 12 practitioners',
    'Beginner-friendly practices tailored to every body',
    'Holistic wellness approach integrating breath and sound',
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6 lg:order-1 order-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-3 block">
              HOLISTIC LIVING
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#1E1C1A] font-normal leading-[1.12] mb-6">
              Create rituals that{' '}
              <span className="italic text-[#46413A] font-light">nourish you.</span>
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#554F47] font-light leading-relaxed mb-8">
              Wellness isn&apos;t something you achieve overnight. It&apos;s built through small, intentional moments — movement, breath, rest, and presence.
            </p>

            {/* Checklist */}
            <div className="space-y-4 mb-10">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#EAEFE8] border border-[#CCD8C8] flex items-center justify-center text-[#55624E] shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[2]" />
                  </div>
                  <span className="text-[14px] sm:text-[15px] text-[#423C36] font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onExplorePrograms}
              className="px-8 sm:px-9 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-all duration-300 shadow-[0_4px_16px_rgba(35,32,29,0.08)] cursor-pointer hover:-translate-y-0.5"
            >
              Explore Our Programs
            </button>
          </div>

          {/* Right: Large Peaceful Image */}
          <div className="lg:col-span-6 lg:order-2 order-1">
            <div className="relative aspect-[4/3] sm:aspect-[4/3.2] w-full overflow-hidden rounded-[2rem] border border-[#E8E1D5] shadow-[0_8px_30px_rgba(40,36,30,0.04)]">
              <Image
                src="/images/wellness_ritual_1790835448720.jpg"
                alt="Mindful wellness tea ritual with delicate ceramic cup, incense smoke, and natural eucalyptus"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 text-[#FAF8F5] text-xs font-serif italic tracking-wide">
                Morning mindful tea & breathwork sanctuary
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

