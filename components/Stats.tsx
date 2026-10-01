import React from 'react';

export function Stats() {
  const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '500+', label: 'Happy Members' },
    { value: '25+', label: 'Weekly Classes' },
    { value: '12', label: 'Wellness Programs' },
  ];

  return (
    <section className="border-y border-[#ECE5DA] bg-[#F6F2EB]/75 py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E5DED2]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx > 0 && idx % 2 === 0 ? 'pt-6 md:pt-0' : ''
              } ${idx % 2 === 1 && idx > 1 ? 'pt-6 md:pt-0' : ''} px-4 lg:px-8`}
            >
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1E1C1A] tabular-nums tracking-[-0.02em]">
                {stat.value}
              </span>
              <span className="mt-2.5 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#7A7165] font-normal">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

