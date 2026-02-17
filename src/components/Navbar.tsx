import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Menu, Quote, Star, Shield, Zap, Calendar, Building2, Home, Users, Briefcase, MessageSquare, Phone, FileText, CheckCircle, Wrench, ClipboardCheck, Clock } from "lucide-react";

// Import your logo
import logo from "../assets/FairClaimsLogo.png";
import logo2nd from "../assets/fairclaimlogo.jpeg";

// Icon component factories
const createIconComponent = (IconComponent: any) => () => (
  <IconComponent className="h-5 w-5 text-foreground" />
);

const createServiceIcon = (IconComponent: any) => ({ isHovered = false }: { isHovered?: boolean }) => (
  <IconComponent className={`h-5 w-5 ${isHovered ? 'text-white' : 'text-primary'} transition-colors duration-300`} />
);

const services = [
  {
    title: "ROOF REPAIRS",
    description: "Premium roofing solutions for modern homes",
    Icon: createServiceIcon(Home),
    items: ["Asphalt Shingles", "Metal Roofing", "Tile Roofing", "Flat Roof Systems", "Roof Replacement"],
    features: ["25-Year Warranty", "Energy Efficient", "Storm Resistant"]
  },
  {
    title: "ROOF REPLACEMENT",
    description: "When roofing systems get damaged or too old, they sometimes need to be completely replaced",
    Icon: createServiceIcon(Building2),
    items: ["EPDM Roofing", "TPO Systems", "PVC Membranes", "Built-Up Roofing", "Green Roofs"],
    features: ["30-Year Warranty", "Energy Star Rated", "Low Maintenance"]
  },
  {
    title: "ROOF MAINTENANCE",
    description: "Biannual and quarterly inspection and maintenance programs for residential and commercial roofing systems.",
    Icon: createServiceIcon(Wrench),
    items: ["Roof Inspections", "Emergency Repairs", "Gutter Systems", "Solar Integration", "Waterproofing"],
    features: ["24/7 Service", "Same-Day Quotes", "Free Inspections"]
  }
];

const companyLinks = [
  { label: "Home", href: "#", Icon: () => <Home className="h-4 w-4" /> },
  { label: "Portfolio", href: "#portfolio", Icon: () => <Briefcase className="h-4 w-4" /> },
  { label: "About", href: "#about", Icon: () => <Users className="h-4 w-4" /> },
  { label: "FAQ", href: "#faq", Icon: () => <MessageSquare className="h-4 w-4" /> },
  { label: "Contact", href: "#contact", Icon: () => <Phone className="h-4 w-4" /> }
];

const stats = [
  {
    value: "500+",
    label: "Projects",
    Icon: createIconComponent(ClipboardCheck)
  },
  {
    value: "98%",
    label: "Satisfaction",
    Icon: createIconComponent(Star)
  },
  {
    value: "24/7",
    label: "Service",
    Icon: createIconComponent(Clock)
  },
  {
    value: "10-Year",
    label: "Warranty",
    Icon: createIconComponent(Shield)
  }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringMegaMenu, setIsHoveringMegaMenu] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle services hover with proper timing
  const handleServicesMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu("services");
  };

  const handleServicesMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringMegaMenu) {
        setActiveMegaMenu(null);
      }
    }, 150);
  };

  const handleMegaMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHoveringMegaMenu(true);
    setActiveMegaMenu("services");
  };

  const handleMegaMenuMouseLeave = () => {
    setIsHoveringMegaMenu(false);
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredService(null);
    }, 150);
  };

  // Close all menus
  const handleLinkClick = () => {
    setActiveMegaMenu(null);
    setIsMenuOpen(false);
    setHoveredService(null);
  };

  // Click outside to close mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(event.target as Node)
      ) {
        setActiveMegaMenu(null);
        setHoveredService(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setActiveMegaMenu(null);
        setHoveredService(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-background/60 backdrop-blur-xl shadow-lg py-2 border-b border-foreground/10"
          : "bg-transparent py-4"
          }`}
      >

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex logooo items-center space-x-3 group"
              onClick={handleLinkClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-20 w-48 rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-full w-full object-contain p-1"
                />
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Services with Mega Menu */}
              <div className="relative">
                <motion.button
                  ref={servicesButtonRef}
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                  className="flex items-center space-x-2 px-5 py-2.5 text-foreground hover:text-primary/80 transition-all duration-300 font-semibold rounded-xl relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <Wrench className="h-4 w-4 text-foreground group-hover:text-primary/80 transition-colors" />
                    <span className="text-foreground group-hover:text-primary/80 transition-colors">Services</span>
                  </span>
                  <motion.span
                    animate={{ rotate: activeMegaMenu === "services" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4 ml-1 text-foreground group-hover:text-primary/80 transition-colors" />
                  </motion.span>

                  {/* Underline animation */}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary/80 group-hover:w-4/5 transition-all duration-500" />
                </motion.button>

                {/* Mega Menu - LIGHT THEME */}
                <AnimatePresence>
                  {activeMegaMenu === "services" && (
                    <motion.div
                      ref={megaMenuRef}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      onMouseEnter={handleMegaMenuMouseEnter}
                      onMouseLeave={handleMegaMenuMouseLeave}
                      className="absolute left-1/2 transform -translate-x-1/2 xl:left-0 xl:transform-none top-full mt-2 w-[90vw] max-w-[900px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 overflow-hidden"
                      style={{ zIndex: 1000 }}
                    >
                      {/* Services Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {services.map((service) => (
                          <motion.a
                            key={service.title}
                            href="#services"
                            onClick={handleLinkClick}
                            onMouseEnter={() => {
                              setHoveredService(service.title);
                              setIsHoveringMegaMenu(true);
                            }}
                            onMouseLeave={() => {
                              setHoveredService(null);
                            }}
                            className="group block p-5 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-white"
                            whileHover={{ y: -3 }}
                          >
                            <div className="flex items-start space-x-3 mb-4">
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${hoveredService === service.title ? 'bg-primary' : 'bg-primary/10 group-hover:bg-primary'
                                }`}>
                                <service.Icon isHovered={hoveredService === service.title} />
                              </div>
                              <div>
                                <h3 className={`font-bold text-base mb-1 transition-colors ${hoveredService === service.title ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
                                  }`}>
                                  {service.title}
                                </h3>
                                <p className="text-gray-500 text-xs">{service.description}</p>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              {service.items.map((item) => (
                                <div key={item} className="flex items-center text-sm transition-colors">
                                  <ChevronDown className={`h-3 w-3 mr-2 rotate-90 flex-shrink-0 transition-colors ${hoveredService === service.title ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                                    }`} />
                                  <span className={`truncate transition-colors ${hoveredService === service.title ? 'text-primary' : 'text-gray-700 group-hover:text-primary'
                                    }`}>
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {service.features.map((feature) => (
                                <span key={feature} className={`px-2 py-1 text-xs rounded-full border transition-colors ${hoveredService === service.title
                                  ? 'bg-primary/10 text-primary border-primary/20'
                                  : 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20'
                                  }`}>
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </motion.a>
                        ))}
                      </div>

                      {/* CTA Section */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-primary to-primary/80 rounded-xl p-5">
                          <div className="flex items-center space-x-3 mb-4 md:mb-0">
                            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
                              <Quote className="h-5 w-5 text-primary" />
                            </div>
                            <div className="text-white">
                              <h4 className="font-bold text-base">Get Your Free Quote</h4>
                              <p className="text-white/80 text-sm">Detailed estimate within 24 hours</p>
                            </div>
                          </div>
                          <motion.a
                            href="#quote"
                            onClick={handleLinkClick}
                            className="bg-white text-primary px-5 py-2.5 rounded-lg font-semibold hover:shadow-xl hover:bg-white/90 transition-all duration-300 inline-flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FileText className="h-4 w-4" />
                            <span>Get Quote</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Links - White Text */}
              <div className="flex items-center space-x-1 ml-2">
                {companyLinks.slice(1).map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={handleLinkClick}
                    onMouseEnter={() => setActiveMegaMenu(null)}
                    className="flex items-center space-x-2 px-4 py-2.5 text-foreground hover:text-primary/80 transition-all duration-300 font-semibold rounded-xl relative group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-foreground group-hover:text-primary/80 transition-colors">
                      <link.Icon />
                    </div>
                    <span className="text-foreground group-hover:text-primary/80 transition-colors">{link.label}</span>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary/80 group-hover:w-3/4 transition-all duration-500" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Primary CTA Button - CHANGES BASED ON SCROLL STATE */}
            <motion.div
              className="hidden lg:flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#contact"
                onClick={handleLinkClick}
                onMouseEnter={() => setActiveMegaMenu(null)}
                className={`
                  group relative px-7 py-3.5 rounded-xl font-semibold 
                  transition-all duration-300 border
                  ${scrolled
                    ? 'bg-primary text-foreground border-primary/20 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
                    : 'bg-white text-primary border-white/20 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20'
                  }
                `}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Calendar className={`h-4 w-4 ${scrolled ? 'text-foreground' : 'text-primary'}`} />
                  <span>Get Free Quote</span>
                </span>
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 lg:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-6 w-6 text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-6 w-6 text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - LIGHT BACKGROUND */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar - White background */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 lg:hidden shadow-2xl border-l border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header with Logo */}
                <div className="p-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-36 rounded-xl flex items-center justify-center overflow-hidden">
                        <img
                          src={logo2nd}
                          alt="Company Logo"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5 text-gray-900" />
                    </motion.button>
                  </div>
                </div>

                {/* Menu Content - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6 space-y-6">
                    {/* Services Section */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Our Services</h3>
                      <div className="space-y-3">
                        {services.map((service) => (
                          <motion.a
                            key={service.title}
                            href="#services"
                            onClick={() => setIsMenuOpen(false)}
                            className="block p-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <service.Icon isHovered={false} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-base">{service.title}</h4>
                                <p className="text-sm text-gray-600">{service.description}</p>
                              </div>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* Company Links */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                      <div className="space-y-2">
                        {companyLinks.map((link) => (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-gray-700">
                              <link.Icon />
                            </div>
                            <span className="font-semibold text-gray-900 text-base">{link.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA - Fixed at bottom */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="space-y-4">
                    <a
                      href="#quote"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl text-center hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
                    >
                      Get Free Quote Now
                    </a>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                      <Star className="h-3 w-3 text-primary" />
                      <span>Premium Service Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;