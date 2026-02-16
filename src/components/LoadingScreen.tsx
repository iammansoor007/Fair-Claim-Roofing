import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

/* ----------------------------------
   Phase 1 — Simple Dark
-----------------------------------*/
const SimpleDark = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-[#030712]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    />
  );
};

/* ----------------------------------
   Phase 2 — Roof Draw
-----------------------------------*/
const RoofDraw = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-[#030712]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <svg width="200" height="120" viewBox="0 0 200 120" className="w-[200px] md:w-[240px]">
        {/* Roof outline */}
        <motion.path
          d="M40 70 L100 30 L160 70"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        {/* Base */}
        <motion.line
          x1="55"
          y1="70"
          x2="145"
          y2="70"
          stroke="#60a5fa"
          strokeWidth="2.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        />
      </svg>
    </motion.div>
  );
};

/* ----------------------------------
   Phase 3 — Logo Text - PERFECT RENDERING
-----------------------------------*/
const LogoText = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#030712]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center px-4">
        {/* Simple, clean text - NO ANIMATIONS on the text itself */}
        <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em] text-white mb-4">
          <span style={{ color: "#60a5fa" }}>A5</span> ROOFING
        </div>

        {/* Simple underline - NO gradients */}
        <div className="mx-auto w-16 h-0.5 bg-blue-400" />

        {/* Simple subtitle */}
        <div className="mt-6 text-[10px] md:text-xs tracking-[0.25em] text-gray-400 uppercase">
          Since 2007
        </div>
      </div>
    </motion.div>
  );
};

/* ----------------------------------
   Phase 4 — Ready
-----------------------------------*/
const Ready = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute inset-0 bg-[#030712] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

    </motion.div>
  );
};

/* ----------------------------------
   Main Loader - OPTIMIZED
-----------------------------------*/
interface LoaderProps {
  onComplete: () => void;
}

const PremiumLoader = ({ onComplete }: LoaderProps) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    // Fast, clean timing
    const t1 = setTimeout(() => setPhase(2), 700);
    const t2 = setTimeout(() => setPhase(3), 1500);
    const t3 = setTimeout(() => setPhase(4), 2400);
    const t4 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[300]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {phase === 1 && <SimpleDark key="dark" />}
        {phase === 2 && <RoofDraw key="roof" />}
        {phase === 3 && <LogoText key="logo" />}
        {phase === 4 && <Ready key="ready" onComplete={() => setPhase(4)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default PremiumLoader;