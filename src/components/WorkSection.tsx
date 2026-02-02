"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        title: "Aura Intelligence",
        category: "Branding & Web",
        year: "2024",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    },
    {
        title: "Quantum Dynamics",
        category: "Product Design",
        year: "2023",
        image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1000",
    },
    {
        title: "Nebula Systems",
        category: "E-Commerce",
        year: "2024",
        image: "https://images.unsplash.com/photo-1614850523296-e8c0a003932f?auto=format&fit=crop&q=80&w=1000",
    },
];

export default function WorkSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".project-card", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-4 md:px-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-xl">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs uppercase tracking-[.3em] text-white/40 block mb-4"
                    >
                        Travaux Sélectionnés
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                        PROJETS <br /> <span className="text-white/20 italic">EMBLÉMATIQUES</span>
                    </h2>
                </div>
                <p className="text-white/40 text-sm uppercase tracking-widest leading-loose max-w-[200px]">
                    Une sélection rigoureuse de nos dernières créations digitales.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                {PROJECTS.map((project, index) => (
                    <div
                        key={index}
                        className={`project-card group cursor-pointer ${index % 2 !== 0 ? "md:translate-y-32" : ""}`}
                    >
                        <div className="relative aspect-[4/5] overflow-hidden glass rounded-sm mb-6">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute top-6 right-6 w-12 h-12 glass-morphism rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-medium tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">
                                    {project.title}
                                </h3>
                                <p className="text-white/40 text-sm uppercase tracking-widest font-light">
                                    {project.category}
                                </p>
                            </div>
                            <span className="text-xs font-mono text-white/20 py-1 px-2 border border-white/10 rounded">
                                {project.year}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
