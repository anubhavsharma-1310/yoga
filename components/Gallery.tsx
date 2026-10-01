'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  location: string;
  image: string;
  aspect: 'tall' | 'wide' | 'square';
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    category: 'Yoga Retreat',
    title: 'Sanctuary Open-Air Pavilion',
    location: 'Kyoto Wellness Retreat',
    image: '/images/gallery_retreat_1790835493261.jpg',
    aspect: 'wide',
  },
  {
    id: 'g-2',
    category: 'Meditation',
    title: 'Singing Bowls & Sound Immersion',
    location: 'Quiet Chamber Studio',
    image: '/images/gallery_meditation_1790835506840.jpg',
    aspect: 'tall',
  },
  {
    id: 'g-3',
    category: 'Breathwork',
    title: 'Pranayama Morning Light',
    location: 'East Wing Solarium',
    image: '/images/gallery_breathwork_1790835520525.jpg',
    aspect: 'square',
  },
  {
    id: 'g-4',
    category: 'Beginner Yoga',
    title: 'Foundational Posture & Alignment',
    location: 'Studio Main Floor',
    image: '/images/class_morning_flow_1790835411647.jpg',
    aspect: 'tall',
  },
  {
    id: 'g-5',
    category: 'Wellness Workshop',
    title: 'Restorative Bolsters & Yin Flow',
    location: 'Warm Oak Hall',
    image: '/images/class_deep_stretch_1790835422914.jpg',
    aspect: 'wide',
  },
  {
    id: 'g-6',
    category: 'Mindful Living',
    title: 'Ceremonial Tea & Stillness Sits',
    location: 'Garden Tea House',
    image: '/images/wellness_ritual_1790835448720.jpg',
    aspect: 'square',
  },
];

const CATEGORIES = [
  'All Moments',
  'Yoga Retreat',
  'Meditation',
  'Wellness Workshop',
  'Beginner Yoga',
  'Breathwork',
  'Mindful Living',
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All Moments');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === 'All Moments'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-[#ECE5DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <ScrollReveal direction="up">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-3 block">
              VISUAL SANCTUARY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1C1A] font-normal mb-4 tracking-tight">
              Moments in Stillness
            </h2>
            <p className="text-[15px] sm:text-base text-[#615B52] font-light">
              Glimpses into our community, retreats, breathing spaces, and mindful practices.
            </p>
          </ScrollReveal>
        </div>

        {/* Minimalist Editorial Tabs */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-7 mb-14 border-b border-[#ECE5DA] pb-4">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-2 text-[12px] uppercase tracking-[0.16em] transition-all cursor-pointer whitespace-nowrap relative ${
                    isActive
                      ? 'text-[#1E1C1A] font-medium'
                      : 'text-[#7A7165] hover:text-[#1E1C1A] font-light'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryIndicator"
                      className="absolute -bottom-4 left-0 right-0 h-[1.5px] bg-[#1E1C1A] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#ECE5DB] bg-[#F2EDE4] shadow-[0_4px_20px_rgba(40,36,30,0.02)] aspect-[4/3] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(40,36,30,0.06)] hover:border-[#D5CDBD]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Overlay with Category Name and Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/85 via-[#1E1C1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#D8D2C6] font-medium mb-1 block">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-normal leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#EAE4D9]/80 mt-1 flex items-center justify-between font-light">
                  <span>{item.location}</span>
                  <ZoomIn className="w-4 h-4 text-[#FAF8F5] stroke-[1.5]" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E5DDD0]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#1E1C1A] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#1A1918]">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#ECE5DA]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#7A7165] font-medium block">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1E1C1A] font-normal">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <span className="text-xs text-[#696259] font-mono">
                  {selectedPhoto.location}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
