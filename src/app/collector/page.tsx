"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Trophy,
    Ghost,
    ChevronLeft,
    Sparkles
} from "lucide-react";

const CHARACTERS = [
    {
        name: "Moussman",
        realm: "ysondre",
        region: "eu",
        color: "#00FF96",
        render: "https://render.worldofwarcraft.com/eu/character/ysondre/41/176557609-main-raw.png"
    },
    {
        name: "Mamènne",
        realm: "ysondre",
        region: "eu",
        color: "#A330C9",
        render: "https://render.worldofwarcraft.com/eu/character/ysondre/251/173840891-main-raw.png"
    }
];

export default function CollectorHub() {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const router = useRouter();
    const selected = CHARACTERS[selectedIdx];

    const handleOpenLink = useCallback((type: 'mounts' | 'achievements') => {
        const encodedName = encodeURIComponent(selected.name.normalize('NFC'));

        if (type === 'mounts') {
            window.open(`https://simplearmory.com/#/${selected.region}/${selected.realm}/${encodedName}/collectable/mounts`, '_blank');
        } else if (type === 'achievements') {
            window.open(`https://simplearmory.com/#/${selected.region}/${selected.realm}/${encodedName}/achievements`, '_blank');
        }
    }, [selected]);

    // RESTORE SCROLLING LOGIC
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

            {/* Background Cinematic (Restored but subtle) */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full"
                    >
                        <img
                            src={selected.render}
                            alt=""
                            className="w-full h-full object-cover grayscale brightness-50"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </div>

            {/* Header Content - Responsive adjustment */}
            <header className="relative z-20 w-full flex justify-between items-center py-8 md:py-12 px-6 md:px-12">
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => router.push('/')}
                        className="flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-all group scale-90 md:scale-100"
                    >
                        <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all" />
                        <span className="text-[8px] md:text-[9px] font-black tracking-[0.5em] uppercase">ROSTER</span>
                    </button>
                </div>

                {/* Mobile Roster Button */}
                <button
                    onClick={() => router.push('/')}
                    className="md:hidden flex items-center gap-2 opacity-40 hover:opacity-100 px-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-[8px] font-black tracking-widest uppercase">ROSTER</span>
                </button>

                {/* META LINK CENTERED */}
                <button
                    onClick={() => router.push('/meta')}
                    className="group flex flex-col items-center gap-1 text-[8px] md:text-[10px] font-black tracking-[0.4em] text-white/30 hover:text-white transition-all uppercase px-4"
                >
                    <span className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 md:w-4 md:h-4 opacity-50 group-hover:scale-125 transition-transform" />
                        META
                    </span>
                    <span className="hidden md:inline text-[7px] opacity-20 group-hover:opacity-40 tracking-[0.1em] lowercase">Tierlist</span>
                </button>

                <div className="flex flex-col items-end gap-1 text-[8px] md:text-[10px] font-black tracking-[0.4em] text-white transition-all uppercase">
                    <span className="flex items-center gap-2 text-white/80">
                        MODE COLLECTOR
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white/40" />
                    </span>
                    <span className="text-[6px] md:text-[7px] opacity-20 tracking-[0.1em] lowercase italic">Vaulting Azeroth</span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center gap-12 md:gap-20 px-6">

                {/* Character Context / Name Display */}
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-700">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected.name + "-name"}
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            className="flex flex-col items-center"
                        >
                            <h2
                                className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                style={{ color: selected.color }}
                            >
                                {selected.name}
                            </h2>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="w-12 h-[1px] bg-white/10" />
                                <span className="text-[10px] font-black tracking-[0.8em] text-white/20 uppercase">Azure // Identity</span>
                                <div className="w-12 h-[1px] bg-white/10" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Character Indicators (Dots) */}
                <div className="flex items-center gap-3 md:gap-4 bg-white/[0.02] border border-white/5 p-3 md:p-4 rounded-full backdrop-blur-3xl px-6">
                    {CHARACTERS.map((char, idx) => (
                        <button
                            key={char.name}
                            onClick={() => setSelectedIdx(idx)}
                            className={cn(
                                "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500 border border-white/10",
                                selectedIdx === idx ? "scale-150 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "opacity-20 hover:opacity-100"
                            )}
                            style={{ backgroundColor: selectedIdx === idx ? char.color : 'transparent' }}
                        />
                    ))}
                </div>

                {/* Grid Area - Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-4xl px-4 md:px-0">

                    <button
                        onClick={() => handleOpenLink('mounts')}
                        className="group relative flex flex-col items-center p-10 md:p-20 bg-white/[0.01] hover:bg-white hover:text-black border border-white/5 rounded-[2rem] md:rounded-[3rem] transition-all duration-700 overflow-hidden shadow-2xl backdrop-blur-3xl"
                    >
                        <Ghost className="w-12 h-12 md:w-20 md:h-20 mb-6 md:mb-10 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        <span className="text-[12px] md:text-[16px] font-black tracking-[0.6em] md:tracking-[0.8em] uppercase mb-4 text-center">CHASSE AUX MONTS</span>
                        <p className="text-[8px] md:text-[10px] text-center opacity-30 group-hover:opacity-60 font-medium tracking-widest uppercase">SIMPLE ARMORY • COLLECTABLES</p>

                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none"
                            style={{ backgroundColor: selected.color }}
                        />
                    </button>

                    <button
                        onClick={() => handleOpenLink('achievements')}
                        className="group relative flex flex-col items-center p-10 md:p-20 bg-white/[0.01] hover:bg-white hover:text-black border border-white/5 rounded-[2rem] md:rounded-[3rem] transition-all duration-700 overflow-hidden shadow-2xl backdrop-blur-3xl"
                    >
                        <Trophy className="w-12 h-12 md:w-20 md:h-20 mb-6 md:mb-10 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        <span className="text-[12px] md:text-[16px] font-black tracking-[0.6em] md:tracking-[0.8em] uppercase mb-4 text-center">HAUTS FAITS</span>
                        <p className="text-[8px] md:text-[10px] text-center opacity-30 group-hover:opacity-60 font-medium tracking-widest uppercase">SIMPLE ARMORY • PROGRESSION</p>

                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none"
                            style={{ backgroundColor: selected.color }}
                        />
                    </button>

                </div>

                {/* Hint for mobile scrolling */}
                <div className="flex flex-col items-center gap-4 opacity-10 mt-4 md:mt-10">
                    <p className="md:hidden text-[8px] tracking-[0.8em] uppercase font-black">Scroll Swipe pour changer</p>
                    <div className="flex items-center gap-6">
                        <div className="w-12 md:w-20 h-[1px] bg-white/20" />
                        <span className="text-[8px] md:text-[9px] font-black tracking-[1em] md:tracking-[2em] uppercase italic text-center px-4">Azure // Collector Stream</span>
                        <div className="w-12 md:w-20 h-[1px] bg-white/20" />
                    </div>
                </div>
            </main>

            <footer className="relative z-10 w-full flex justify-between items-center py-6 md:py-10 px-8 md:px-12 opacity-10 text-[6px] md:text-[8px] font-black tracking-[0.5em] uppercase">
                <span>Ysondre // EU Domain</span>
                <span className="hidden md:block text-white/40">Collector Hub v2.1 // Scroll Enabled</span>
                <span className="flex items-center gap-1 md:gap-2">
                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-green-500" />
                    ACTIVE_STREAM
                </span>
            </footer>

        </div>
    );
}
