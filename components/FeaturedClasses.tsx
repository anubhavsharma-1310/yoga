'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, BarChart2, Calendar, User } from 'lucide-react';

export interface ClassItem {
  id: string;
  name: string;
  level: string;
  duration: string;
  instructor: string;
  image: string;
  schedule: string;
  tagline: string;
  description: string;
  benefits: string[];
}

interface FeaturedClassesProps {
  onSelectClass: (classItem: ClassItem) => void;
  onBookClass: (className: string) => void;
}

export const FEATURED_CLASSES: ClassItem[] = [
  {
    id: 'morning-flow',
    name: 'Morning Flow',
    level: 'All Levels',
    duration: '60 min',
    instructor: 'Elena Vance',
    schedule: 'Mon / Wed / Fri • 07:30 AM',
    image: '/images/class_morning_flow_1790835411647.jpg',
    tagline: 'Awaken your vitality with gentle sun salutations and mindful breath.',
    description:
      'A revitalizing practice designed to greet the morning sun. We begin with grounding breathwork and gentle spinal mobility before progressing into dynamic standing sequences, hip openers, and restorative balance poses.',
    benefits: ['Boosts energy & metabolic focus', 'Enhances joint flexibility', 'Cultivates calm mental clarity'],
  },
  {
    id: 'deep-stretch',
    name: 'Deep Stretch',
    level: 'Beginner',
    duration: '45 min',
    instructor: 'Marcus Chen',
    schedule: 'Tue / Thu • 06:00 PM',
    image: '/images/class_deep_stretch_1790835422914.jpg',
    tagline: 'Settle into soothing, floor-based postures that release tension deeply.',
    description:
      'A deeply restorative, floor-based practice using organic cotton props, cork blocks, and bolsters. Poses are held for 3 to 5 minutes to release fascial tightness, decompress the spine, and calm the autonomic nervous system.',
    benefits: ['Releases chronic muscle tightness', 'Stimulates deep myofascial release', 'Promotes sound, peaceful sleep'],
  },
  {
    id: 'mindful-vinyasa',
    name: 'Mindful Vinyasa',
    level: 'Intermediate',
    duration: '60 min',
    instructor: 'Aria Thorne',
    schedule: 'Tue / Sat • 09:30 AM',
    image: '/images/class_mindful_vinyasa_1790835435500.jpg',
    tagline: 'Harmonize continuous movement with conscious, fluid respiration.',
    description:
      'An intelligent flow linking sequential asanas with purposeful pranayama. Emphasizes core stability, refined anatomical alignment, and meditative rhythm to build both physical heat and profound inner stillness.',
    benefits: ['Builds functional full-body strength', 'Improves balance and proprioception', 'Elevates breath-movement harmony'],
  },
];

export function FeaturedClasses({ onSelectClass, onBookClass }: FeaturedClassesProps) {
  return (
    <section id="classes" className="py-24 sm:py-32 bg-[#F6F2EA]/60 border-t border-[#ECE5DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-3 block">
              STUDIO SCHEDULE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1C1A] font-normal">
              Featured Classes
            </h2>
          </div>
          <p className="max-w-md text-[14px] sm:text-[15px] text-[#615B52] font-light leading-relaxed">
            Each practice is guided with individual attention, calm cadence, and intentional variations for every experience level.
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_CLASSES.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FCFBF9] rounded-2xl overflow-hidden border border-[#ECE5DB] flex flex-col justify-between transition-all duration-400 hover:border-[#D5CDBD] shadow-[0_4px_24px_rgba(40,36,30,0.03)]"
            >
              <div>
                {/* Image Container with Subtle Zoom on Hover */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EFECE6]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#7A7165] mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <BarChart2 className="w-3 h-3 stroke-[1.5]" />
                      <span>{item.level}</span>
                    </span>
                    <span aria-hidden="true" className="text-[#C4BCAD]">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 stroke-[1.5]" />
                      <span>{item.duration}</span>
                    </span>
                    <span aria-hidden="true" className="text-[#C4BCAD]">·</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 stroke-[1.5]" />
                      <span>{item.instructor}</span>
                    </span>
                  </div>

                  {/* Class Name */}
                  <h3 className="font-serif text-2xl text-[#1E1C1A] font-normal mb-2.5">
                    {item.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[13px] sm:text-sm text-[#5A534B] font-light leading-relaxed mb-6">
                    {item.tagline}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-[#787166] mb-2 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#8C8275]" />
                    <span>{item.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-3 sm:px-7 sm:pb-7 flex items-center justify-between gap-3 border-t border-[#ECE5DA]">
                <button
                  onClick={() => onSelectClass(item)}
                  className="text-xs uppercase tracking-[0.16em] font-medium text-[#1E1C1A] hover:text-[#5E6B56] transition-colors cursor-pointer py-1.5 border-b border-transparent hover:border-[#5E6B56]"
                >
                  View Details &rarr;
                </button>
                <button
                  onClick={() => onBookClass(item.name)}
                  className="px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-[#FAF8F5] bg-[#23201D] hover:bg-[#3D3833] rounded-full transition-all duration-300 cursor-pointer shadow-xs"
                >
                  Book Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

