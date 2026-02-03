"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    },
    {
        name: "Mamènne",
        realm: "ysondre",
        region: "eu",
        color: "#A330C9",
    }
];

export default function CollectorHub() {
    const [selectedIdx, setSelectedIdx] = useState(0);
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

    return (
        <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col select-none px-12">

            {/* Background Glows (Minimal) */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-10 transition-colors duration-1000"
                    style={{ backgroundColor: selected.color }}
                />
            </div>

            {/* Header Content */}
            <header className="relative z-20 w-full flex justify-between items-center py-12">
                {/* Spacer - Top Left (News is on Home) */}
                <div className="w-40" />

                {/* Return to Roster Center */}
                <button
                    onClick={() => router.push('/')}
                    className="flex flex-col items-center gap-2 opacity-20 hover:opacity-100 transition-all group"
                >
                    <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all" />
                    <span className="text-[9px] font-black tracking-[0.5em] uppercase">ROSTER</span>
                </button>

                {/* Mode Collector Label - Top Right */}
                <div className="flex flex-col items-end gap-1 text-[10px] font-black tracking-[0.4em] text-white transition-all uppercase">
                    <span className="flex items-center gap-2 text-white/80">
                        MODE COLLECTOR
                        <Sparkles className="w-4 h-4 text-white/40" />
                    </span>
                    <span className="text-[7px] opacity-20 tracking-[0.1em] lowercase italic">Vaulting Azeroth</span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center gap-20">

                {/* Character Selection (Very Minimal - No "Pseudo" displayed, just indicators) */}
                <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-full backdrop-blur-3xl px-6">
                    <span className="text-[8px] font-black tracking-[0.2em] text-white/20 uppercase mr-2 italic">IDENTITÉ :</span>
                    {CHARACTERS.map((char, idx) => (
                        <button
                            key={char.name}
                            onClick={() => setSelectedIdx(idx)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-500 border border-white/10",
                                selectedIdx === idx ? "scale-125 border-white/40" : "opacity-20 hover:opacity-100"
                            )}
                            style={{ backgroundColor: selectedIdx === idx ? char.color : 'transparent' }}
                            title={char.name}
                        />
                    ))}
                </div>

                {/* 2-Column Grid Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">

                    {/* Mount hunting */}
                    <button
                        onClick={() => handleOpenLink('mounts')}
                        className="group relative flex flex-col items-center p-20 bg-white/[0.01] hover:bg-white hover:text-black border border-white/5 rounded-[3rem] transition-all duration-700 overflow-hidden shadow-2xl backdrop-blur-3xl"
                    >
                        <Ghost className="w-20 h-20 mb-10 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        <span className="text-[16px] font-black tracking-[0.8em] uppercase mb-4">CHASSE AUX MONTS</span>
                        <p className="text-[10px] text-center opacity-30 group-hover:opacity-60 font-medium tracking-widest">SIMPLE ARMORY • COLLECTABLES</p>

                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none"
                            style={{ backgroundColor: selected.color }}
                        />
                    </button>

                    {/* Achievements */}
                    <button
                        onClick={() => handleOpenLink('achievements')}
                        className="group relative flex flex-col items-center p-20 bg-white/[0.01] hover:bg-white hover:text-black border border-white/5 rounded-[3rem] transition-all duration-700 overflow-hidden shadow-2xl backdrop-blur-3xl"
                    >
                        <Trophy className="w-20 h-20 mb-10 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        <span className="text-[16px] font-black tracking-[0.8em] uppercase mb-4">HAUTS FAITS</span>
                        <p className="text-[10px] text-center opacity-30 group-hover:opacity-60 font-medium tracking-widest">SIMPLE ARMORY • PROGRESSION</p>

                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none"
                            style={{ backgroundColor: selected.color }}
                        />
                    </button>

                </div>

                <div className="flex items-center gap-6 opacity-5 mt-10">
                    <div className="w-20 h-[1px] bg-white/20" />
                    <span className="text-[9px] font-black tracking-[2em] uppercase italic">Azure // Collector Stream</span>
                    <div className="w-20 h-[1px] bg-white/20" />
                </div>
            </main>

            {/* Footer Bottom Bar */}
            <footer className="relative z-10 w-full flex justify-between items-center py-10 opacity-10 text-[8px] font-black tracking-[0.5em] uppercase">
                <span>Ysondre // EU Domain</span>
                <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    COLLECTOR_HUB_ACTIVE
                </span>
            </footer>

        </div>
    );
}
