'use client';

import React from 'react';
import Image from 'next/image';
import { LotusIcon } from './icons/LotusIcon';
import { ArrowRight } from 'lucide-react';

interface AboutProps {
  onLearnMore: () => void;
}

export function About({ onLearnMore }: AboutProps) {
  return (
    <section id="about" className="py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Peaceful Image with Soft Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle back decorative warm tint frame */}
              <div className="absolute -inset-3 sm:-inset-4 bg-[#F2ECE1] rounded-[2rem] -rotate-1 transition-transform duration-700 pointer-events-none" />
              
              <div className="relative aspect-[4/3] sm:aspect-[4/3.2] w-full overflow-hidden rounded-[1.75rem] shadow-[0_8px_30px_rgba(40,36,30,0.04)] border border-[#E8E1D5]">
                <Image
                  src="/images/about_yoga_practice_1790835384831.jpg"
                  alt="Woman practicing peaceful meditation and yoga in warm natural light"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-103"
                />
              </div>

              {/* Floating aesthetic quote note */}
              <div className="absolute -bottom-6 -right-2 sm:-bottom-7 sm:-right-4 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E6DFD3] rounded-2xl p-4 sm:p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)] max-w-[240px]">
                <p className="font-serif text-[15px] italic text-[#302C27] leading-snug">
                  &ldquo;In stillness, we uncover our truest strength.&rdquo;
                </p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7E8A79]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275] font-medium">
                    Studio Philosophy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 flex flex-col items-start lg:pl-6">
            {/* Small label */}
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-4 block">
              ABOUT YOGA HARMONY
            </span>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#1E1C1A] leading-[1.12] font-normal mb-7">
              Yoga is more than movement.{' '}
              <span className="block italic text-[#443F39] font-light mt-1">
                It&apos;s a way of life.
              </span>
            </h2>

            {/* Paragraphs */}
            <p className="text-[16px] sm:text-[17px] text-[#443E37] font-light leading-[1.8] mb-5">
              At Yoga Harmony, we believe wellness begins with a deeper connection between body, breath, and mind.
            </p>

            <p className="text-[14px] sm:text-[15px] text-[#635C53] font-light leading-[1.8] mb-9">
              Our experienced instructors create welcoming practices for every level, helping you build strength, flexibility, mindfulness, and inner peace. Whether you are stepping onto the mat for the very first time or deepening a lifelong devotion, our sanctuary offers a grounding retreat from everyday noise.
            </p>

            {/* Decorative Lotus Line Art & Learn More */}
            <div className="flex items-center gap-6 pt-2">
              <button
                onClick={onLearnMore}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1E1C1A] hover:text-[#5E6B56] transition-colors cursor-pointer py-1.5 border-b border-[#1E1C1A] hover:border-[#5E6B56]"
              >
                <span>Learn More About Our Journey</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="text-[#A3998B] pl-4 border-l border-[#E6DFD3]">
                <LotusIcon className="w-7 h-7 opacity-75 stroke-[1.4]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

