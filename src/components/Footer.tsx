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
// PREMIUM UNSplash IMAGES
// ======================
const Images = {
  Hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  Pattern: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  Abstract: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
};

// ======================
// PREMIUM SVG ICONS
// ======================
const Icons = {
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h4v12H4V8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8h4v2c.6-.8 1.5-2 3-2 2.5 0 4 1.5 4 4v8h-4v-6c0-1.5-.5-2-2-2s-2 .5-2 2v6h-4V8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.8 9 5-.2-2.2.6-4.5 2.5-6 2.5-2 6-1.5 7.5 1 1.1-.2 2.2-.6 3-1 0 0-.5 1.7-2 3 1.1-.1 2-.5 3-1 0 0-.5 1.6-2 3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Location: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
  ),
  Infinity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13.833 9.167C14.5 8.5 15.3 8 16.5 8C18.5 8 20 9.5 20 12C20 14.5 18.5 16 16.5 16C14.5 16 13 14.5 13 12C13 9.5 11.5 8 9.5 8C7.5 8 6 9.5 6 12C6 14.5 7.5 16 9.5 16C10.7 16 11.5 15.5 12.167 14.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Roofing: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 10L12 3L21 10L18 13L12 8L6 13L3 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 13V19H18V13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Inspection: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Repair: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M16 4L20 8L12 16H8V12L16 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20H20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Replacement: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M20 12H4M12 4v16M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Residential: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 10L12 3L21 10L18 13L12 8L6 13L3 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 13V19H16V13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Commercial: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8V4H16V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Emergency: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Maintenance: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Warranty: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Financing: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

// ======================
// CINEMATIC PARALLAX LAYER
// ======================
const ParallaxLayer = ({ children, speed = 0.05, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`absolute inset-0 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ======================
// QUANTUM PARTICLE FIELD
// ======================
const QuantumParticles = () => {
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.2 + 0.05,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, -15, 10, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// ======================
// NEWSLETTER FORM
// ======================
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          relative flex items-center bg-white/5 backdrop-blur-sm rounded-full border transition-all duration-500
          ${isFocused
            ? 'border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]'
            : 'border-white/10 hover:border-white/20'
          }
        `}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            Subscribe
            <Icons.ArrowRight />
          </motion.button>
        </div>
      </form>

      {/* Success Message */}
      <AnimatePresence>
        {isSubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-8 left-0 right-0 text-center"
          >
            <span className="text-xs text-blue-400">
              ✓ Thank you for subscribing
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ======================
// COMPREHENSIVE SERVICES SECTION
// ======================
const ServiceLinks = () => {
  const mainServices = [
    { label: 'Roof Repair Services', href: '/roof-repair', icon: Icons.Repair },
    { label: 'Roof Replacement', href: '/roof-replacement', icon: Icons.Replacement },
    { label: 'Roof Inspections', href: '/roof-inspection', icon: Icons.Inspection },
    { label: 'Preventive Maintenance', href: '/maintenance', icon: Icons.Maintenance },
    { label: 'Residential Roofing', href: '/residential', icon: Icons.Residential },
    { label: 'Commercial Roofing', href: '/commercial', icon: Icons.Commercial },
    { label: 'Emergency Services', href: '/emergency', icon: Icons.Emergency },
    { label: 'Storm Damage Restoration', href: '/storm-damage', icon: Icons.Repair },
    { label: 'New Roof Installation', href: '/new-roof', icon: Icons.Roofing },
    { label: 'Roof Ventilation', href: '/ventilation', icon: Icons.Inspection },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50 flex items-center gap-2">
        <Icons.Sparkle />
        Our Services
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {mainServices.map((service) => (
          <motion.a
            key={service.label}
            href={service.href}
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-3 text-sm text-white/70 hover:text-white transition-all duration-300 group py-1"
          >
            <span className="text-blue-400/50 group-hover:text-blue-400 transition-colors">
              <service.icon />
            </span>
            <span>{service.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// ======================
// ROOFING MATERIALS SECTION
// ======================
const MaterialsSection = () => {
  const materials = [
    { label: 'Asphalt Shingle Roofing', href: '/asphalt-shingle' },
    { label: 'Metal Roofing Systems', href: '/metal-roofing' },
    { label: 'Tile Roofing', href: '/tile-roofing' },
    { label: 'Flat Roofing Systems', href: '/flat-roofing' },
  ];

  return (
    <div className="space-y-3 mt-4">
      <h5 className="text-[10px] font-mono tracking-[0.2em] uppercase text-blue-400/60">
        Materials We Install
      </h5>
      <div className="space-y-2">
        {materials.map((material) => (
          <motion.a
            key={material.label}
            href={material.href}
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            <span className="text-[8px] text-blue-400/40">●</span>
            {material.label}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// ======================
// CONTACT INFO WITH ADDITIONAL DETAILS
// ======================
const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50 flex items-center gap-2">
          <Icons.Sparkle />
          Contact Us
        </h4>
        <div className="space-y-4">
          <a href="mailto:studio@a5roofing.com" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group">
            <span className="text-blue-400/70 group-hover:text-blue-400">
              <Icons.Mail />
            </span>
            studio@a5roofing.com
          </a>
          <a href="tel:+12125550170" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group">
            <span className="text-blue-400/70 group-hover:text-blue-400">
              <Icons.Phone />
            </span>
            +1 (212) 555-0170
          </a>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span className="text-blue-400/70">
              <Icons.Location />
            </span>
            <span>Houston, Dallas, Austin, San Antonio & Across Texas</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span className="text-blue-400/70">
              <Icons.Infinity />
            </span>
            <span>24/7 Emergency: (212) 555-0199</span>
          </div>
        </div>
      </div>

      {/* Service Areas */}
      <div className="space-y-3">
        <h5 className="text-[10px] font-mono tracking-[0.2em] uppercase text-blue-400/60">
          Service Areas
        </h5>
        <p className="text-xs text-white/50 leading-relaxed">
          Houston • Dallas • Austin • San Antonio • Fort Worth • Arlington • Plano • El Paso • Corpus Christi • Lubbock & Surrounding Texas Communities
        </p>
      </div>
    </div>
  );
};

// ======================
// CERTIFICATIONS GRID
// ======================
const CertificationsGrid = () => {
  const certifications = [
    { cert: 'ISO', number: '9001:2024', icon: Icons.Warranty },
    { cert: 'LEED', number: 'Platinum', icon: Icons.Warranty },
    { cert: 'BREEAM', number: 'Outstanding', icon: Icons.Warranty },
    { cert: 'GAF', number: 'Master Elite', icon: Icons.Warranty },
    { cert: 'CertainTeed', number: 'SELECT ShingleMaster', icon: Icons.Warranty },
    { cert: 'OSHA', number: 'Certified', icon: Icons.Warranty },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {certifications.map((cert, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="relative p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
        >
          <div className="flex items-center gap-2">
            <span className="text-blue-400/50 group-hover:text-blue-400 transition-colors">
              <cert.icon />
            </span>
            <div>
              <span className="text-xs font-mono text-blue-400/80">{cert.cert}</span>
              <p className="text-[10px] text-white/40">{cert.number}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ======================
// SOCIAL LINKS
// ======================
const SocialLinks = () => {
  const socials = [
    { icon: Icons.Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Icons.Twitter, href: '#', label: 'Twitter' },
    { icon: Icons.Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          aria-label={social.label}
        >
          <social.icon />
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      ))}
    </div>
  );
};

// ======================
// HORIZONTAL SCROLL MARQUEE - WITH HOVER EFFECT
// ======================
const LegacyMarquee = () => {
  return (
    <div className="relative overflow-hidden py-8 border-t border-white/10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-8 group">
            <span className="text-xs font-mono text-blue-400/40 group-hover:text-blue-400 transition-colors duration-300">
              <Icons.Sparkle />
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors duration-300">
              PRECISION ROOFING
            </span>
            <span className="text-xs font-mono text-blue-400/40 group-hover:text-blue-400 transition-colors duration-300">
              <Icons.Sparkle />
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors duration-300">
              SINCE 2007
            </span>
            <span className="text-xs font-mono text-blue-400/40 group-hover:text-blue-400 transition-colors duration-300">
              <Icons.Sparkle />
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors duration-300">
              TRUST • QUALITY • PROTECTION
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ======================
// MAIN FOOTER - COMPREHENSIVE VERSION
// ======================
const Footer = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <footer
      ref={sectionRef}
      className="relative bg-slate-950 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #0f1a2a, #030712)'
      }}
    >
      {/* ====================== */}
      {/* CINEMATIC BACKGROUND */}
      {/* ====================== */}

      {/* Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-950/30 to-transparent opacity-60 blur-3xl" />

      {/* Parallax Layers */}
      <ParallaxLayer speed={0.03} className="z-0">
        <div className="absolute top-40 right-0 w-2/5 h-2/5">
          <img
            src={Images.Abstract}
            alt="Abstract architecture"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.05} className="z-0">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3">
          <img
            src={Images.Pattern}
            alt="Heritage pattern"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      {/* Quantum Particles */}
      <QuantumParticles />

      {/* ====================== */}
      {/* MAIN CONTENT - COMPREHENSIVE */}
      {/* ====================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-30">

        {/* ====================== */}
        {/* TOP SECTION - THREE COLUMNS */}
        {/* ====================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-24 pb-16 border-b border-white/10">

          {/* Column 1 - Logo, Social, Newsletter (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-600/30">
                  <span className="text-white font-bold text-xl">A5</span>
                </div>
                <div>
                  <span className="text-white/90 font-light text-lg block">A5 Roofing</span>
                  <span className="text-[10px] text-blue-400/60 font-mono tracking-wider">PRECISION • PROTECTION • TRUST</span>
                </div>
              </div>

              <p className="text-white/50 text-xs leading-relaxed">
                Precision roofing built for long-term protection. Dependable inspections, repairs, replacements, and maintenance focused on durability, safety, and honest communication.
              </p>

              <SocialLinks />
            </motion.div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">
                Subscribe to insights
              </h4>
              <NewsletterForm />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/warranty" className="text-[10px] text-white/30 hover:text-blue-400 transition-colors flex items-center gap-1">
                <Icons.Warranty /> Warranty
              </a>
              <a href="/financing" className="text-[10px] text-white/30 hover:text-blue-400 transition-colors flex items-center gap-1">
                <Icons.Financing /> Financing
              </a>
              <a href="/insurance" className="text-[10px] text-white/30 hover:text-blue-400 transition-colors flex items-center gap-1">
                <Icons.Warranty /> Insurance Support
              </a>
            </div>
          </div>

          {/* Column 2 - Services (5 columns) */}
          <div className="lg:col-span-5">
            <ServiceLinks />
            <MaterialsSection />
          </div>

          {/* Column 3 - Contact & Certifications (4 columns) */}
          <div className="lg:col-span-4">
            <ContactInfo />

            {/* Certifications Grid - Added Back */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50 flex items-center gap-2 mb-3">
                <Icons.Sparkle />
                Certifications & Accreditations
              </h4>
              <CertificationsGrid />
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* LEGACY MARQUEE */}
        {/* ====================== */}
        <LegacyMarquee />

        {/* ====================== */}
        {/* BOTTOM BAR */}
        {/* ====================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-[10px] text-white/30">
          <div className="flex items-center gap-4">
            <span>© 2026 A5 Roofing</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>All rights reserved</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/licenses" className="hover:text-white transition-colors">Licenses</a>
            <a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <div className="text-white/20">
            <span className="font-mono">A5 PRECISION. A5 RESULTS.</span>
          </div>
        </div>
      </div>

      {/* ====================== */}
      {/* FINAL ENERGY WAVE */}
      {/* ====================== */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-20 md:h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#footerWave)"
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
          <defs>
            <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;