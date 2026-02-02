"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".char",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.05, delay: 0.5 }
    );

    tl.fromTo(
      ".fade-in",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
      "-=1"
    );
  }, []);

  const title = "PREMIUM AGENCY";

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <section className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-white/40"
        >
          <span className="w-12 h-[1px] bg-white/20" />
          <span>Established 2026</span>
          <span className="w-12 h-[1px] bg-white/20" />
        </motion.div>

        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 overflow-hidden flex flex-wrap justify-center leading-[0.9]"
        >
          {title.split("").map((char, i) => (
            <span key={i} className="char inline-block min-w-[0.2em]">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="fade-in max-w-lg mx-auto text-lg text-white/60 mb-12 font-light leading-relaxed">
          Nous créons des expériences numériques immersives à la pointe de la technologie et du design.
        </p>

        <div className="fade-in flex flex-wrap items-center justify-center gap-6">
          <button className="glass-morphism px-8 py-4 flex items-center gap-2 group hover:bg-white hover:text-black transition-all duration-500">
            Explorer nos projets
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          <button className="px-8 py-4 border border-white/10 rounded-full hover:border-white/40 transition-colors">
            Contactez-nous
          </button>
        </div>
      </section>

      {/* Social Links Fixed */}
      <div className="fixed bottom-10 left-10 hidden lg:flex flex-col gap-6 fade-in">
        <Github className="w-5 h-5 text-white/30 hover:text-white cursor-pointer transition-colors" />
        <Twitter className="w-5 h-5 text-white/30 hover:text-white cursor-pointer transition-colors" />
        <Linkedin className="w-5 h-5 text-white/30 hover:text-white cursor-pointer transition-colors" />
        <div className="w-[1px] h-20 bg-white/10 mx-auto" />
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-10 right-10 flex gap-12 text-[10px] uppercase tracking-widest text-white/20 fade-in">
        <div className="flex flex-col gap-1">
          <span className="text-white/40">Next.js 15</span>
          <span>Performance First</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/40">Tailwind v4</span>
          <span>Smooth Scrolling</span>
        </div>
      </div>

      <WorkSection />
    </div>
  );
}
