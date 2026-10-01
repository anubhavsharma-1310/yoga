'use client';

import React from 'react';
import { Heart, Wind, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { LotusIcon } from './icons/LotusIcon';
import { ScrollReveal } from './ScrollReveal';

interface OfferingsProps {
  onSelectOffering: (offeringName: string) => void;
}

export function Offerings({ onSelectOffering }: OfferingsProps) {
  const offerings = [
    {
      id: 'yoga-classes',
      title: 'YOGA CLASSES',
      description: 'Flow, stretch, strengthen, and reconnect with your body in natural light.',
      icon: LotusIcon,
      accent: 'Asana & Vinyasa',
      meta: 'Daily morning & evening sessions',
    },
    {
      id: 'wellness-programs',
      title: 'WELLNESS PROGRAMS',
      description: 'Personalized programs designed to support your physical and emotional wellbeing.',
      icon: Heart,
      accent: 'Holistic Health',
      meta: '4-week & 8-week tracks',
    },
    {
      id: 'meditation',
      title: 'MEDITATION',
      description: 'Guided practices to quiet the mind, release cognitive tension, and cultivate presence.',
      icon: Sparkles,
      accent: 'Mindfulness & Sound',
      meta: 'Daily 30m stillness sits',
    },
    {
      id: 'breathwork',
      title: 'BREATHWORK',
      description: 'Simple breathing techniques to reduce stress, balance energy, and restore balance.',
      icon: Wind,
      accent: 'Pranayama Vitality',
      meta: 'Stress reset & deep restoration',
    },
  ];

  return (
    <section id="programs" className="py-24 sm:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal direction="up">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-3 block">
              SANCTUARY PATHWAYS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1C1A] font-normal mb-4 tracking-tight">
              Our Offerings
            </h2>
            <p className="text-[15px] sm:text-base text-[#615B52] font-light">
              Thoughtfully designed practices for your complete wellbeing.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Offering Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {offerings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                onClick={() => onSelectOffering(item.title)}
                className="group relative bg-[#FCFBF9] hover:bg-[#F6F2EA] border border-[#ECE5DB] hover:border-[#D5CDBD] rounded-2xl p-7 sm:p-8 transition-all duration-400 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-[0_4px_20px_rgba(40,36,30,0.02)] h-full"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] border border-[#E5DDD0] flex items-center justify-center text-[#55624E] group-hover:text-[#23201D] transition-colors mb-6">
                    <Icon className="w-5 h-5 stroke-[1.4]" />
                  </div>

                  {/* Title & Accent */}
                  <div className="mb-3">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#877E71] block font-medium">
                      {item.accent}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1E1C1A] font-normal tracking-wide mt-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] sm:text-sm text-[#5A534B] font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#ECE5DA] flex items-center justify-between text-xs text-[#7A7165] mt-auto">
                  <span className="text-[11px] tracking-wide">{item.meta}</span>
                  <span className="font-serif text-sm text-[#1E1C1A] group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
