'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-[#23201D] text-[#FAF8F5] shadow-[0_4px_16px_rgba(35,32,29,0.15)] flex items-center justify-center hover:bg-[#3D3833] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border border-[#443F3A]"
    >
      <ArrowUp className="w-3.5 h-3.5 stroke-[1.5]" />
    </button>
  );
}

