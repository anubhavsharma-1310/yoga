'use client';

import React from 'react';
import Image from 'next/image';
import { X, Clock, Calendar, User, Check } from 'lucide-react';
import { ClassItem } from './FeaturedClasses';

interface ClassDetailModalProps {
  classItem: ClassItem | null;
  onClose: () => void;
  onBook: (className: string) => void;
}

export function ClassDetailModal({ classItem, onClose, onBook }: ClassDetailModalProps) {
  if (!classItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#FAF8F5] rounded-3xl border border-[#ECE5DA] shadow-2xl overflow-hidden my-8 text-[#1E1C1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#1E1C1A] flex items-center justify-center transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-[#E8E2D8]">
          <Image
            src={classItem.image}
            alt={classItem.name}
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#E8E2D8] font-medium block mb-1">
              {classItem.level} • {classItem.duration}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              {classItem.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick info row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-3 px-4 bg-[#F6F2EA] rounded-2xl border border-[#E5DED2] text-xs text-[#554F47]">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7A7165]" />
              <span>Instructor: <strong>{classItem.instructor}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#7A7165]" />
              <span>{classItem.schedule}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7A7165]" />
              <span>{classItem.duration} Session</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#7A7165] font-semibold mb-2">
              Practice Overview
            </h4>
            <p className="text-[14px] sm:text-[15px] text-[#423C36] font-light leading-relaxed">
              {classItem.description}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#7A7165] font-semibold mb-3">
              Core Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {classItem.benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAF8F5] border border-[#ECE5DB] flex items-start gap-2.5 text-xs text-[#554F47]"
                >
                  <Check className="w-3.5 h-3.5 text-[#55624E] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Amenities */}
          <div className="pt-2 text-xs text-[#787166] border-t border-[#ECE5DA] flex items-center justify-between font-light">
            <span>✨ Mats, cork bolsters, and organic herbal infusions provided</span>
            <span>Max 14 practitioners</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs uppercase tracking-[0.16em] text-[#696259] hover:text-[#1E1C1A] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(classItem.name);
              }}
              className="px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-all duration-300 shadow-xs cursor-pointer"
            >
              Book This Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

