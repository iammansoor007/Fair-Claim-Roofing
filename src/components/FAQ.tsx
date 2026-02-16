import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ======================
// PREMIUM SVG ICONS
// ======================
const Icons = {
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Minus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Document: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Chat: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Roof: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 10L12 3L21 10L18 13L12 8L6 13L3 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 13V19H18V13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7v7c0 5.5 10 8 10 8s10-2.5 10-8V7l-10-5z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Storm: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 14.5C4 16.985 6.015 19 8.5 19h7c2.485 0 4.5-2.015 4.5-4.5S17.985 10 15.5 10H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10L8 13H12L10 16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 5L9 8H14L12 11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  DocumentCheck: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 15l2 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Tools: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3L19 2L22 5L17.7 9.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.3 17.7L5 22L2 19L6.3 14.7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 8L8 16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 10L12 3L21 10L18 13L12 8L6 13L3 10Z" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

// ======================
// SUBTLE BACKGROUND
// ======================
const SubtleBackground = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #2563eb 1px, transparent 1px),
          linear-gradient(to bottom, #2563eb 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/20 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-50/20 to-transparent" />
    <motion.div
      animate={{
        x: [0, 20, 0, -20, 0],
        y: [0, -15, 25, 15, 0],
      }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute top-40 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
    />
  </div>
);

// ======================
// FLOATING PARTICLES - SUBTLE
// ======================
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-0.5 bg-blue-400/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

// ======================
// PREMIUM ACCORDION ITEM - UPGRADED
// ======================
const AccordionItem = ({ item, index, isOpen, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  // Mouse position for subtle liquid effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 10 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative group"
    >
      {/* Liquid Background Layer - Subtle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#liquidGradient)"
          opacity={isHovered ? 0.08 : 0.03}
          style={{
            x: useTransform(springX, [0, 100], [-5, 5]),
            y: useTransform(springY, [0, 100], [-5, 5]),
          }}
          transition={{ duration: 0.3 }}
        />
        <defs>
          <radialGradient id="liquidGradient">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.05" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Index - Premium */}
      <motion.div
        className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block"
        animate={isHovered ? {
          x: -5,
          scale: 1.1,
          opacity: 0.8
        } : {
          x: 0,
          scale: 1,
          opacity: 0.4
        }}
        transition={{ duration: 0.3 }}
      >
        <span className={`
          text-[90px] font-black leading-none tracking-tighter
          ${isOpen ? 'text-blue-900/15' : 'text-slate-200/80'}
          transition-colors duration-500
        `}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Main Container */}
      <div
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`
          relative bg-white/90 backdrop-blur-sm rounded-2xl
          border transition-all duration-500
          ${isOpen
            ? 'border-blue-300/70 shadow-2xl shadow-blue-900/15'
            : 'border-blue-100/50 hover:border-blue-200/80 shadow-lg shadow-blue-900/5'
          }
        `}
      >
        {/* Animated Border - SVG Draw Effect */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isHovered ? {
              pathLength: 1,
              opacity: 0.6
            } : {
              pathLength: 0,
              opacity: 0
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Particles on Hover */}
        {isHovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full z-20"
                style={{
                  background: i % 2 === 0 ? '#3b82f6' : '#2563eb',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#3b82f6' : '#2563eb'}`,
                }}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                  opacity: 0.6
                }}
                animate={{
                  x: [`50%`, `${20 + (i * 10)}%`],
                  y: [`50%`, `${15 + (i * 12)}%`],
                  scale: [0, 2, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}

        {/* Question Button */}
        <button
          onClick={() => onToggle(index)}
          className="w-full text-left p-7 md:p-9 focus:outline-none relative z-10"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between gap-6">
            {/* Question with Gradient Text */}
            <h3 className={`
              text-base md:text-lg lg:text-xl font-light transition-all duration-500
              ${isOpen
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 font-medium'
                : 'text-slate-800 group-hover:text-slate-900'
              }
            `}>
              {item.question}
            </h3>

            {/* Animated Icon */}
            <div className="relative flex-shrink-0">
              <motion.div
                animate={isOpen ? {
                  rotate: 180,
                  scale: 1.1,
                  backgroundColor: '#2563eb',
                  borderColor: '#2563eb',
                } : {
                  rotate: 0,
                  scale: 1,
                  backgroundColor: 'white',
                  borderColor: isHovered ? '#2563eb' : '#e2e8f0',
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full border-2
                  flex items-center justify-center
                  transition-all duration-500
                  ${isOpen ? 'bg-blue-600 border-blue-600' : 'bg-white'}
                `}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                >
                  <motion.path
                    d={isOpen ? "M5 12h14" : "M12 5v14M5 12h14"}
                    stroke={isOpen ? 'white' : isHovered ? '#2563eb' : '#94a3b8'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    animate={isOpen ? {
                      d: "M5 12h14"
                    } : {
                      d: "M12 5v14M5 12h14"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Pulse Ring for Open State */}
              {isOpen && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>
          </div>
        </button>

        {/* Answer Panel - Premium */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="overflow-hidden"
            >
              <div className="px-7 md:px-9 pb-7 md:pb-9">
                {/* Decorative Timeline */}
                <div className="relative pl-6 border-l-2 border-blue-200/50">
                  {/* Answer Text */}
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-5">
                    {item.answer}
                  </p>

                  {/* Metadata Grid - Premium */}
                  {item.metadata && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                      {item.metadata.map((meta, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className="w-1 h-1 bg-blue-500 rounded-full" />
                          <span className="text-slate-500">{meta.label}:</span>
                          <span className="font-medium text-slate-700">{meta.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Resource Links */}
                  {item.links && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap items-center gap-4 pt-4 border-t border-blue-100/50"
                    >
                      {item.links.map((link, i) => (
                        <motion.a
                          key={i}
                          href={link.url}
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors group"
                        >
                          <span>{link.label}</span>
                          <motion.svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                          </motion.svg>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner Accents - Morphing */}
        <motion.div
          className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2"
          animate={isHovered ? {
            width: 14,
            height: 14,
            borderColor: 'rgba(37,99,235,0.5)'
          } : {
            width: 24,
            height: 24,
            borderColor: 'rgba(37,99,235,0.2)'
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2"
          animate={isHovered ? {
            width: 14,
            height: 14,
            borderColor: 'rgba(37,99,235,0.5)'
          } : {
            width: 24,
            height: 24,
            borderColor: 'rgba(37,99,235,0.2)'
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

// ======================
// CATEGORY FILTER - MINIMAL (KEPT SAME)
// ======================
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onCategoryChange(category.id)}
          className={`
            relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300
            ${activeCategory === category.id
              ? 'text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-blue-50/50'
            }
          `}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {category.icon}
            {category.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

// ======================
// SEARCH BAR - PREMIUM (KEPT SAME)
// ======================
const SearchBar = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`
        relative w-full max-w-md transition-all duration-300
        ${isFocused ? 'scale-[1.02]' : 'scale-100'}
      `}
    >
      <div className={`
        relative flex items-center bg-white rounded-full border transition-all duration-300
        ${isFocused
          ? 'border-blue-400 shadow-lg shadow-blue-900/10'
          : 'border-slate-200 hover:border-slate-300 shadow-md'
        }
      `}>
        <div className="absolute left-4 text-slate-400">
          <Icons.Search />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search questions..."
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-transparent rounded-full text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />

        {isFocused && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute right-3 text-xs text-slate-400"
          >
            ⏎
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ======================
// KNOWLEDGE CARD - PREMIUM UPGRADED (FROM ADVANCED VERSION)
// ======================
const KnowledgeCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* 3D Tilt Effect */}
      <motion.div
        animate={isHovered ? {
          rotateX: 2,
          rotateY: 2,
          scale: 1.02,
          boxShadow: "0 30px 60px -15px rgba(37,99,235,0.3)"
        } : {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          boxShadow: "0 20px 40px -15px rgba(37,99,235,0.15)"
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-8 md:p-10 overflow-hidden"
        style={{ transformPerspective: 1000 }}
      >
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Floating Particles */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{ x: '50%', y: '50%', scale: 0 }}
                animate={{
                  x: [`50%`, `${20 + i * 12}%`],
                  y: [`50%`, `${15 + i * 10}%`],
                  scale: [0, 2.5, 0],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Icon Container */}
            <motion.div
              animate={isHovered ? {
                rotate: 360,
                scale: 1.2,
                backgroundColor: 'rgba(255,255,255,0.15)'
              } : {
                rotate: 0,
                scale: 1,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
              </svg>
            </motion.div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Still have questions?
              </h4>
              <p className="text-blue-200 text-base md:text-lg">
                Our roofing specialists are ready to help with your specific project needs.
              </p>
            </div>
          </div>

          {/* Button */}
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-7 py-3.5 md:px-8 md:py-4 bg-white text-blue-900 text-xs md:text-sm font-medium rounded-full shadow-2xl overflow-hidden group/btn whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Our Team
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                animate={isHovered ? { x: 5 } : { x: 0 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.a>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/20" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/20" />
      </motion.div>
    </motion.div>
  );
};

// ======================
// MAIN FAQ SECTION - ROOFING SPECIFIC
// ======================
const FAQ = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [openItems, setOpenItems] = useState([0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Questions', icon: null },
    { id: 'general', label: 'General', icon: <Icons.Home /> },
    { id: 'repair', label: 'Repair', icon: <Icons.Tools /> },
    { id: 'warranty', label: 'Warranty', icon: <Icons.Shield /> },
    { id: 'emergency', label: 'Emergency', icon: <Icons.Storm /> },
  ];

  const faqItems = [
    {
      id: 1,
      category: 'general',
      question: "How long does a roof last?",
      answer: "The lifespan of a roof depends on the material, installation quality, climate conditions, and ongoing maintenance. Most asphalt shingle roofs typically last between 20 to 30 years, while metal roofing systems can last 40 years or more when properly maintained. Regular inspections, timely repairs, and good ventilation can significantly extend the life of any roofing system and help prevent early deterioration.",
      metadata: [
        { label: "Asphalt shingle", value: "20-30 years" },
        { label: "Metal roofing", value: "40+ years" }
      ],
      links: [
        { label: "Learn about roofing materials", url: "/materials" }
      ]
    },
    {
      id: 2,
      category: 'repair',
      question: "What are signs my roof needs repair?",
      answer: "Common warning signs include water leaks, missing or curling shingles, ceiling stains, mold growth, soft roof areas, or visible sagging. You may also notice higher energy bills caused by poor roof ventilation or insulation damage. Even small symptoms can indicate hidden structural issues, so scheduling a professional roof inspection early can prevent more serious and expensive repairs later.",
      metadata: [
        { label: "Warning signs", value: "Leaks, stains, curling" },
        { label: "Action", value: "Inspect immediately" }
      ],
      links: [
        { label: "Schedule inspection", url: "/inspection" }
      ]
    },
    {
      id: 3,
      category: 'general',
      question: "How much does roof replacement cost?",
      answer: "Roof replacement costs vary based on several factors such as roof size, material type, structural condition, labor requirements, and project complexity. Because every property is different, the most accurate way to determine cost is through a professional inspection and written estimate. Investing in a high-quality replacement often reduces long-term repair expenses and increases overall property value.",
      metadata: [
        { label: "Factors", value: "Size, material, complexity" },
        { label: "Best approach", value: "Free estimate" }
      ],
      links: [
        { label: "Get a free estimate", url: "/estimate" }
      ]
    },
    {
      id: 4,
      category: 'emergency',
      question: "Do you provide emergency roofing services?",
      answer: "Yes. Emergency roofing services are available to quickly address storm damage, sudden leaks, fallen debris, or structural failures that threaten your property's safety. Rapid response helps minimize interior damage, prevent mold growth, and stabilize the roofing system until permanent repairs or replacement can be completed. Acting quickly during emergencies can save significant time and repair costs.",
      metadata: [
        { label: "Response", value: "24/7 availability" },
        { label: "Coverage", value: "All areas" }
      ],
      links: [
        { label: "Emergency services", url: "/emergency" }
      ]
    },
    {
      id: 5,
      category: 'general',
      question: "How often should roofs be inspected?",
      answer: "Roofs should be professionally inspected at least once each year and always after major storms, hail, or high-wind events. Regular inspections help detect hidden damage, aging materials, drainage issues, and ventilation problems before they become serious. Preventive maintenance based on inspection findings can extend roof lifespan, improve performance, and protect your home or business from unexpected repair expenses.",
      metadata: [
        { label: "Routine", value: "Annually" },
        { label: "After storms", value: "Immediately" }
      ],
      links: [
        { label: "Maintenance plans", url: "/maintenance" }
      ]
    },
    {
      id: 6,
      category: 'warranty',
      question: "Will my insurance cover roof damage?",
      answer: "In many cases, storm-related damage such as hail, wind, or falling debris may be covered by homeowners insurance, depending on your policy terms and the cause of damage. A professional roof inspection with proper documentation and photos can help support your claim and ensure the damage is accurately reported. Working with an experienced roofing contractor during the insurance process can make the approval and repair timeline much smoother.",
      metadata: [
        { label: "Coverage", value: "Storm damage" },
        { label: "Documentation", value: "Inspection report" }
      ],
      links: [
        { label: "Insurance guidance", url: "/insurance" }
      ]
    },
    {
      id: 7,
      category: 'general',
      question: "How long does a roof replacement take?",
      answer: "Most residential roof replacements are completed within one to three days, depending on the roof size, weather conditions, material type, and structural complexity. Larger or commercial projects may take longer to ensure proper installation and safety. Professional planning, skilled crews, and quality materials help ensure the project is completed efficiently without compromising workmanship or long-term durability.",
      metadata: [
        { label: "Residential", value: "1-3 days" },
        { label: "Commercial", value: "Varies" }
      ],
      links: [
        { label: "Our process", url: "/process" }
      ]
    },
    {
      id: 8,
      category: 'repair',
      question: "Can a small roof leak become a serious problem?",
      answer: "Yes. Even a minor leak can allow water to reach insulation, drywall, framing, and electrical systems, leading to mold growth, structural weakening, and costly interior repairs. Because leaks often spread beyond the visible area, early detection and prompt repair are essential. Addressing small roofing issues quickly is the most effective way to protect your property and avoid major expenses later.",
      metadata: [
        { label: "Risk", value: "Mold, structural damage" },
        { label: "Action", value: "Repair immediately" }
      ],
      links: [
        { label: "Schedule repair", url: "/repair" }
      ]
    },
    {
      id: 9,
      category: 'general',
      question: "What roofing materials are best for long-term durability?",
      answer: "Popular long-lasting roofing materials include architectural asphalt shingles, metal roofing, tile, and certain flat-roof membrane systems. The best choice depends on climate, budget, building design, and energy-efficiency goals. A professional roofing evaluation can help determine which material offers the best balance of durability, appearance, and long-term value for your specific property.",
      metadata: [
        { label: "Metal", value: "40+ years" },
        { label: "Architectural shingles", value: "30+ years" },
        { label: "Tile", value: "50+ years" }
      ],
      links: [
        { label: "Material guide", url: "/materials" }
      ]
    },
    {
      id: 10,
      category: 'warranty',
      question: "Why is professional roof installation important?",
      answer: "Proper installation is critical because even high-quality materials can fail if installed incorrectly. Professional roofing contractors follow manufacturer guidelines, safety standards, ventilation requirements, and structural best practices to ensure long-term performance. Correct installation not only extends roof lifespan but also protects warranties, improves energy efficiency, and reduces the risk of future repairs.",
      metadata: [
        { label: "Warranty protection", value: "Manufacturer requires" },
        { label: "Performance", value: "Maximized lifespan" }
      ],
      links: [
        { label: "Our credentials", url: "/about" }
      ]
    }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (index) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setOpenItems([]);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <SubtleBackground />
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">

        {/* ====================== */}
        {/* SECTION HEADER - ROOFING FOCUSED */}
        {/* ====================== */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 faq-reveal">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-blue-600 mb-3 block">
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-base md:text-lg">
            Expert answers to common questions about roofing, repairs, materials, and protection for your property.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-6 rounded-full" />
        </div>

        {/* ====================== */}
        {/* FILTER & SEARCH - KEPT SAME */}
        {/* ====================== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 md:mb-12 faq-reveal">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* ====================== */}
        {/* ACCORDION GRID - UPGRADED WITH ROOFING FAQS */}
        {/* ====================== */}
        <div className="space-y-3 md:space-y-4 mb-12 md:mb-16">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                index={index}
                isOpen={openItems.includes(index)}
                onToggle={() => handleToggle(index)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-slate-400 mb-3">
                <Icons.Document />
              </div>
              <p className="text-slate-500 text-base">
                No questions found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline underline-offset-4"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>

        {/* ====================== */}
        {/* KNOWLEDGE CARD - ROOFING SPECIFIC */}
        {/* ====================== */}
        <KnowledgeCard />

        {/* ====================== */}
        {/* RESOURCE LINKS - ROOFING FOCUSED */}
        {/* ====================== */}

      </div>
    </section>
  );
};

export default FAQ;