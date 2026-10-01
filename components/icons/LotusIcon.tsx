import React from 'react';

export function LotusIcon({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Central petal */}
      <path d="M24 10C24 10 20 20 20 29C20 33 22 36 24 37C26 36 28 33 28 29C28 20 24 10 24 10Z" />
      {/* Left inner petal */}
      <path d="M24 37C20 36 15 32 15 26C15 20 21 16 21 16C21 16 18 24 20 30" />
      {/* Right inner petal */}
      <path d="M24 37C28 36 33 32 33 26C33 20 27 16 27 16C27 16 30 24 28 30" />
      {/* Left outer petal */}
      <path d="M24 37C18 36 10 32 8 26C7 22 10 20 12 21C16 22 17 28 21 33" />
      {/* Right outer petal */}
      <path d="M24 37C30 36 38 32 40 26C41 22 38 20 36 21C32 22 31 28 27 33" />
      {/* Base water line */}
      <path d="M16 39C20 40 28 40 32 39" strokeWidth="1.2" />
    </svg>
  );
}
