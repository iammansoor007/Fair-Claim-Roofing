import { useRef, useEffect, useState } from "react";
import {
    motion,
    useInView
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ======================
// PREMIUM SVG ICONS - WITH SEO ATTRIBUTES
// ======================
const Icons = {
    WhyChoose: {
        Experience: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-label="25+ years experience icon">
                <circle cx="12" cy="12" r="9" stroke="url(#experienceGradient)" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="url(#experienceGradient)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                    <linearGradient id="experienceGradient" x1="3" y1="3" x2="21" y2="21">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        Honest: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-label="honest recommendations icon">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" stroke="url(#honestGradient)" strokeWidth="1.5" />
                <defs>
                    <linearGradient id="honestGradient" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        Materials: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-label="premium roofing materials icon">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="url(#materialsGradient)" strokeWidth="1.5" />
                <path d="M8 8h8v8H8V8z" stroke="url(#materialsGradient)" strokeWidth="1.5" />
                <defs>
                    <linearGradient id="materialsGradient" x1="4" y1="4" x2="20" y2="20">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        Communication: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-label="clear communication icon">
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9" stroke="url(#commGradient)" strokeWidth="1.5" />
                <defs>
                    <linearGradient id="commGradient" x1="3" y1="3" x2="21" y2="21">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        CustomerFirst: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-label="customer first service icon">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="url(#customerGradient)" strokeWidth="1.5" />
                <path d="M12 8v4M12 16h.01" stroke="url(#customerGradient)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                    <linearGradient id="customerGradient" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        Certified: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-label="certified professionals icon">
                <path d="M12 2L3 7v7c0 5.5 9 8 9 8s9-2.5 9-8V7l-9-5z" stroke="url(#certifiedGradient)" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="url(#certifiedGradient)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                    <linearGradient id="certifiedGradient" x1="3" y1="2" x2="21" y2="22">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        )
    }
};

// ======================
// SUBTLE BACKGROUND - NO BORDERS
// ======================
const SubtleBackground = () => (
    <div className="absolute inset-0 pointer-events-none">
        {/* Ultra-subtle grid */}
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: `
                    linear-gradient(to right, #2563eb 1px, transparent 1px),
                    linear-gradient(to bottom, #2563eb 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
            }}
            aria-hidden="true"
        />

        {/* Single soft orb */}
        <motion.div
            animate={{
                x: [0, 20, 0, -20, 0],
                y: [0, -15, 20, 15, 0],
                scale: [1, 1.1, 1, 1.05, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
            aria-hidden="true"
        />

        {/* Gradient fades */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/20 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-50/20 to-transparent" aria-hidden="true" />
    </div>
);

// ======================
// FEATURE CARD - CLEAN, NO BORDERS
// ======================
const FeatureCard = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group h-full"
            itemScope
            itemType="https://schema.org/Service"
        >
            {/* Clean white card - no border */}
            <div className={`
                relative bg-white rounded-2xl p-7 h-full
                transition-all duration-500
                ${isHovered
                    ? 'shadow-2xl shadow-blue-500/15'
                    : 'shadow-lg shadow-blue-500/5'
                }
            `}>
                {/* Icon with glow */}
                <div className="relative mb-5">
                    <motion.div
                        animate={isHovered ? {
                            scale: 1.1,
                            y: -2,
                        } : {
                            scale: 1,
                            y: 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 text-blue-600"
                    >
                        {feature.icon}
                    </motion.div>
                    <motion.div
                        className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
                        animate={isHovered ? { scale: 1.4, opacity: 0.5 } : { scale: 1, opacity: 0.2 }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                {/* Content */}
                <h3
                    className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300"
                    itemProp="name"
                >
                    {feature.title}
                </h3>

                <p
                    className="text-sm md:text-base text-slate-600 leading-relaxed"
                    itemProp="description"
                >
                    {feature.description}
                </p>

                {/* SEO metadata */}
                <meta itemProp="provider" content="A5 Roofing" />
                <meta itemProp="serviceType" content="Roofing Services" />
            </div>
        </motion.article>
    );
};

// ======================
// STATS COUNTER - WITH SCHEMA
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="text-center"
            itemScope
            itemType="https://schema.org/QuantitativeValue"
        >
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent">
                <span itemProp="value">{displayValue}</span>{suffix}
            </div>
            <div className="text-xs font-semibold tracking-wider text-slate-500 mt-1 uppercase" itemProp="unitText">
                {label}
            </div>
        </motion.div>
    );
};

// ======================
// CRYSTAL CTA BANNER - SINGLE, CLEAN
// ======================
const CrystalCTABanner = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-20 rounded-3xl overflow-hidden"
            itemScope
            itemType="https://schema.org/Offer"
        >
            {/* Clean blue gradient background - no extra border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800" />

            {/* Subtle crystal pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="white" strokeWidth="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                </svg>
            </div>

            {/* Single floating orb */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 30, 0, -30, 0],
                        y: [0, -20, 30, 20, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
                />
            </div>

            {/* Content */}
            <div className="relative px-8 py-14 md:px-16 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 z-30">
                <div className="max-w-2xl">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                        Ready to Start Your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                            Roofing Project?
                        </span>
                    </h3>

                    <p className="text-blue-100/90 text-base md:text-lg leading-relaxed">
                        Contact our team today for a free consultation and detailed estimate.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative px-8 py-4 bg-white text-blue-900 text-xs font-bold tracking-[0.2em] uppercase rounded-full overflow-hidden shadow-2xl"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Free Quote
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.a>

                    <motion.a
                        href="#portfolio"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-transparent border border-white/30 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-white/10 transition-all duration-500"
                    >
                        View Portfolio
                    </motion.a>
                </div>
            </div>

            {/* Simple corner accents - no extra borders */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-white/20" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-white/20" />
        </motion.div>
    );
};

// ======================
// MAIN WHY CHOOSE US SECTION - CLEAN, SINGLE CTA
// ======================
const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    const features = [
        {
            icon: <Icons.WhyChoose.Experience />,
            title: "25+ Years of Roofing Excellence",
            description: "Our master craftsmen bring decades of hands-on experience, having completed over 1,200 successful residential and commercial roofing projects."
        },
        {
            icon: <Icons.WhyChoose.Honest />,
            title: "Transparent, Honest Recommendations",
            description: "We never recommend unnecessary services. Our comprehensive inspections identify exactly what your roof needs."
        },
        {
            icon: <Icons.WhyChoose.Materials />,
            title: "Premium Architectural Materials",
            description: "We exclusively install top-tier roofing systems from GAF, CertainTeed, and Owens Corning."
        },
        {
            icon: <Icons.WhyChoose.Communication />,
            title: "White-Glove Communication",
            description: "From consultation to completion, you'll have direct access to your project manager and daily progress updates."
        },
        {
            icon: <Icons.WhyChoose.CustomerFirst />,
            title: "Unwavering Customer Commitment",
            description: "Your safety, comfort, and complete satisfaction are our highest priorities."
        },
        {
            icon: <Icons.WhyChoose.Certified />,
            title: "Certified & Insured Professionals",
            description: "Every installer is GAF Master Elite® certified, fully licensed, and insured."
        }
    ];

    const stats = [
        { value: "1200", label: "Projects", suffix: "+" },
        { value: "17", label: "Years", suffix: "+" },
        { value: "98", label: "Satisfaction", suffix: "%" },
        { value: "50", label: "Year Warranty", suffix: "" }
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!sectionRef.current || !isClient) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.reveal',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
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
            className="relative bg-white py-12 md:py-16 overflow-hidden"
            aria-label="Why Choose A5 Roofing"
            itemScope
            itemType="https://schema.org/Service"
        >
            <SubtleBackground />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20">

                {/* ====================== */}
                {/* SECTION HEADER */}
                {/* ====================== */}
                <header className="text-center max-w-3xl mx-auto mb-16 reveal">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-12 h-[2px] bg-gradient-to-r from-blue-400 to-blue-600" />
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-blue-700">
                            WHY CHOOSE US
                        </span>
                        <div className="w-12 h-[2px] bg-gradient-to-r from-blue-600 to-blue-400" />
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                        The Trusted Choice for<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">
                            Premium Roofing
                        </span>
                    </h1>

                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
                        Since 2007, A5 Roofing has delivered precision-crafted roofing systems to discerning
                        homeowners and commercial property owners.
                    </p>
                </header>


                {/* ====================== */}
                {/* FEATURES GRID - 6 CARDS */}
                {/* ====================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            feature={feature}
                            index={index}
                        />
                    ))}
                </div>

                {/* ====================== */}
                {/* SINGLE CTA BANNER - NO DUPLICATE */}
                {/* ====================== */}
                <CrystalCTABanner />

                {/* ====================== */}
                {/* SCHEMA.ORG */}
                {/* ====================== */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "RoofingContractor",
                        "name": "A5 Roofing",
                        "description": "Premium residential and commercial roofing services with 25+ years experience.",
                        "url": "https://a5roofing.com",
                        "priceRange": "$$$",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "347"
                        }
                    })
                }} />
            </div>


        </section>
    );
};

export default WhyChooseUs;