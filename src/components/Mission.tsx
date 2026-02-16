import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamImage from "@/assets/team-image.jpg";

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    tl.fromTo(sectionRef.current.querySelector(".mission-headline"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
      .fromTo(sectionRef.current.querySelectorAll(".mission-copy"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(sectionRef.current.querySelector(".mission-image"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out" }, "-=0.6");
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-deep">
      <div className="grid-editorial items-center">
        <div className="md:col-span-5 order-2 md:order-1">
          <div className="mission-image overflow-hidden aspect-[3/4] relative">
            <img src={teamImage} alt="Our team at work" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-primary/90 backdrop-blur-sm p-5 border border-foreground/10">
              <div className="grid grid-cols-3 gap-4">
                {[{ num: "1,200+", label: "Projects" }, { num: "17", label: "Years" }, { num: "100%", label: "Insured" }].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="block font-heading text-foreground text-lg font-medium">{stat.num}</span>
                    <span className="font-body text-muted-foreground text-[10px] uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
          <div className="accent-line mb-6 mission-copy" />
          <h2 className="heading-lg text-foreground mb-8 mission-headline">Built on<br />Principle.</h2>
          <div className="space-y-6">
            <p className="body-lg text-foreground/90 mission-copy">We believe a roof is not merely a covering — it is the structural crown of every building. Our mission is to elevate roofing from trade to discipline, from commodity to craft.</p>
            <p className="body-sm text-muted-foreground mission-copy">Founded by structural engineers and master craftsmen, Apex Roofing combines rigorous engineering methodology with artisanal attention to detail.</p>
            <p className="body-sm text-muted-foreground mission-copy italic border-l-2 border-foreground/30 pl-4">"We don't cut corners. We engineer them."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
