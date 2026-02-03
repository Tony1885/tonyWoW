"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Compass,
    Trophy,
    Ghost,
    Target,
    Newspaper,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from "lucide-react";

const CHARACTERS = [
    {
        name: "Moussman",
        realm: "ysondre",
        region: "eu",
        level: 80,
        class: "Monk",
        race: "Pandaren",
        faction: "Horde",
        spec: "Maître Brasseur",
        color: "#00FF96",
        render: "https://render.worldofwarcraft.com/eu/character/ysondre/41/176557609-main-raw.png"
    },
    {
        name: "Mamènne",
        realm: "ysondre",
        region: "eu",
        level: 80,
        class: "Demon Hunter",
        race: "Elfe de la nuit",
        faction: "Alliance",
        spec: "Vengeance",
        color: "#A330C9",
        render: "https://render.worldofwarcraft.com/eu/character/ysondre/251/173840891-main-raw.png"
    }
];

export default function CollectorHub() {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const router = useRouter();
    const selected = CHARACTERS[selectedIdx];

    const handleOpenLink = useCallback((type: 'mounts' | 'achievements' | 'news') => {
        const encodedName = encodeURIComponent(selected.name.normalize('NFC'));

        if (type === 'mounts') {
            window.open(`https://simplearmory.com/#/${selected.region}/${selected.realm}/${encodedName}/collectable/mounts`, '_blank');
        } else if (type === 'achievements') {
            window.open(`https://simplearmory.com/#/${selected.region}/${selected.realm}/${encodedName}/achievements`, '_blank');
        } else if (type === 'news') {
            window.open(`https://www.wowhead.com/news`, '_blank');
        }
    }, [selected]);

    // Handle Wheel Scroll
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling) return;

            setIsScrolling(true);
            if (e.deltaY > 0) {
                setSelectedIdx((prev) => (prev + 1) % CHARACTERS.length);
            } else if (e.deltaY < 0) {
                setSelectedIdx((prev) => (prev - 1 + CHARACTERS.length) % CHARACTERS.length);
            }

            setTimeout(() => setIsScrolling(false), 500);
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [isScrolling]);

    return (
        <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col select-none">

            {/* Background Cinematic Render (Full Page) */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.name + "-bg-img"}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        animate={{ opacity: 0.5, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full relative"
                    >
                        <img
                            src={selected.render}
                            alt=""
                            className="w-full h-full object-contain md:object-cover saturate-[0.8] brightness-50"
                        />

                        {/* Vignette & Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Dynamic Color Overlay */}
                        <div
                            className="absolute inset-0 opacity-5 mix-blend-color transition-colors duration-1000"
                            style={{ backgroundColor: selected.color }}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* UI Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col">

                {/* Navigation Top Bar */}
                <div className="w-full flex justify-between items-center px-12 pt-12">
                    <button
                        onClick={() => router.push('/')}
                        className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/40 hover:text-white transition-all uppercase"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        SÉLECTION ROSTER
                    </button>

                    <div className="flex flex-col items-center gap-2">
                        <Compass className="w-6 h-6 text-white/20 animate-spin-slow" />
                        <span className="text-[10px] font-black tracking-[1em] text-white/20 uppercase">HUB COLLECTOR</span>
                    </div>

                    <button
                        onClick={() => router.push(`/${selected.region}/${selected.realm}/${encodeURIComponent(selected.name)}`)}
                        className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/40 hover:text-white transition-all uppercase"
                    >
                        HUB DE JEU
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Main Central Content */}
                <div className="flex-1 flex flex-col items-center justify-center gap-16 px-6">

                    {/* Character Info */}
                    <div className="flex flex-col items-center text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center"
                            >
                                <div
                                    className="w-24 h-1 rounded-full mb-8"
                                    style={{ backgroundColor: selected.color }}
                                />
                                <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-white uppercase drop-shadow-2xl">
                                    {selected.name}
                                </h1>
                                <p className="text-white/20 text-[11px] uppercase font-black tracking-[1.5em] mt-2">
                                    {selected.realm} // Azure Stream
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Collector Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

                        {/* Mount hunting */}
                        <button
                            onClick={() => handleOpenLink('mounts')}
                            className="group relative flex flex-col items-center p-12 bg-white/[0.02] hover:bg-white hover:text-black border border-white/5 rounded-[2.5rem] transition-all duration-700 overflow-hidden"
                        >
                            <Ghost className="w-12 h-12 mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                            <span className="text-[12px] font-black tracking-[0.5em] uppercase mb-4">CHASSE AUX MONTS</span>
                            <p className="text-[10px] text-center opacity-40 group-hover:opacity-60 font-medium">SimpleArmory Collection</p>

                            {/* Hover Glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none"
                                style={{ backgroundColor: selected.color }}
                            />
                        </button>

                        {/* Achievements */}
                        <button
                            onClick={() => handleOpenLink('achievements')}
                            className="group relative flex flex-col items-center p-12 bg-white/[0.02] hover:bg-white hover:text-black border border-white/5 rounded-[2.5rem] transition-all duration-700 overflow-hidden"
                        >
                            <Trophy className="w-12 h-12 mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                            <span className="text-[12px] font-black tracking-[0.5em] uppercase mb-4">HAUTS FAITS</span>
                            <p className="text-[10px] text-center opacity-40 group-hover:opacity-60 font-medium">Progression & Achievements</p>

                            {/* Hover Glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none"
                                style={{ backgroundColor: selected.color }}
                            />
                        </button>

                        {/* WoWhead News */}
                        <button
                            onClick={() => handleOpenLink('news')}
                            className="group relative flex flex-col items-center p-12 bg-white/[0.02] hover:bg-white hover:text-black border border-white/5 rounded-[2.5rem] transition-all duration-700 overflow-hidden"
                        >
                            <Newspaper className="w-12 h-12 mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                            <span className="text-[12px] font-black tracking-[0.5em] uppercase mb-4">NEWS WOWHEAD</span>
                            <p className="text-[10px] text-center opacity-40 group-hover:opacity-60 font-medium">Actualités World of Warcraft</p>

                            {/* Hover Glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none"
                                style={{ backgroundColor: selected.color }}
                            />
                        </button>

                    </div>

                    {/* Scroll Indication */}
                    <div className="flex items-center gap-6 opacity-10">
                        <div className="w-12 h-[1px] bg-white" />
                        <span className="text-[9px] font-black tracking-[1em] uppercase">SCROLLEZ POUR CHANGER DE PERSO</span>
                        <div className="w-12 h-[1px] bg-white" />
                    </div>

                </div>

                {/* Footer */}
                <div className="w-full flex justify-center py-12 opacity-5">
                    <span className="text-[9px] font-black tracking-[2em] uppercase">COLLECTOR PROTOCOL v1.0 // AZURE OUTPUT</span>
                </div>

            </div>

        </div>
    );
}
