"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Trophy,
    Zap,
    Shield,
    Heart,
    Sword,
    Flame
} from "lucide-react";

const TIER_DATA = [
    {
        tier: "S",
        color: "#ff4e50",
        roles: [
            {
                role: "Tanks",
                icon: Shield,
                specs: [
                    { name: "Vengeance DH", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_spectatortank.jpg" },
                    { name: "Guardian Druid", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_druid_maul.jpg" }
                ]
            },
            {
                role: "Healers",
                icon: Heart,
                specs: [
                    { name: "Resto Shaman", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_magicrevelation.jpg" },
                    { name: "Preservation Evoker", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_evoker_preservation.jpg" }
                ]
            },
            {
                role: "DPS",
                icon: Sword,
                specs: [
                    { name: "Frost DK", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_frostpresence.jpg" },
                    { name: "Arcane Mage", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_magicalsentry.jpg" },
                    { name: "Enhance Shaman", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightiningot.jpg" },
                    { name: "Assassination Rogue", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_deadlyprecision.jpg" }
                ]
            }
        ]
    },
    {
        tier: "A",
        color: "#ffbb33",
        roles: [
            {
                role: "Tanks",
                icon: Shield,
                specs: [
                    { name: "Blood DK", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_bloodpresence.jpg" },
                    { name: "Protection Paladin", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_paladin_shieldofthetemplar.jpg" }
                ]
            },
            {
                role: "Healers",
                icon: Heart,
                specs: [
                    { name: "Holy Paladin", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_holybolt.jpg" },
                    { name: "Mistweaver Monk", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_monk_mistweaver_spec.jpg" }
                ]
            },
            {
                role: "DPS",
                icon: Sword,
                specs: [
                    { name: "Windwalker Monk", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_monk_windwalker_spec.jpg" },
                    { name: "Shadow Priest", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_shadowwordpain.jpg" },
                    { name: "Havoc DH", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_specdmg.jpg" }
                ]
            }
        ]
    }
];

export default function MetaTierlistPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden flex flex-col items-center select-none">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="relative z-20 w-full flex justify-between items-center py-12 px-8 max-w-[1200px]">
                <button
                    onClick={() => router.push('/')}
                    className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/40 hover:text-white transition-all uppercase"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    ROSTER
                </button>

                <div className="flex flex-col items-center gap-2">
                    <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />
                    <h1 className="text-[12px] font-black tracking-[1em] text-white uppercase italic">META TIERLIST</h1>
                </div>

                <div className="hidden md:block w-32" />
            </header>

            {/* Main Content */}
            <main className="relative z-10 w-full max-w-5xl px-6 pb-20 space-y-16">

                {/* Intro */}
                <div className="text-center space-y-4">
                    <p className="text-white/30 text-[9px] uppercase font-black tracking-[1.5em] italic">Current Season // TWW S1 Analysis</p>
                    <p className="text-white/60 text-[11px] max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.2em] font-medium">
                        Based on high-level M+ keys and tournament data from Raider.io and WoWhead.
                    </p>
                </div>

                {/* Tier Grid */}
                <div className="space-y-12">
                    {TIER_DATA.map((tierEntry) => (
                        <motion.div
                            key={tierEntry.tier}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
                        >
                            {/* Tier Badge */}
                            <div
                                className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-5xl md:text-6xl font-black italic border-2 border-white/10 shadow-2xl"
                                style={{ backgroundColor: tierEntry.color, color: 'black' }}
                            >
                                {tierEntry.tier}
                            </div>

                            {/* Roles Section */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                {tierEntry.roles.map((roleSection) => (
                                    <div key={roleSection.role} className="space-y-6">
                                        <div className="flex items-center gap-3 opacity-40">
                                            <roleSection.icon className="w-4 h-4" />
                                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">{roleSection.role}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            {roleSection.specs.map((spec) => (
                                                <div
                                                    key={spec.name}
                                                    className="group relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border border-white/10 hover:border-white/40 transition-all cursor-help bg-zinc-900"
                                                    title={spec.name}
                                                >
                                                    <img
                                                        src={spec.icon}
                                                        alt={spec.name}
                                                        className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
                                                    />
                                                    {/* Tooltip hint on hover */}
                                                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center p-2 text-center transition-opacity">
                                                        <span className="text-[8px] font-black uppercase text-white leading-tight">{spec.name}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="flex flex-col items-center gap-8 pt-12">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="flex items-center gap-8 opacity-20">
                        <Flame className="w-4 h-4" />
                        <span className="text-[9px] font-black tracking-[1.5em] uppercase italic">Azure Output // Meta Tierlist Stream</span>
                        <Zap className="w-4 h-4" />
                    </div>
                </div>

            </main>

            {/* External Links */}
            <footer className="relative z-10 w-full flex flex-col md:flex-row justify-center items-center py-16 gap-8 md:gap-12 opacity-30">
                <a href="https://raider.io/mythic-plus-rankings/season-tww-1/all/world/leaderboards-strict" target="_blank" className="text-[9px] font-black tracking-widest hover:text-white transition-colors">RAIDER.IO RANKINGS</a>
                <a href="https://www.wowhead.com/guides/mythic-plus-dps-tier-list" target="_blank" className="text-[9px] font-black tracking-widest hover:text-white transition-colors">WOWHEAD GUIDES</a>
                <a href="https://icy-veins.com/wow/mythic-dps-tier-list" target="_blank" className="text-[9px] font-black tracking-widest hover:text-white transition-colors">ICY-VEINS DATA</a>
            </footer>

        </div>
    );
}
