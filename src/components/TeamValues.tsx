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
import ceo from "@/assets/owner1.jpg";
import cfo from "@/assets/owner2.jpg";

gsap.registerPlugin(ScrollTrigger);

// ======================
// PREMIUM UNSPLASH IMAGES - CURATED
// ======================
const Images = {
  // CEO & Founder


  // Heritage
  Pattern: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  Studio: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
};

// ======================
// PREMIUM SVG ICONS - FULLY DEFINED
// ======================
const Icons = {
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h4v12H4V8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8h4v2c.6-.8 1.5-2 3-2 2.5 0 4 1.5 4 4v8h-4v-6c0-1.5-.5-2-2-2s-2 .5-2 2v6h-4V8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Quote: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10 11H6V7h4v4z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 11h-4V7h4v4z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
  ),
  Award: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 14l-2 6 6-2 6 2-2-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ======================
// CINEMATIC PARALLAX LAYER
// ======================
const ParallaxLayer = ({ children, speed = 0.1, className = "" }) => {
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
// HERO PORTRAIT - CEO SECTION (Image Left, Text Right)
// ======================
const CeoPortrait = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Gradient Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-700" />

        {/* Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={ceo}
            alt="David Taggart - Founder & CEO"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

          {/* Animated Border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke="url(#ceoGradient)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHovered ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <defs>
              <linearGradient id="ceoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6"
        >
          <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-blue-200">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Icons.Sparkle />
              FOUNDER & CEO
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 right-6"
        >
          <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-blue-200">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Icons.Award />
              CRAFT • INTEGRITY
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ======================
// CFO PORTRAIT - (Image Right, Text Left)
// ======================
const CfoPortrait = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Gradient Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-700" />

        {/* Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={cfo}
            alt="Jaqueline Taggart - Chief Financial Officer"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

          {/* Animated Border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke="url(#cfoGradient)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHovered ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <defs>
              <linearGradient id="cfoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6"
        >
          <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-blue-200">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Icons.Sparkle />
              CHIEF FINANCIAL OFFICER
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 right-6"
        >
          <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-blue-200">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Icons.Award />
              STRATEGY • GROWTH
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ======================
// LEADERSHIP SECTION
// ======================
const Leadership = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.leadership-reveal',
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
      className="relative bg-white py-14 md:py-18 lg:py-20 overflow-hidden"
    >
      {/* ====================== */}
      {/* PREMIUM BACKGROUND */}
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

      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-50 to-transparent opacity-60 blur-3xl" />

      {/* Heritage Pattern */}
      <ParallaxLayer speed={0.05} className="z-0">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2">
          <img
            src={Images.Pattern}
            alt="Heritage pattern"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.08} className="z-0">
        <div className="absolute top-20 left-0 w-1/4 h-1/3">
          <img
            src={Images.Studio}
            alt="Studio"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      {/* ====================== */}
      {/* MAIN CONTENT */}
      {/* ====================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-30">

        {/* ====================== */}
        {/* SECTION HEADER */}
        {/* ====================== */}
        <div className="max-w-3xl mx-auto text-center mb-20 leadership-reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-300 to-blue-500" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-blue-600">
              Our Leadership
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 leading-tight">
            Guiding with<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">
              vision & integrity
            </span>
          </h2>

          <p className="text-slate-600 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Experienced leadership committed to excellence in every project, partnership, and promise.
          </p>
        </div>

        {/* ====================== */}
        {/* CEO - IMAGE LEFT, TEXT RIGHT */}
        {/* ====================== */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="leadership-reveal">
            <CeoPortrait />
          </div>

          <div className="space-y-8 leadership-reveal">
            <div>
              <h3 className="text-3xl md:text-4xl font-light text-slate-900 mb-3">
                David Taggart
                <span className="block text-sm font-mono text-blue-600 mt-2 tracking-[0.2em] uppercase">
                  Founder & CEO
                </span>
              </h3>

              <div className="mt-6 relative">
                <div className="absolute -left-4 top-0 text-blue-400/30">
                  <Icons.Quote />
                </div>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed pl-6">
                  David Taggart founded the company with a clear vision: to create an organization built on precision craftsmanship, honest communication, and long-term relationships. With years of hands-on industry experience and leadership across residential and commercial projects, he understands that every structure is more than construction—it is protection for families, businesses, and investments.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Icons.Linkedin />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Icons.Mail />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* CFO - IMAGE RIGHT, TEXT LEFT */}
        {/* ====================== */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1 leadership-reveal">
            <div>
              <h3 className="text-3xl md:text-4xl font-light text-slate-900 mb-3">
                Jaqueline Taggart
                <span className="block text-sm font-mono text-blue-600 mt-2 tracking-[0.2em] uppercase">
                  Chief Financial Officer
                </span>
              </h3>

              <div className="mt-6 relative">
                <div className="absolute -left-4 top-0 text-blue-400/30">
                  <Icons.Quote />
                </div>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed pl-6">
                  Jaqueline Taggart brings strategic financial leadership with over 15 years of experience in corporate finance and operational scaling. As CFO, she ensures sustainable growth, financial transparency, and long-term stability. Her expertise in resource allocation and financial planning enables the company to invest in quality materials, advanced training, and exceptional talent—all while maintaining competitive pricing for clients.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Icons.Linkedin />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Icons.Mail />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 leadership-reveal">
            <CfoPortrait />
          </div>
        </div>

        {/* ====================== */}
        {/* FOOTER NOTE */}
        {/* ====================== */}
        <div className="text-center mt-32">
          <p className="text-xs text-slate-400 font-mono">
            Quality over shortcuts • Service over sales pressure
          </p>
        </div>
      </div>
    </section>
  );
};

export default Leadership;