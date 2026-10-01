import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yogaharmony.com'),
  title: 'Yoga Harmony | Mindful Movement & Inner Balance',
  description: 'A premium, modern yoga and mindful wellness landing website offering classes, meditation, breathwork, and holistic programs.',
  openGraph: {
    title: 'Yoga Harmony | Mindful Movement & Inner Balance',
    description: 'A premium, modern yoga and mindful wellness landing website offering classes, meditation, breathwork, and holistic programs.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yoga Harmony | Mindful Movement & Inner Balance',
    description: 'A premium, modern yoga and mindful wellness landing website offering classes, meditation, breathwork, and holistic programs.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#FAF8F5] text-[#2D2A26] antialiased selection:bg-[#E2DDD3] selection:text-[#1F1E1B]">
        {children}
      </body>
    </html>
  );
}

