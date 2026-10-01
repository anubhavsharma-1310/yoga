'use client';

import React from 'react';
import { LotusIcon } from './icons/LotusIcon';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenFaq: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export function Footer({ onOpenContact, onOpenFaq, onOpenTerms, onOpenPrivacy }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer id="contact" className="bg-[#1A1816] text-[#E8E2D8] pt-20 pb-12 border-t border-[#2B2824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#2C2925]">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <LotusIcon className="w-5.5 h-5.5 text-[#9E9587] stroke-[1.4]" />
              <span className="font-serif tracking-[0.22em] text-[17px] font-normal text-[#FAF8F5]">
                YOGA HARMONY
              </span>
            </div>
            <p className="text-[15px] font-serif italic text-[#C0B9AC] mb-5">
              Movement. Breath. Balance.
            </p>
            <p className="text-xs text-[#8A8174] leading-relaxed max-w-sm mb-7 font-light">
              A serene community sanctuary dedicated to mindful practices, holistic vitality, and inner equilibrium for every body.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-[#9E9587]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yoga Harmony on Instagram"
                className="w-8.5 h-8.5 rounded-full border border-[#33302B] flex items-center justify-center hover:text-[#FAF8F5] hover:border-[#8C8275] transition-colors"
              >
                <Instagram className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yoga Harmony on Facebook"
                className="w-8.5 h-8.5 rounded-full border border-[#33302B] flex items-center justify-center hover:text-[#FAF8F5] hover:border-[#8C8275] transition-colors"
              >
                <Facebook className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yoga Harmony on YouTube"
                className="w-8.5 h-8.5 rounded-full border border-[#33302B] flex items-center justify-center hover:text-[#FAF8F5] hover:border-[#8C8275] transition-colors"
              >
                <Youtube className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#9E9587] font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-[13px] text-[#C0B9AC] font-light">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#classes"
                  onClick={(e) => handleNavClick(e, '#classes')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Classes
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  onClick={(e) => handleNavClick(e, '#programs')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleNavClick(e, '#gallery')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#9E9587] font-semibold mb-4">
              Support
            </h4>
            <ul className="space-y-3 text-[13px] text-[#C0B9AC] font-light">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#FAF8F5] transition-colors text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFaq}
                  className="hover:text-[#FAF8F5] transition-colors text-left cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#FAF8F5] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#FAF8F5] transition-colors text-left cursor-pointer"
                >
                  Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#9E9587] font-semibold mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-[13px] text-[#C0B9AC] font-light">
              <a
                href="mailto:hello@yogaharmony.com"
                className="flex items-center gap-2.5 hover:text-[#FAF8F5] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8A8174]" />
                <span>hello@yogaharmony.com</span>
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2.5 hover:text-[#FAF8F5] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8A8174]" />
                <span>+1 (555) 123-4567</span>
              </a>
              <div className="flex items-start gap-2.5 text-[#8A8174] pt-1">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  240 Serenity Way, Suite 400<br />San Francisco, CA 94107
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#787165]">
          <div>
            © 2026 Yoga Harmony. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-light">
            <span>Mindful Movement</span>
            <span>·</span>
            <span>Breath & Balance</span>
            <span>·</span>
            <span>Holistic Sanctuary</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

