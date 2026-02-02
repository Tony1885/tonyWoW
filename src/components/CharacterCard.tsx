"use client";

import { motion } from "framer-motion";
import { WowCharacter } from "@/lib/wow";
import { Swords, Shield, HeartPulse, ExternalLink, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
    character: WowCharacter;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case "dps": return <Swords className="w-4 h-4" />;
            case "tank": return <Shield className="w-4 h-4" />;
            case "healer": return <HeartPulse className="w-4 h-4" />;
            default: return <Activity className="w-4 h-4" />;
        }
    };

    const score = character.mythic_plus_scores_by_season?.[0]?.scores.all || 0;
    const isAlliance = character.faction?.toLowerCase() === "alliance";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full relative glass-morphism overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-700 rounded-sm"
        >
            {/* Class/Faction Background Decor */}
            <div className={cn(
                "absolute top-0 left-0 w-full h-1 opacity-40",
                isAlliance ? "bg-blue-600" : "bg-red-600"
            )} />

            <div className="p-8">
                {/* Header: Centered */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full glass border border-white/20 overflow-hidden">
                            <img
                                src={character.thumbnail_url}
                                alt={character.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
                            />
                        </div>
                        <div className={cn(
                            "absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center border border-white/20 shadow-lg",
                            isAlliance ? "bg-blue-900" : "bg-red-900"
                        )}>
                            {isAlliance ? <Shield className="w-3 h-3" /> : <Swords className="w-3 h-3" />}
                        </div>
                    </div>

                    <h3 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic leading-none">
                        {character.name}
                    </h3>

                    <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        <span>{character.active_spec_name}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>{character.class}</span>
                    </div>
                </div>

                {/* Stats Grid: Centered & Legible */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-5 rounded-sm bg-black/40 border border-white/5 text-center">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2 font-bold">Item Level</p>
                        <p className="text-3xl font-black tracking-tighter text-white">
                            {character.gear?.item_level_equipped}
                        </p>
                        <p className="text-[9px] text-white/10 uppercase tracking-widest mt-1">
                            Total: {character.gear?.item_level_total}
                        </p>
                    </div>
                    <div className="p-5 rounded-sm bg-black/40 border border-white/5 text-center">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2 font-bold">M+ Score</p>
                        <p className={cn(
                            "text-3xl font-black tracking-tighter",
                            score > 2500 ? "text-[#ff8000]" : score > 2000 ? "text-[#a335ee]" : "text-[#0070dd]"
                        )}>
                            {Math.round(score)}
                        </p>
                        <div className="flex items-center justify-center gap-1.5 text-[9px] text-white/20 uppercase tracking-widest mt-1">
                            {getRoleIcon(character.active_spec_role)}
                            {character.active_spec_role}
                        </div>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="flex justify-center">
                    <a
                        href={character.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all group/link px-6 py-3 border border-white/5 hover:border-white/10 rounded-full"
                    >
                        <span>Détails complets</span>
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                </div>
            </div>

            {/* Subtle Realm Tag */}
            <div className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.3em] text-white/20">
                {character.realm}
            </div>
        </motion.div>
    );
}
