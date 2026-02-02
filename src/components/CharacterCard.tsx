"use client";

import { motion } from "framer-motion";
import { WowCharacter } from "@/lib/wow";
import { Swords, Shield, HeartPulse, ExternalLink, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
    character: WowCharacter;
}

const CLASS_COLORS: Record<string, string> = {
    "monk": "#00FF96",
    "paladin": "#F58CBA",
    "death knight": "#C41E3A",
    "warrior": "#C79C6E",
    "hunter": "#ABD473",
    "rogue": "#FFF569",
    "priest": "#FFFFFF",
    "shaman": "#0070DE",
    "mage": "#3FC7EB",
    "warlock": "#8787ED",
    "druid": "#FF7D0A",
    "demon hunter": "#A330C9",
    "evoker": "#33937F",
};

export default function CharacterCard({ character }: CharacterCardProps) {
    if (!character) return null;

    const classKey = character.class?.toLowerCase() || "";
    const classColor = CLASS_COLORS[classKey] || "#ffffff";
    const isAlliance = character.faction?.toLowerCase() === "alliance";
    const factionColor = isAlliance ? "#0068FF" : "#8C1616";

    const getRoleIcon = (role?: string) => {
        if (!role) return <Activity className="w-4 h-4" />;
        switch (role.toLowerCase()) {
            case "dps": return <Swords className="w-4 h-4" />;
            case "tank": return <Shield className="w-4 h-4" />;
            case "healer": return <HeartPulse className="w-4 h-4" />;
            default: return <Activity className="w-4 h-4" />;
        }
    };

    const score = character.mythic_plus_scores_by_season?.[0]?.scores.all || 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full relative glass-morphism overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-700 rounded-lg group shadow-2xl"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-20"
                    style={{ backgroundColor: classColor }}
                />
                <div
                    className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] opacity-20"
                    style={{ backgroundColor: factionColor }}
                />
            </div>

            <div className="p-10 relative z-10">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="relative mb-6">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-b from-white/10 to-transparent p-1">
                            <div className="w-full h-full rounded-full glass border border-white/20 overflow-hidden relative">
                                {character.thumbnail_url ? (
                                    <img
                                        src={character.thumbnail_url}
                                        alt={character.name}
                                        className="w-full h-full object-cover transition-all duration-700 scale-125 translate-y-2"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        <Activity className="w-8 h-8 text-white/10" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border border-white/20 shadow-xl" style={{ backgroundColor: factionColor }}>
                            {isAlliance ? <Shield className="w-4 h-4 text-white" /> : <Swords className="w-4 h-4 text-white" />}
                        </div>
                    </div>

                    <h3 className="text-5xl font-black tracking-tighter text-white mb-2 uppercase italic leading-none">
                        {character.name || "Aventurier"}
                    </h3>

                    <div
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[11px] uppercase tracking-[0.3em] font-black"
                        style={{ color: classColor }}
                    >
                        <span>{character.active_spec_name || "???"}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        <span>{character.class || "Classe inconnue"}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-6 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-center shadow-inner">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2 font-bold">iLevel</p>
                        <p className="text-4xl font-black tracking-tighter text-white">
                            {character.gear?.item_level_equipped || 0}
                        </p>
                        <div className="w-8 h-[1px] bg-white/10 mx-auto mt-2" />
                    </div>
                    <div className="p-6 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-center shadow-inner">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2 font-bold">M+ Rank</p>
                        <p className={cn(
                            "text-4xl font-black tracking-tighter",
                            score > 2500 ? "text-[#ff8000]" : score > 2000 ? "text-[#a335ee]" : "text-[#0070dd]"
                        )}>
                            {Math.round(score)}
                        </p>
                        <div
                            className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest mt-2 font-bold"
                            style={{ color: classColor }}
                        >
                            {getRoleIcon(character.active_spec_role)}
                            {character.active_spec_role || "Role"}
                        </div>
                    </div>
                </div>

                <a
                    href={character.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-4 py-4 bg-white/[0.03] hover:bg-white text-[11px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-black border border-white/10 rounded-sm transition-all duration-300"
                >
                    VOIR SUR RAIDER.IO
                    <ExternalLink className="w-3 h-3" />
                </a>
            </div>

            <div className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.5em] text-white/10 font-black">
                {character.realm}
            </div>
            <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.5em] text-white/5 font-black">
                {character.region?.toUpperCase()}
            </div>
        </motion.div>
    );
}
