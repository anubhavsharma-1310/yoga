'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LotusIcon } from './icons/LotusIcon';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200; // 1.2s smooth loading

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 300);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="sanctuary-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] text-[#1E1C1A] select-none"
        >
          {/* Subtle radiating breathing background aura */}
          <motion.div
            animate={{
              scale: [0.9, 1.15, 0.9],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-80 h-80 rounded-full bg-[#EAE3D5]/60 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Animated Lotus with gentle rotation & pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-16 h-16 rounded-full bg-[#F3EEE5] border border-[#E4DCD0] flex items-center justify-center text-[#55624E] shadow-[0_4px_24px_rgba(40,36,30,0.06)] mb-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <LotusIcon className="w-8 h-8 stroke-[1.4]" />
              </motion.div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-2 mb-8"
            >
              <h1 className="font-serif tracking-[0.28em] text-xl sm:text-2xl font-normal text-[#1E1C1A]">
                YOGA HARMONY
              </h1>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#7A7165] font-light">
                Mindful Movement • Inner Balance
              </p>
            </motion.div>

            {/* Slender Progress Track */}
            <div className="w-48 sm:w-56 h-[2px] bg-[#E8E1D5] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-[#23201D] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Percentage Indicator */}
            <span className="mt-3 text-[10px] font-mono tracking-widest text-[#8C8275]">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
