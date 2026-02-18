import { useRef, useEffect, useState } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import completeData from "../src/data/completeData.json";

gsap.registerPlugin(ScrollTrigger);

const Icons = {
    WhyChoose: {
        Experience: () => (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        Honest: () => (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
        Materials: () => (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 8h8v8H8V8z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
        Communication: () => (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
        Shield: () => (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v7c0 5.5 9 8 9 8s9-2.5 9-8V7l-9-5z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
        Certified: () => (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v7c0 5.5 9 8 9 8s9-2.5 9-8V7l-9-5z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        ArrowRight: () => (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        Sparkle: () => (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
            </svg>
        )
    }
};

const iconMap = {
    Experience: Icons.WhyChoose.Experience,
    Honest: Icons.WhyChoose.Honest,
    Materials: Icons.WhyChoose.Materials,
    Communication: Icons.WhyChoose.Communication,
    Shield: Icons.WhyChoose.Shield,
    Certified: Icons.WhyChoose.Certified
};

const CinematicBackground = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute top-20 left-20 w-[800px] h-[800px] rounded-full bg-[#C30505]/5 blur-[120px]"
                animate={{
                    x: [0, 100, 0, -50, 0],
                    y: [0, -50, 100, 50, 0],
                    scale: [1, 1.2, 0.8, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-[800px] h-[800px] rounded-full bg-[#C30505]/5 blur-[120px]"
                animate={{
                    x: [0, -100, 50, -30, 0],
                    y: [0, 50, -50, 30, 0],
                    scale: [1, 0.8, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #C30505 1px, transparent 1px),
                        linear-gradient(to bottom, #C30505 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30" />

            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-px h-px bg-[#C30505]/30"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

const FeatureCard = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "-100px" });

    const FeatureIcon = iconMap[feature.icon as keyof typeof iconMap] || Icons.WhyChoose.Experience;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });
    const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / rect.width - 0.5) * 0.4;
        const yPct = (mouseY / rect.height - 0.5) * 0.4;
        x.set(xPct);
        y.set(yPct);
        setMousePosition({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 2000,
            }}
            className="relative group h-full cursor-pointer"
        >
            <div className="relative h-full bg-white overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(195,5,5,0.03), transparent 60%)`,
                    }}
                />

                <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C30505] to-transparent"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{
                        x: isHovered ? '100%' : '-100%',
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C30505] to-transparent"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{
                        x: isHovered ? '-100%' : '100%',
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                />

                <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C30505]"
                    initial={{ height: 0, top: '50%' }}
                    animate={{
                        height: isHovered ? '100%' : 0,
                        top: isHovered ? 0 : '50%'
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                <motion.div
                    className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#C30505]/30"
                    initial={{ height: 0, top: '50%' }}
                    animate={{
                        height: isHovered ? '100%' : 0,
                        top: isHovered ? 0 : '50%'
                    }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                />

                <motion.div
                    className="absolute top-0 right-0 w-16 h-16"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                >
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#C30505]" />
                </motion.div>

                <motion.div
                    className="absolute bottom-0 left-0 w-16 h-16"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#C30505]" />
                </motion.div>

                {isHovered && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-[#C30505]/40"
                                initial={{
                                    x: mousePosition.x,
                                    y: mousePosition.y,
                                    scale: 0,
                                    opacity: 0.6
                                }}
                                animate={{
                                    x: mousePosition.x + (Math.random() - 0.5) * 150,
                                    y: mousePosition.y + (Math.random() - 0.5) * 150,
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 0.4, 0]
                                }}
                                transition={{
                                    duration: 1,
                                    delay: i * 0.15,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </>
                )}

                <div className="relative h-full p-8 flex flex-col z-10">
                    <div className="relative mb-6">
                        <div className="relative w-20 h-20">
                            <motion.div
                                className="absolute inset-0 border border-[#C30505]/20"
                                animate={{
                                    borderColor: isHovered ? '#C30505' : 'rgba(195,5,5,0.2)',
                                    scale: isHovered ? 1.05 : 1
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            <motion.div
                                className="absolute inset-2 border border-[#C30505]/10"
                                animate={{ rotate: isHovered ? 45 : 0 }}
                                transition={{ duration: 0.5 }}
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: isHovered ? 1.1 : 1,
                                        color: isHovered ? '#C30505' : '#C30505'
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[#C30505]"
                                >
                                    <FeatureIcon />
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            className="absolute -top-2 -right-2 text-[#C30505]"
                            animate={{
                                rotate: isHovered ? 360 : 0,
                                scale: isHovered ? 1.2 : 0.8,
                                opacity: isHovered ? 1 : 0.3
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icons.WhyChoose.Sparkle />
                        </motion.div>
                    </div>

                    <div className="mb-4">
                        <h3 className={`
                            text-xl md:text-2xl font-bold mb-3 transition-colors duration-300
                            ${isHovered ? 'text-[#C30505]' : 'text-gray-900'}
                        `}>
                            {feature.title}
                        </h3>

                        <motion.div
                            className="h-[2px] bg-gradient-to-r from-[#C30505] to-[#C30505]/30 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? '60px' : 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        />
                    </div>

                    <motion.p
                        className="text-sm md:text-base text-gray-600 leading-relaxed flex-1"
                        animate={{
                            color: isHovered ? '#374151' : '#4B5563'
                        }}
                    >
                        {feature.description}
                    </motion.p>

                    <motion.div
                        className="absolute bottom-4 right-4 text-7xl font-black text-gray-100 select-none"
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            color: isHovered ? 'rgba(195,5,5,0.1)' : 'rgba(0,0,0,0.05)'
                        }}
                    >
                        {(index + 1).toString().padStart(2, '0')}
                    </motion.div>

                    <motion.div
                        className="mt-6 flex items-center gap-3"
                        animate={{ x: isHovered ? 5 : 0 }}
                    >
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                            Explore
                        </span>
                        <motion.div
                            className="w-7 h-7 rounded-full bg-[#C30505]/10 flex items-center justify-center overflow-hidden"
                            animate={{
                                backgroundColor: isHovered ? '#C30505' : 'rgba(195,5,5,0.1)',
                                width: isHovered ? '28px' : '28px'
                            }}
                        >
                            <motion.div
                                animate={{ x: isHovered ? 3 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icons.WhyChoose.ArrowRight className={`w-3.5 h-3.5 ${isHovered ? 'text-white' : 'text-[#C30505]'}`} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{
                        boxShadow: isHovered
                            ? '20px 20px 40px -20px rgba(195,5,5,0.3), -20px -20px 40px -20px rgba(195,5,5,0.1)'
                            : '10px 10px 30px -15px rgba(0,0,0,0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.article>
    );
};

const StatCounter = ({ value, label, suffix = "", delay = 0 }) => {
    const ref = useRef(null);
    const [displayValue, setDisplayValue] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-center group cursor-pointer"
        >
            <div className="relative inline-block">
                <motion.div
                    className="text-4xl md:text-5xl font-black text-[#C30505] relative z-10"
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                        y: isHovered ? -2 : 0
                    }}
                >
                    <span>{displayValue}</span>{suffix}
                </motion.div>

                <motion.div
                    className="absolute inset-0 bg-[#C30505]/10 blur-xl"
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                />

                <motion.div
                    className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-[#C30505] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
            <div className="text-xs font-semibold tracking-wider text-gray-500 mt-2 uppercase">
                {label}
            </div>
        </motion.div>
    );
};

const AwardCTABanner = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { cta } = completeData.whyChooseUs;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-20 overflow-hidden"
        >
            <div className="relative bg-white border border-gray-200">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute -top-40 -right-40 w-80 h-80 bg-[#C30505]/5 rotate-12"
                        animate={{ rotate: [12, 15, 12] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C30505]/5 -rotate-12"
                        animate={{ rotate: [-12, -15, -12] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </div>

                <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C30505] to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C30505] to-transparent"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C30505]/30" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C30505]/30" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C30505]/30" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C30505]/30" />

                <div className="relative px-8 py-16 md:px-20 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10 z-30">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="w-8 h-[2px] bg-[#C30505]" />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C30505]">
                                {cta.badge}
                            </span>
                        </motion.div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                            dangerouslySetInnerHTML={{ __html: cta.title }}
                        />

                        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
                            {cta.description}
                        </p>

                        <div className="flex items-center gap-6 mt-6">
                            {cta.trustBadges.map((badge, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#C30505] rounded-full" />
                                    <span className="text-xs text-gray-500">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {cta.buttons.map((button, idx) => (
                            button.primary ? (
                                <motion.a
                                    key={idx}
                                    href={button.href}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="group relative px-10 py-5 bg-[#C30505] text-white text-sm font-bold tracking-[0.2em] uppercase overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        {button.text}
                                        <motion.div
                                            animate={{ x: isHovered ? 5 : 0 }}
                                        >
                                            <Icons.WhyChoose.ArrowRight />
                                        </motion.div>
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-black"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </motion.a>
                            ) : (
                                <motion.a
                                    key={idx}
                                    href={button.href}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative px-10 py-5 bg-transparent text-gray-700 text-sm font-bold tracking-[0.2em] uppercase overflow-hidden border border-gray-300 hover:border-[#C30505] transition-colors duration-500"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        {button.text}
                                        <motion.div
                                            animate={{ x: isHovered ? 5 : 0 }}
                                        >
                                            <Icons.WhyChoose.ArrowRight className="text-[#C30505]" />
                                        </motion.div>
                                    </span>
                                </motion.a>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    const { section, features, stats, cta } = completeData.whyChooseUs;

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!sectionRef.current || !isClient) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.reveal-text',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
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
            className="relative bg-white py-20 md:py-24 lg:py-32 overflow-hidden"
            aria-label="Why Choose Fair Claims Roofing Company"
        >
            <CinematicBackground />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20">
                <header className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="reveal-text"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-[2px] bg-[#C30505]" />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C30505]">
                                {section.badge}
                            </span>
                            <div className="w-16 h-[2px] bg-[#C30505]" />
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                            dangerouslySetInnerHTML={{ __html: section.headline }}
                        />

                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            {section.description}
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            feature={feature}
                            index={index}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-24">
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={stat.label}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            delay={0.1 + (index * 0.1)}
                        />
                    ))}
                </div>

                <AwardCTABanner />
            </div>
        </section>
    );
};

export default WhyChooseUs;