'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds gentle count up
    let animId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * value);
      setDisplayValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function Stats() {
  const stats: StatItem[] = [
    { value: 10, suffix: '+', label: 'Years of Experience', sublabel: 'Dedicated practice & guiding' },
    { value: 500, suffix: '+', label: 'Happy Members', sublabel: 'Flourishing mindful community' },
    { value: 25, suffix: '+', label: 'Weekly Classes', sublabel: 'Morning, noon & evening flows' },
    { value: 12, suffix: '', label: 'Wellness Programs', sublabel: 'Retreats, sound baths & workshops' },
  ];

  return (
    <section className="border-y border-[#ECE5DA] bg-[#F6F2EB]/75 py-14 sm:py-18 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E5DED2]">
          {stats.map((stat, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.1}
              className={`flex flex-col items-center text-center ${
                idx > 0 && idx % 2 === 0 ? 'pt-6 md:pt-0' : ''
              } ${idx % 2 === 1 && idx > 1 ? 'pt-6 md:pt-0' : ''} px-4 lg:px-8`}
            >
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1E1C1A] tracking-[-0.02em]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-2.5 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#7A7165] font-medium">
                {stat.label}
              </span>
              <span className="mt-1 text-[11px] text-[#91887B] font-light hidden sm:block">
                {stat.sublabel}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
