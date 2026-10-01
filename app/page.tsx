'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Stats } from '@/components/Stats';
import { Offerings } from '@/components/Offerings';
import { FeaturedClasses, ClassItem } from '@/components/FeaturedClasses';
import { WellnessExperience } from '@/components/WellnessExperience';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';
import { ClassDetailModal } from '@/components/ClassDetailModal';
import { ContactModal } from '@/components/ContactModal';
import { StoryModal } from '@/components/StoryModal';
import { FaqModal } from '@/components/FaqModal';
import { BackToTop } from '@/components/BackToTop';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedClass, setPreselectedClass] = useState<string | undefined>(undefined);
  const [selectedClassDetail, setSelectedClassDetail] = useState<ClassItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [faqModalState, setFaqModalState] = useState<{
    open: boolean;
    type: 'faq' | 'privacy' | 'terms';
  }>({
    open: false,
    type: 'faq',
  });

  const handleOpenBooking = (className?: string) => {
    setPreselectedClass(className);
    setBookingOpen(true);
  };

  const handleScrollToClasses = () => {
    const el = document.getElementById('classes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFaq = (type: 'faq' | 'privacy' | 'terms') => {
    setFaqModalState({ open: true, type });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] flex flex-col font-sans">
      {/* 1. STICKY NAVBAR */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <Hero
          onExploreClasses={handleScrollToClasses}
          onStartJourney={() => handleOpenBooking()}
        />

        {/* 3. ABOUT SECTION */}
        <About onLearnMore={() => setStoryOpen(true)} />

        {/* 4. STATS / TRUST SECTION */}
        <Stats />

        {/* 5. SERVICES / OFFERINGS */}
        <Offerings
          onSelectOffering={(offeringName) => {
            if (offeringName.includes('YOGA')) {
              handleScrollToClasses();
            } else {
              handleOpenBooking(offeringName);
            }
          }}
        />

        {/* 6. FEATURED CLASSES */}
        <FeaturedClasses
          onSelectClass={(item) => setSelectedClassDetail(item)}
          onBookClass={(className) => handleOpenBooking(className)}
        />

        {/* 7. WELLNESS EXPERIENCE SECTION */}
        <WellnessExperience onExplorePrograms={() => handleOpenBooking('Wellness Programs')} />

        {/* 8. GALLERY WITH MASONRY & LIGHTBOX */}
        <Gallery />

        {/* 9. TESTIMONIALS CAROUSEL */}
        <Testimonials />

        {/* 10. CTA SECTION */}
        <CtaSection
          onBookClass={() => handleOpenBooking()}
          onContactUs={() => setContactOpen(true)}
        />
      </main>

      {/* 11. SOPHISTICATED FOOTER */}
      <Footer
        onOpenContact={() => setContactOpen(true)}
        onOpenFaq={() => handleOpenFaq('faq')}
        onOpenPrivacy={() => handleOpenFaq('privacy')}
        onOpenTerms={() => handleOpenFaq('terms')}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedClass={preselectedClass}
      />

      <ClassDetailModal
        classItem={selectedClassDetail}
        onClose={() => setSelectedClassDetail(null)}
        onBook={(className) => handleOpenBooking(className)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <StoryModal
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
        onBook={() => handleOpenBooking()}
      />

      <FaqModal
        isOpen={faqModalState.open}
        type={faqModalState.type}
        onClose={() => setFaqModalState((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
