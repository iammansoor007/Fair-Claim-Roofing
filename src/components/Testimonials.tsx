import { useRef, useEffect, useState, useCallback } from "react";
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
  Quote: () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M10 11H6V7H10V11Z" stroke="url(#quoteGradient)" strokeWidth="1.2" />
      <path d="M18 11H14V7H18V11Z" stroke="url(#quoteGradient)" strokeWidth="1.2" />
      <defs>
        <linearGradient id="quoteGradient" x1="6" y1="7" x2="18" y2="11">
          <stop stopColor="#2563eb" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Verified: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="1.2" />
      <path d="M8 12L11 15L16 9" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// ======================
// SUBTLE BACKGROUND
// ======================
const SubtleBackground = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage: `
                    linear-gradient(to right, #2563eb 1px, transparent 1px),
                    linear-gradient(to bottom, #2563eb 1px, transparent 1px)
                `,
        backgroundSize: '60px 60px',
      }}
    />
    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/20 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-50/20 to-transparent" />
  </div>
);

// ======================
// FLOATING PARTICLES - SUBTLE
// ======================
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-0.5 bg-blue-400/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

// ======================
// MAIN TESTIMONIAL CARD - PROFESSIONAL
// ======================
const TestimonialCard = ({ testimonial, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Very subtle 3D effect - barely noticeable
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.2, 0.2], [1, -1]);
  const rotateY = useTransform(springX, [-0.2, 0.2], [-1, 1]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 0.1;
    const yPct = (mouseY / rect.height - 0.5) * 0.1;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="relative w-full mx-auto"
    >
      <div className={`
                relative bg-white rounded-2xl p-8 md:p-10 lg:p-12
                border transition-all duration-500
                ${isActive
          ? 'border-blue-200 shadow-2xl shadow-blue-900/10'
          : 'border-blue-100/50 shadow-xl shadow-blue-900/5'
        }
            `}>
        {/* Quote Icon */}
        <div className="mb-6 opacity-40">
          <Icons.Quote />
        </div>

        {/* Testimonial Text */}
        <p className="text-slate-700 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 md:mb-10 font-light">
          "{testimonial.text}"
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-md" />
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-800 font-medium text-base md:text-lg">
              {testimonial.avatar}
            </div>
          </div>

          {/* Author Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-base md:text-lg font-semibold text-slate-900">
                {testimonial.name}
              </h4>
              <span className="text-blue-600">
                <Icons.Verified />
              </span>
            </div>
            <p className="text-sm md:text-base text-slate-500">
              {testimonial.position}, {testimonial.company}
            </p>
          </div>
        </div>

        {/* Minimal Corner Accent */}
        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-blue-200/50" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-blue-200/50" />
      </div>
    </motion.div>
  );
};

// ======================
// CAROUSEL NAVIGATION - PROFESSIONAL
// ======================
const CarouselNavigation = ({ total, current, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-10 md:mt-12">
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(current - 1)}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-blue-200 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
        aria-label="Previous testimonial"
      >
        <Icons.ArrowLeft />
      </motion.button>

      {/* Index Indicator */}
      <div className="flex items-center gap-3 px-4">
        <span className="text-sm font-mono font-medium text-blue-600">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="text-sm font-mono text-slate-300">
          /
        </span>
        <span className="text-sm font-mono text-slate-400">
          {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(current + 1)}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-blue-200 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
        aria-label="Next testimonial"
      >
        <Icons.ArrowRight />
      </motion.button>
    </div>
  );
};

// ======================
// TESTIMONIAL MARQUEE - FIXED (NO FLICKER)
// ======================
const TestimonialMarquee = ({ testimonials }) => {
  const containerRef = useRef(null);

  // Use CSS transform instead of Framer Motion for smoother performance
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const firstRow = container.querySelector('.marquee-row-1');
    const secondRow = container.querySelector('.marquee-row-2');

    if (!firstRow || !secondRow) return;

    let animation1, animation2;

    const startAnimation = () => {
      animation1 = firstRow.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-2000px)' }],
        {
          duration: 40000,
          iterations: Infinity,
          easing: 'linear'
        }
      );

      animation2 = secondRow.animate(
        [{ transform: 'translateX(-2000px)' }, { transform: 'translateX(0)' }],
        {
          duration: 45000,
          iterations: Infinity,
          easing: 'linear'
        }
      );
    };

    startAnimation();

    return () => {
      if (animation1) animation1.cancel();
      if (animation2) animation2.cancel();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-6 md:py-8">
      {/* Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-20" />

      {/* First Row */}
      <div className="marquee-row-1 flex gap-4 md:gap-6 mb-4 md:mb-6 will-change-transform">
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <div
            key={`marquee-1-${i}`}
            className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100/30 shadow-sm"
          >
            <p className="text-slate-600 text-xs md:text-sm mb-2 line-clamp-2">
              "{t.text.slice(0, 70)}..."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-800 text-[10px] font-medium">
                {t.avatar}
              </div>
              <span className="text-xs font-medium text-slate-700">{t.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="marquee-row-2 flex gap-4 md:gap-6 will-change-transform">
        {[...testimonials, ...testimonials, ...testimonials].reverse().map((t, i) => (
          <div
            key={`marquee-2-${i}`}
            className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100/30 shadow-sm"
          >
            <p className="text-slate-600 text-xs md:text-sm mb-2 line-clamp-2">
              "{t.text.slice(0, 70)}..."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-800 text-[10px] font-medium">
                {t.avatar}
              </div>
              <span className="text-xs font-medium text-slate-700">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ======================
// MAIN TESTIMONIALS SECTION - PROFESSIONAL MODERN
// ======================
const Testimonials = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "James Mercer",
      position: "Principal",
      company: "Mercer Estates",
      avatar: "JM",
      text: "The precision and artistry they brought to our estate was beyond anything we've experienced. This isn't just roofing—it's structural sculpture. Every detail was executed with military-grade precision and the eye of a master craftsman.",
    },
    {
      id: 2,
      name: "Elena Chen",
      position: "Director of Facilities",
      company: "Summit Tech",
      avatar: "EC",
      text: "They engineered a system that not only survived our Texas climate but thrived in it. The predictive maintenance program has saved us millions. This is what happens when engineers are also artists.",
    },
    {
      id: 3,
      name: "Michael Whitfield",
      position: "Curator",
      company: "Heritage Museum",
      avatar: "MW",
      text: "Restoring a 1927 landmark requires a unique blend of reverence and innovation. They delivered both. The copper work alone is worthy of museum display. We've found our preservation partners for life.",
    },
    {
      id: 4,
      name: "Sarah Okonkwo",
      position: "CEO",
      company: "Eastgate Distribution",
      avatar: "SO",
      text: "Industrial scale with bespoke attention. They completed our campus retrofit ahead of schedule and under budget. The 25-year warranty gives us peace of mind, but the craftsmanship gives us pride.",
    },
    {
      id: 5,
      name: "Robert Sterling",
      position: "Managing Partner",
      company: "Sterling Holdings",
      avatar: "RS",
      text: "When your family name is on the building, only the best will do. They understood that implicitly. The legacy documentation they provided will be passed down through generations.",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-element',
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
      className="relative bg-white py-10 md:py-12 lg:py-14 overflow-hidden"
    >
      {/* Subtle Background */}
      <SubtleBackground />
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">

        {/* ====================== */}
        {/* SECTION HEADER - PROFESSIONAL MODERN */}
        {/* ====================== */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 reveal-element">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-blue-600 mb-3 block">
            Testimonials
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 mb-4">
            Client Voices
          </h2>

          <p className="text-slate-500 text-base md:text-lg">
            Trusted by industry leaders across the nation.
          </p>

          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-6 rounded-full" />
        </div>

        {/* ====================== */}
        {/* FEATURED TESTIMONIAL */}
        {/* ====================== */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <TestimonialCard
                testimonial={testimonials[activeIndex]}
                isActive={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <CarouselNavigation
            total={testimonials.length}
            current={activeIndex}
            onChange={(index) => {
              if (index < 0) setActiveIndex(testimonials.length - 1);
              else if (index >= testimonials.length) setActiveIndex(0);
              else setActiveIndex(index);
            }}
          />
        </div>

        {/* ====================== */}
        {/* INFINITE MARQUEE - FIXED */}
        {/* ====================== */}
        <div className="reveal-element">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-gradient-to-r from-blue-400 to-blue-600" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-slate-400">
              More Client Stories
            </span>
          </div>
          <TestimonialMarquee testimonials={testimonials} />
        </div>

        {/* ====================== */}
        {/* TRUST INDICATORS - MINIMAL */}
        {/* ====================== */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 md:pt-10 mt-8 border-t border-blue-100/50 reveal-element">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white flex items-center justify-center text-blue-800 text-xs font-medium shadow-sm"
                >
                  {t.avatar}
                </div>
              ))}
            </div>
            <div className="text-xs md:text-sm text-slate-600">
              <span className="font-semibold text-slate-900">500+</span> projects delivered
            </div>
          </div>

          <div className="text-xs md:text-sm text-slate-400 font-mono">
            <span className="text-blue-600">✦</span> Since 2007
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;