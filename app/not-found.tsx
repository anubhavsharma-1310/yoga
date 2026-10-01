import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1C1A] flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[11px] uppercase tracking-[0.28em] text-[#7A7165] font-semibold mb-3">
        404 • PEACEFUL PAUSE
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1E1C1A] mb-4">
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-[#615B52] font-light max-w-md mb-8 leading-relaxed">
        The mindful space you are seeking may have moved or no longer exists. Take a deep breath and return home.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#23201D] text-[#FAF8F5] rounded-full hover:bg-[#3D3833] transition-colors"
      >
        Return to Sanctuary
      </Link>
    </div>
  );
}
