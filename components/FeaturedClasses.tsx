'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, BarChart2, Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

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
    level: 'Beginner Friendly',
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
    <section id="classes" className="py-24 sm:py-32 bg-[#F6F2EA]/60 border-t border-[#ECE5DA] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header with Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <ScrollReveal direction="up">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-3 block">
              STUDIO SCHEDULE & PRACTICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1C1A] font-normal tracking-tight">
              Featured Classes
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="max-w-md text-[14px] sm:text-[15px] text-[#615B52] font-light leading-relaxed">
              Each practice is guided with individual attention, calm cadence, and intentional variations for every experience level.
            </p>
          </ScrollReveal>
        </div>

        {/* Classes Grid: Perfectly balanced heights and aligned actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {FEATURED_CLASSES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group bg-[#FCFBF9] rounded-2xl overflow-hidden border border-[#ECE5DB] flex flex-col h-full transition-all duration-400 hover:border-[#D5CDBD] shadow-[0_4px_24px_rgba(40,36,30,0.03)] hover:shadow-[0_12px_36px_rgba(40,36,30,0.07)]"
            >
              {/* Image Container with Floating Level Tag */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFECE6] shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-75" />
                
                {/* Floating pill badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-medium text-[#23201D] border border-[#E4DCD0] shadow-2xs">
                    <BarChart2 className="w-3 h-3 text-[#55624E]" />
                    <span>{item.level}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 right-4 z-10 text-[11px] font-mono text-[#FAF8F5] tracking-wider drop-shadow-xs">
                  {item.duration}
                </div>
              </div>

              {/* Card Body with flex-grow to guarantee uniform card height */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  {/* Instructor & Meta */}
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#7A7165] mb-2.5 font-medium">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#8C8275]" />
                      <span>{item.instructor}</span>
                    </span>
                    <span aria-hidden="true" className="text-[#C4BCAD]">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C8275]" />
                      <span>{item.duration}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-[#1E1C1A] font-normal mb-2.5 group-hover:text-[#55624E] transition-colors">
                    {item.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[13px] sm:text-sm text-[#5A534B] font-light leading-relaxed mb-4 min-h-[40px]">
                    {item.tagline}
                  </p>

                  {/* Schedule line */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F0E6] text-[11px] text-[#696054] mb-6 font-mono border border-[#E9E2D5]">
                    <Calendar className="w-3.5 h-3.5 text-[#7A7165] shrink-0" />
                    <span>{item.schedule}</span>
                  </div>
                </div>

                {/* Card Footer Actions: Strictly Aligned Bottom Bar */}
                <div className="pt-4 border-t border-[#ECE5DA] flex items-center justify-between gap-3 mt-auto">
                  <button
                    onClick={() => onSelectClass(item)}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] font-medium text-[#1E1C1A] hover:text-[#55624E] transition-colors cursor-pointer py-1.5 border-b border-transparent hover:border-[#55624E]"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </button>

                  <button
                    onClick={() => onBookClass(item.name)}
                    className="px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] font-medium text-[#FAF8F5] bg-[#23201D] hover:bg-[#3D3833] rounded-full transition-all duration-300 cursor-pointer shadow-[0_2px_8px_rgba(35,32,29,0.08)] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Book Spot
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
