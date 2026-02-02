"use client";

import { motion } from "framer-motion";
import { WowCharacter } from "@/lib/wow";
import { Sword, Shield, HeartPulse, ExternalLink, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
    character: WowCharacter;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case "dps": return <Sword className="w-4 h-4" />;
            case "tank": return <Shield className="w-4 h-4" />;
            case "healer": return <HeartPulse className="w-4 h-4" />;
            default: return <Activity className="w-4 h-4" />;
        }
    };

    const score = character.mythic_plus_scores_by_season?.[0]?.scores.all || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="glass-morphism overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500"
        >
            <div className="relative h-32 overflow-hidden bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* Placeholder for class-specific background or artwork */}
                <div className="absolute top-4 right-6 z-20">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 px-2 py-1 border border-white/10 rounded">
                        {character.region.toUpperCase()} - {character.realm}
                    </span>
                </div>
            </div>

            <div className="relative z-20 px-6 -mt-10 pb-6">
                <div className="flex items-end gap-4 mb-4">
                    <div className="w-20 h-20 rounded-sm glass border border-white/10 overflow-hidden shrink-0">
                        <img
                            src={character.thumbnail_url}
                            alt={character.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="pb-1">
                        <h3 className="text-3xl font-bold tracking-tighter text-white group-hover:text-white transition-colors">
                            {character.name.toUpperCase()}
                        </h3>
                        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest">
                            <span>{character.active_spec_name}</span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>{character.class}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-sm bg-white/5 border border-white/5">
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Item Level</p>
                        <p className="text-2xl font-bold tracking-tight">
                            {character.gear?.item_level_equipped}
                            <span className="text-xs text-white/20 ml-1">/ {character.gear?.item_level_total}</span>
                        </p>
                    </div>
                    <div className="p-4 rounded-sm bg-white/5 border border-white/5">
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">M+ Score</p>
                        <p className={cn(
                            "text-2xl font-bold tracking-tight",
                            score > 2500 ? "text-orange-400" : score > 2000 ? "text-purple-400" : "text-blue-400"
                        )}>
                            {Math.round(score)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/60">
                        {getRoleIcon(character.active_spec_role)}
                        <span className="text-[10px] uppercase tracking-widest">{character.active_spec_role}</span>
                    </div>
                    <a
                        href={character.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors group/link"
                    >
                        Raider.io
                        <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
