import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serviceDetail from "@/assets/fairservice.png";
import {
  Wrench,
  Home,
  Building2,
  Sun,
  CloudRain,
  Shield,
  TreePine,
  Droplets,
  Hammer,
  Square,
  Award,
  Star,
  Clock,
  Calendar,
  ArrowRight
} from "lucide-react";
import completeData from "../src/data/completeData.json";

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const duration = 2000;
    const startValue = 0;
    const endValue = value;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * eased);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
};

const iconMap = {
  Wrench: Wrench,
  Home: Home,
  Building2: Building2,
  Sun: Sun,
  CloudRain: CloudRain,
  Shield: Shield,
  TreePine: TreePine,
  Droplets: Droplets,
  Hammer: Hammer,
  Square: Square
};

const CompactServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-xl border border-gray-200 hover:border-primary transition-all duration-500 overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 p-6"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-white pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-3xl" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="relative">
          <ServiceIcon className="w-8 h-8 text-primary" />
          {isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -inset-1 bg-primary/20 rounded-full blur-sm -z-10"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-lg font-bold text-gray-900">{service.title}</h4>
            <span className="text-[10px] font-mono tracking-wider text-primary bg-primary/5 px-2 py-1 rounded-full">
              {service.number}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{service.description}</p>
          <motion.div
            className="flex items-center gap-2 mt-3"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Learn more
            </span>
            <motion.span
              animate={isHovered ? { x: 3 } : { x: 0 }}
              className="text-primary"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Wrench;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 10 });
  const springY = useSpring(y, { stiffness: 100, damping: 10 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 0.4;
    const yPct = (mouseY / rect.height - 0.5) * 0.4;
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000
      }}
      className="relative h-[420px] bg-white rounded-2xl border border-gray-200 hover:border-primary transition-all duration-700 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-white pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered
            ? 'inset 0 0 0 2px rgba(195,5,5,0.15), inset 0 0 20px rgba(195,5,5,0.1)'
            : 'inset 0 0 0 0px rgba(195,5,5,0)'
        }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originX: 0 }}
      />

      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 0.6
              }}
              animate={{
                x: [`50%`, `${20 + (i * 25)}%`],
                y: [`50%`, `${10 + (i * 20)}%`],
                scale: [0, 1.5, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
          ))}
        </>
      )}

      <div className="relative h-full p-8 flex flex-col z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="relative">
            <ServiceIcon className="w-8 h-8 text-primary relative z-10" />
            <motion.div
              className="absolute -inset-2 bg-primary/10 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-mono tracking-wider text-primary bg-primary/5 px-3 py-1 rounded-full">
              {service.number}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-bold tracking-wider uppercase text-primary mt-2"
            >
              {service.tag}
            </motion.span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
          {service.title}
        </h3>

        <div className="flex-1">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
            {service.description}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className="space-y-1.5 mt-2"
          >
            {service.features?.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200"
          animate={isHovered ? { y: 0 } : { y: 5 }}
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">
            Explore service
          </span>
          <motion.div
            className="flex items-center gap-1"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            <ArrowRight className={`w-4 h-4 transition-colors ${isHovered ? 'text-primary' : 'text-gray-400'}`} />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 28,
    restDelta: 0.001
  });

  const clipPathLeftToRight = useTransform(
    smoothProgress,
    [0, 0.1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const imageScale = useTransform(smoothProgress, [0, 0.1], [1.15, 1]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.08], [0.5, 0.1]);

  const { badge, headline, description, stats, services, cta } = completeData.services;
  const featuredService = services[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.split-text',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
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

  if (!isClient) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-20 md:py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fee7e7_1px,transparent_1px),linear-gradient(to_bottom,#fee7e7_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24">
          <div className="lg:col-span-5 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col h-full"
            >
              <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 mb-6 w-fit">
                <Award className="w-4 w-4 text-primary" />
                <span className="text-primary uppercase tracking-wider text-xs font-semibold">
                  {badge}
                </span>
              </div>

              <div className="overflow-hidden mb-4">
                <h2 className="split-text text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  {headline.prefix}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                    {headline.highlight}
                  </span>
                  <span className="block text-gray-900 text-4xl md:text-5xl mt-2">{headline.suffix}</span>
                </h2>
              </div>

              <div className="overflow-hidden mt-2">
                {description.map((text, idx) => (
                  <p key={idx} className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
                ))}
              </div>

              <div className="flex items-center gap-8 mt-8 pt-6 border-t border-gray-200">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs font-semibold tracking-wider uppercase text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CompactServiceCard service={featuredService} />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative h-full flex items-center">
              <div className="relative w-full">
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/15"
                  style={{ clipPath: clipPathLeftToRight }}
                >
                  <div className="relative aspect-[4/5]">
                    <motion.img
                      src={serviceDetail}
                      alt="FairClaims Roofing & Construction"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ scale: imageScale }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent"
                      style={{ opacity: overlayOpacity }}
                    />

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-200"
                    >
                      <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        License #03-0999
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-0.5 bg-gradient-to-r from-primary to-primary/60" />
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Roofing & Construction Services
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(1).map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{cta.title}</h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            {cta.description}
          </p>
          <motion.a
            href={cta.buttonLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {cta.buttonText}
          </motion.a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          className="relative block w-full h-10 md:h-12"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#redGradient)"
            d="M0,24L60,26.7C120,29,240,34,360,34C480,34,600,29,720,26.7C840,24,960,24,1080,26.7C1200,29,1320,34,1380,36.7L1440,39L1440,60L1380,60C1320,60,1200,60,1080,60C960,60,840,60,720,60C600,60,480,60,360,60C240,60,120,60,60,60L0,60Z"
          />
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C30505" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#C30505" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#C30505" stopOpacity="0.04" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Services;