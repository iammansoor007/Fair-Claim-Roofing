import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";

gsap.registerPlugin(ScrollTrigger);

// ======================
// PREMIUM PORTFOLIO PROJECTS
// ======================
const projects = [
  {
    number: "01",
    title: "Mercer Estate",
    category: "Residential",
    image: portfolio1,
    location: "Greenwich, CT",
    year: "2024",
    accent: "from-blue-600 to-blue-800",
    architect: "Foster + Partners",
    scope: "Full Restoration",
    desc: "A complete restoration of this historic Greenwich estate, preserving its architectural heritage while modernizing its structural systems."
  },
  {
    number: "02",
    title: "Summit Tech Campus",
    category: "Commercial",
    image: portfolio2,
    location: "Austin, TX",
    year: "2023",
    accent: "from-blue-500 to-blue-700",
    architect: "Gensler",
    scope: "New Construction",
    desc: "A cutting-edge tech campus featuring sustainable materials and innovative roofing systems designed for the Texas climate."
  },
  {
    number: "03",
    title: "Heritage Museum",
    category: "Storm Damage Repair",
    image: portfolio3,
    location: "Boston, MA",
    year: "2024",
    accent: "from-blue-700 to-blue-900",
    architect: "Renzo Piano",
    scope: "Preservation",
    desc: "Emergency restoration after severe storm damage, preserving priceless artifacts and structural integrity."
  },
  {
    number: "04",
    title: "Eastgate Distribution",
    category: "Industrial",
    image: portfolio4,
    location: "Chicago, IL",
    year: "2023",
    accent: "from-blue-600 to-blue-800",
    architect: "SOM",
    scope: "Structural Upgrade",
    desc: "Large-scale industrial facility upgrade with enhanced load-bearing capacity and weather resistance."
  },
  {
    number: "05",
    title: "Whitfield Manor",
    category: "Luxury Estate",
    image: portfolio5,
    location: "Los Angeles, CA",
    year: "2024",
    accent: "from-blue-500 to-blue-700",
    architect: "Olson Kundig",
    scope: "Storm Damage Repair",
    desc: "Comprehensive restoration of this luxury hillside estate after wildfire damage."
  }
];

// ======================
// MARQUEE ITEM - DETAILS ONLY ON HOVER
// ======================
const MarqueeItem = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.1 });

  const rotateX = useTransform(springY, [-0.4, 0.4], [3, -3]);
  const rotateY = useTransform(springX, [-0.4, 0.4], [-3, 3]);

  const handleMouseMove = (e) => {
    if (!itemRef.current || !isHovered) return;
    const rect = itemRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 0.4;
    const yPct = (mouseY / rect.height - 0.5) * 0.4;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={itemRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1200,
        scale: isHovered ? 1.02 : 1,
      }}
      className="relative w-[200px] sm:w-[240px] md:w-[280px] h-[280px] sm:h-[320px] md:h-[360px] flex-shrink-0 cursor-pointer will-change-transform transition-transform duration-300"
    >
      {/* Card */}
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/20">
        {/* Background Image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)'
          }}
        />

        {/* Base Gradient Overlay - Always visible but subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Blue Overlay on Hover - Slight blue tint */}
        <motion.div
          className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated Border - Only on hover */}
        {isHovered && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        )}

        {/* Content - Always visible (basic info) */}
        <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
          {/* Category Badge - Always visible */}
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/30 w-fit mb-1 sm:mb-2">
            <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-r ${project.accent}`} />
            <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider text-white">
              {project.category}
            </span>
          </span>

          {/* Title - Always visible */}
          <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1 leading-tight">
            {project.title}
          </h3>

          {/* Location & Year - Always visible */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-white/70 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
            <span className="truncate max-w-[80px] sm:max-w-none">{project.location}</span>
            <span className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-white/30" />
            <span>{project.year}</span>
          </div>

          {/* DETAILS - ONLY SHOW ON HOVER */}
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-white/80 text-[8px] sm:text-[10px] leading-relaxed mb-1 sm:mb-2 line-clamp-2">
                  {project.desc}
                </p>
                <div className="flex items-center justify-between">
                  <div className="hidden xs:block">
                    <span className="text-white/40 text-[6px] sm:text-[8px] uppercase">Architect</span>
                    <p className="text-white text-[8px] sm:text-[10px] font-light truncate max-w-[80px] sm:max-w-none">
                      {project.architect}
                    </p>
                  </div>
                  <motion.button
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-600/30 backdrop-blur-sm rounded-lg text-white text-[8px] sm:text-[10px] font-medium flex items-center gap-0.5 sm:gap-1 hover:bg-blue-600/50 transition-colors border border-blue-400/30"
                    whileHover={{ x: 3 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle view project click
                    }}
                  >
                    View
                    <svg
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Number Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 text-white/20 text-2xl sm:text-3xl font-black">
          {project.number}
        </div>
      </div>
    </motion.div>
  );
};

// ======================
// INFINITE MARQUEE - FIXED AND RUNNING
// ======================
const InfiniteMarquee = ({ projects, direction = "left", speed = 45 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);

  // Create infinite set of projects (enough for smooth looping)
  const infiniteProjects = useMemo(() => {
    // Repeat projects enough times to ensure continuous loop
    return [...projects, ...projects, ...projects, ...projects, ...projects];
  }, [projects]);

  // Initialize GSAP animation
  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const itemWidth = window.innerWidth < 640 ? 216 : window.innerWidth < 768 ? 256 : 296; // 200+16, 240+16, 280+16
    const totalWidth = itemWidth * projects.length;
    const distance = direction === "left" ? -totalWidth : totalWidth;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Set initial position based on direction
    gsap.set(marquee, {
      x: direction === "left" ? 0 : -totalWidth
    });

    // Create new animation with proper looping
    animationRef.current = gsap.to(marquee, {
      x: distance,
      duration: speed * (projects.length / 3), // Adjust speed based on number of items
      repeat: -1,
      ease: "none",
      modifiers: {
        x: (x) => {
          const value = parseFloat(x);
          if (direction === "left") {
            return value <= -totalWidth ? `${value + totalWidth}px` : `${value}px`;
          } else {
            return value >= 0 ? `${value - totalWidth}px` : `${value}px`;
          }
        }
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [direction, speed, projects]);

  // Handle hover pause/resume
  useEffect(() => {
    if (!animationRef.current) return;

    if (isHovered) {
      animationRef.current.pause();
    } else {
      animationRef.current.resume();
    }
  }, [isHovered]);

  return (
    <div
      className="relative overflow-hidden py-3 sm:py-4 md:py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fade edges - Responsive fade widths */}
      <div className="absolute left-0 top-0 bottom-0 w-16 xs:w-20 sm:w-24 md:w-32 lg:w-40 z-20 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 xs:w-20 sm:w-24 md:w-32 lg:w-40 z-20 pointer-events-none bg-gradient-to-l from-white via-white/90 to-transparent" />

      {/* Top/bottom fade - Reduced on mobile */}
      <div className="absolute inset-x-0 top-0 h-6 sm:h-8 md:h-12 z-20 pointer-events-none bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-6 sm:h-8 md:h-12 z-20 pointer-events-none bg-gradient-to-t from-white to-transparent" />

      {/* Marquee track */}
      <div
        ref={marqueeRef}
        className="flex gap-2 sm:gap-3 md:gap-4"
        style={{
          willChange: 'transform',
          display: 'flex',
          flexWrap: 'nowrap',
        }}
      >
        {infiniteProjects.map((project, index) => (
          <MarqueeItem
            key={`${project.number}-${index}`}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

// ======================
// MAIN PORTFOLIO COMPONENT
// ======================
const Portfolio = () => {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  const headerParallax = useTransform(smoothProgress, [0, 1], [0, -30]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Split projects into two overlapping rows for visual interest
  const row1 = projects.slice(0, 3);
  const row2 = projects.slice(2, 5);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
    >
      {/* Background blue grid and gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue gradient lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />

        {/* Additional blue accents */}
        <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-20" />
        <div className="absolute inset-x-0 bottom-20 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-20" />

        {/* Light blue grid pattern - Reduced opacity on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6f0ff_1px,transparent_1px),linear-gradient(to_bottom,#e6f0ff_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] opacity-10 sm:opacity-15 md:opacity-20" />

        {/* Gradient orbs - Hidden on very small screens */}
        <div className="hidden sm:block absolute top-40 -left-20 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-blue-400/5 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute bottom-40 -right-20 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          style={{ y: headerParallax }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700" />
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-700">
              Our Work
            </span>
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-l from-blue-500 to-blue-700" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight px-2">
            Featured<br className="block xs:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">
              {" "}Projects
            </span>
          </h2>
        </motion.div>

        {/* Infinite Marquees */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <InfiniteMarquee projects={row1} direction="left" speed={45} />
          <InfiniteMarquee projects={row2} direction="right" speed={40} />
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-8 sm:mt-10 md:mt-12"
        >
          <button
            onClick={() => setLightbox(portfolio1)}
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1 sm:gap-2 hover:scale-105 hover:from-blue-700 hover:to-blue-900"
          >
            View All Projects
            <svg
              width="14"
              height="14"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <PremiumLightbox
            image={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          className="relative block w-full h-8 sm:h-10 md:h-12 lg:h-16"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#portfolioWave)"
            d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
          />
          <defs>
            <linearGradient id="portfolioWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

// ======================
// PREMIUM LIGHTBOX
// ======================
const PremiumLightbox = ({ image, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-slate-900/98 backdrop-blur-xl flex items-center justify-center cursor-pointer p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-800 backdrop-blur-md border border-blue-400/30 rounded-full px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 text-white text-[10px] sm:text-xs font-medium hover:from-blue-700 hover:to-blue-900 transition-all"
        onClick={onClose}
      >
        Close
      </motion.button>

      <motion.img
        src={image}
        alt="Project preview"
        className="max-w-full max-h-[90vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      />
    </motion.div>
  );
};

export default Portfolio;