'use client';

import React, { useState, useEffect } from 'react';
import { LotusIcon } from './icons/LotusIcon';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'classes', 'programs', 'gallery', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Classes', href: '#classes', id: 'classes' },
    { label: 'Programs', href: '#programs', id: 'programs' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/92 backdrop-blur-md shadow-[0_2px_12px_rgba(30,28,26,0.03)] border-b border-[#ECE5DB] py-3.5'
            : 'bg-[#FAF8F5]/75 backdrop-blur-[2px] border-b border-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Wordmark & Icon */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C8275]"
          >
            <div className="text-[#847B6E] group-hover:text-[#5E6B56] transition-colors duration-300">
              <LotusIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.4]" />
            </div>
            <span className="font-serif tracking-[0.24em] text-[15px] sm:text-base font-normal text-[#1E1C1A]">
              YOGA HARMONY
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[13px] tracking-[0.08em] transition-colors duration-200 relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C8275] ${
                    isActive
                      ? 'text-[#1E1C1A] font-medium'
                      : 'text-[#696259] hover:text-[#1E1C1A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#8C8275] rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-[11px] uppercase tracking-[0.22em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-all duration-300 shadow-[0_2px_8px_rgba(35,32,29,0.08)] cursor-pointer hover:-translate-y-0.5"
            >
              <span>Book a Class</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-[#23201D] hover:bg-[#EFECE6] rounded-full transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C8275]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FAF8F5] shadow-2xl p-7 flex flex-col justify-between border-l border-[#EBE4D8]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#ECE5DB]">
                <div className="flex items-center gap-2">
                  <LotusIcon className="w-5 h-5 text-[#847B6E]" />
                  <span className="font-serif tracking-[0.2em] text-sm font-medium text-[#1E1C1A]">
                    YOGA HARMONY
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#696259] hover:text-[#1E1C1A] rounded-full hover:bg-[#EFECE6]"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-base text-[#46413B] hover:text-[#1E1C1A] py-3 border-b border-[#F4EFE6] tracking-wide font-light flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#9E9588] font-serif">&rarr;</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#ECE5DB] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full text-center hover:bg-[#3D3833] transition-colors shadow-xs"
              >
                Book a Class
              </button>
              <p className="text-[11px] text-center text-[#8C8275] tracking-wider uppercase">
                Mindful Movement • Inner Balance
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

