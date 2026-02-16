import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ======================
// PREMIUM UNSplash IMAGES - CURATED
// ======================
const Images = {
  Hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  Detail: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
  Pattern: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
};

// ======================
// MINIMAL SVG ICONS
// ======================
const Icons = {
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
  ),
};

// ======================
// SUBTLE PARALLAX - NO TILT
// ======================
const ParallaxLayer = ({ children, speed = 0.2, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 50]);

  return (
    <motion.div ref={ref} style={{ y }} className={`absolute inset-0 will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
};

// ======================
// CLEAN GLASS CARD - NO 3D TILT
// ======================
const GlassCard = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? {
        scale: 1.01,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.08)"
      } : {
        scale: 1,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)"
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-xl overflow-hidden ${className}`}
    >
      {/* Subtle Gradient Border */}
      <div className="absolute inset-0 rounded-2xl border border-blue-200/30 pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>

      {/* Minimal Corner Accent */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-blue-200/50" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-blue-200/50" />
    </motion.div>
  );
};

// ======================
// STAT COUNTER - CLEAN
// ======================
const StatCounter = ({ value, label, suffix = "", delay = 0 }) => {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const duration = 2000;
    const end = parseInt(value);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-light text-blue-900 mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-xs md:text-sm font-medium text-blue-600/70 uppercase tracking-[0.2em]">
        {label}
      </div>
    </motion.div>
  );
};

// ======================
// MAIN CTA SECTION - CLEAN PROFESSIONAL
// ======================
const CTASection = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
      className="relative bg-white py-12 md:py-14 lg:py-16 overflow-hidden"
    >
      {/* ====================== */}
      {/* CLEAN BACKGROUND */}
      {/* ====================== */}

      {/* Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
                            linear-gradient(to right, #2563eb 1px, transparent 1px),
                            linear-gradient(to bottom, #2563eb 1px, transparent 1px)
                        `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Light Gradient Orbs */}
      <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-40 -right-40 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-30" />

      {/* Hero Image - Subtle */}
      <ParallaxLayer speed={0.1} className="z-0">
        <div className="absolute top-0 right-0 w-2/5 h-full">
          <img
            src={Images.Hero}
            alt="Modern architecture"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white to-transparent" />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.15} className="z-0">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2">
          <img
            src={Images.Detail}
            alt="Architectural detail"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>
      </ParallaxLayer>

      {/* ====================== */}
      {/* MAIN CONTENT */}
      {/* ====================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-30">

        {/* ====================== */}
        {/* SECTION HEADER - CLEAN */}
        {/* ====================== */}
        <div className="max-w-3xl mx-auto text-center mb-24 cta-reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-300 to-blue-500" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-blue-600">
              Limited Availability
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 leading-tight">
            Ready to engineer your<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">
              architectural legacy?
            </span>
          </h2>

          <p className="text-slate-600 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Join an exclusive circle of clients who demand nothing less than perfection.
          </p>
        </div>

        {/* ====================== */}
        {/* STATS GRID - CLEAN */}
        {/* ====================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24 cta-reveal">
          <StatCounter value="500" suffix="+" label="Projects" delay={0.1} />
          <StatCounter value="25" suffix="yr" label="Warranty" delay={0.15} />
          <StatCounter value="100" suffix="%" label="Precision" delay={0.2} />
          <StatCounter value="17" suffix="+" label="Years" delay={0.25} />
        </div>

        {/* ====================== */}
        {/* MAIN CTA CARD - CLEAN */}
        {/* ====================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-24"
        >
          <GlassCard className="p-10 md:p-14">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200/50">
                  <Icons.Sparkle />
                  <span className="text-xs font-medium tracking-wider text-blue-700">
                    A5 Roofing • 2026
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 leading-tight">
                  Your vision,<br />
                  <span className="font-medium text-blue-800">
                    precision engineered
                  </span>
                </h3>

                <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                  Experience the pinnacle of architectural craftsmanship with our exclusive Legacy Circle program. Priority access, lifetime support, and heritage documentation.
                </p>

                {/* Feature List */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    "25-year warranty",
                    "AI-driven maintenance",
                    "Heritage vault",
                    "Lifetime support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icons.Check />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - CTA Buttons */}
              <div className="space-y-4">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full px-8 py-5 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-xs font-medium tracking-[0.2em] uppercase rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 block text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Schedule Consultation
                    <Icons.ArrowRight />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-950"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.a>

                <motion.a
                  href="/portfolio"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full px-8 py-5 bg-white text-blue-800 text-xs font-medium tracking-[0.2em] uppercase rounded-full border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 block text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    View Portfolio
                    <Icons.ArrowRight />
                  </span>
                </motion.a>

                {/* Trust Indicator */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white flex items-center justify-center text-blue-800 text-xs font-medium shadow-sm"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">500+</span> industry leaders
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* ====================== */}
        {/* BOTTOM CARDS - SERVICES */}
        {/* ====================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Architectural Consultation",
              desc: "Deep immersion into your vision with our principal engineers",
              icon: "⌗",
              delay: 0.3
            },
            {
              title: "Digital Twin Engineering",
              desc: "Parametric modeling with sub-millimeter precision",
              icon: "⎔",
              delay: 0.35
            },
            {
              title: "Heritage Documentation",
              desc: "Legacy vault preservation for future generations",
              icon: "∞",
              delay: 0.4
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
            >
              <GlassCard className="p-8 text-center hover:bg-white transition-all duration-500">
                <div className="text-3xl text-blue-700 mb-4">{item.icon}</div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-6">
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-xs font-medium tracking-wider uppercase transition-colors group">
                    Learn more
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default CTASection;