'use client';

import React from 'react';
import { X, Heart, Sparkles, Compass } from 'lucide-react';
import { LotusIcon } from './icons/LotusIcon';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

export function StoryModal({ isOpen, onClose, onBook }: StoryModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#FAF8F5] rounded-3xl border border-[#ECE5DA] shadow-2xl p-7 sm:p-9 my-8 text-[#1E1C1A]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A7165] hover:text-[#1E1C1A] hover:bg-[#F2ECE1] transition-colors"
          aria-label="Close story modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#7A7165]">
          <LotusIcon className="w-5 h-5 stroke-[1.4]" />
          <span className="text-[11px] uppercase tracking-[0.26em] font-semibold">
            OUR SACRED ROOTS
          </span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-normal mb-4">
          The Story of Yoga Harmony
        </h3>

        <div className="space-y-4 text-[14px] sm:text-[15px] text-[#554F47] font-light leading-relaxed mb-8">
          <p>
            Yoga Harmony was founded in 2016 with a singular purpose: to build an unhurried, warm sanctuary where mindful movement and holistic wellness converge.
          </p>
          <p>
            In a fast-paced world centered on continuous output, our studio serves as an intentional counterweight — a tranquil space where breath takes precedence, joints are honored, and mental stillness is cultivated without judgment.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F2EA] border border-[#E5DED2]">
            <Heart className="w-5 h-5 text-[#55624E] mb-2.5 stroke-[1.5]" />
            <h4 className="font-serif text-base text-[#1E1C1A] font-normal mb-1">
              Ahimsa (Compassion)
            </h4>
            <p className="text-xs text-[#696259] font-light leading-relaxed">
              We practice listening to the body rather than pushing beyond gentle boundaries.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F2EA] border border-[#E5DED2]">
            <Sparkles className="w-5 h-5 text-[#8C8275] mb-2.5 stroke-[1.5]" />
            <h4 className="font-serif text-base text-[#1E1C1A] font-normal mb-1">
              Breath-Led Vitality
            </h4>
            <p className="text-xs text-[#696259] font-light leading-relaxed">
              Every posture is animated by conscious pranayama to soothe the nervous system.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F2EA] border border-[#E5DED2]">
            <Compass className="w-5 h-5 text-[#7E8A79] mb-2.5 stroke-[1.5]" />
            <h4 className="font-serif text-base text-[#1E1C1A] font-normal mb-1">
              Inclusivity & Space
            </h4>
            <p className="text-xs text-[#696259] font-light leading-relaxed">
              Welcoming props, individual modifications, and zero competition on the mat.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ECE5DA]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs uppercase tracking-[0.16em] text-[#696259] hover:text-[#1E1C1A]"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBook();
            }}
            className="px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-colors"
          >
            Join a Class
          </button>
        </div>
      </div>
    </div>
  );
}

