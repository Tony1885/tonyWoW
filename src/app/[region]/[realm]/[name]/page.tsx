import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import {
    BarChart3,
    ChevronLeft,
    ShieldAlert,
    Trophy,
    BookOpen,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{
        region: string;
        realm: string;
        name: string;
    }>;
}

interface WowLink {
    name: string;
    url: string;
    domain?: string;
    icon?: string;
}

const CLASS_COLORS: Record<string, string> = {
    "monk": "#00FF96",
    "paladin": "#F58CBA",
    "warrior": "#C79C6E",
    "hunter": "#ABD473",
    "rogue": "#FFF569",
    "priest": "#FFFFFF",
    "death knight": "#C41E3A",
    "shaman": "#0070DE",
    "mage": "#3FC7EB",
    "warlock": "#8787ED",
    "druid": "#FF7D0A",
    "demon hunter": "#A330C9",
    "evoker": "#33937F",
};

// Character IDs for Raider.io Dynamic Widget
const CHARACTER_IDS: Record<string, string> = {
    "moussman": "288772995",
    "mamènne": "284898236",
    "mamenne": "284898236"
};

function safeDecode(val: string) {
    if (!val) return "";
    try {
        // Handle double encoding and normalize to NFC for consistency with Blizzard/RIO APIs
        return decodeURIComponent(val).normalize('NFC');
    } catch {
        return val.normalize('NFC');
    }
}

export default async function CharacterHubPage({ params }: PageProps) {
    try {
        const p = await params;
        if (!p) throw new Error("Missing route parameters");

        const region = String(p.region).toLowerCase();
        const realm = String(p.realm).toLowerCase();
        const nameParam = String(p.name);

        // Crucial: Normalize name before any logic
        const decodedName = safeDecode(nameParam);
        const lowerName = decodedName.toLowerCase();

        // Fetch character data with normalized name
        const character = await getCharacterProfile(region, realm, decodedName);

        const classKey = character?.class?.toLowerCase() || "";
        const classColor = CLASS_COLORS[classKey] || "#ffffff";
        const encName = encodeURIComponent(decodedName);

        const categories: { title: string; icon: any; links: WowLink[] }[] = [
            {
                title: "Performance",
                icon: BarChart3,
                links: [
                    {
                        name: "Raider.io",
                        url: `https://raider.io/characters/${region}/${realm}/${encName}`,
                        domain: "raider.io",
                    },
                    {
                        name: "Blizzard",
                        url: `https://worldofwarcraft.blizzard.com/fr-fr/character/${region}/${realm}/${encName}`,
                        domain: "blizzard.com",
                    },
                    {
                        name: "Logs",
                        url: `https://fr.warcraftlogs.com/character/${region}/${realm}/${encName}`,
                        domain: "warcraftlogs.com",
                    }
                ]
            },
            {
                title: "Collections",
                icon: Trophy,
                links: [
                    {
                        name: "SimpleArmory",
                        url: `https://simplearmory.com/#/${region}/${realm}/${encName}/collectable/mounts`,
                        domain: "simplearmory.com",
                    }
                ]
            }
        ];

        if (classKey === "monk") {
            categories.push({
                title: "Meta",
                icon: BookOpen,
                links: [
                    {
                        name: "Brewmaster",
                        url: "https://murlok.io/monk/brewmaster/m+",
                        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_monk_brewmaster_spec.jpg",
                    },
                    {
                        name: "Mistweaver",
                        url: "https://murlok.io/monk/mistweaver/m+",
                        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_monk_mistweaver_spec.jpg",
                    }
                ]
            });
        } else if (classKey === "demon hunter") {
            categories.push({
                title: "Meta",
                icon: BookOpen,
                links: [
                    {
                        name: "Vengeance",
                        url: "https://murlok.io/demon-hunter/vengeance/m+",
                        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_spectatortank.jpg",
                    },
                    {
                        name: "Havoc",
                        url: "https://murlok.io/demon-hunter/havoc/m+",
                        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_specdmg.jpg",
                    }
                ]
            });
        }

        const charId = CHARACTER_IDS[lowerName] || "0";

        return (
            <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-x-hidden pt-12">
                {/* Dynamic Background Glow Overlay */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20 transition-all duration-1000"
                        style={{ backgroundColor: classColor }}
                    />
                </div>

                <div className="relative z-10 w-full pt-4 pb-20 px-6 max-w-[1200px] flex flex-col items-center">

                    {/* Top Navigation Bar */}
                    <div className="w-full flex justify-between items-center mb-16 px-4">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.6em] text-white/30 hover:text-white transition-all font-black"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            ROSTER
                        </Link>

                        <Link
                            href="/collector"
                            className="group flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all font-black"
                        >
                            <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />
                            <span>COLLECTOR</span>
                        </Link>

                        <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.6em] text-white/20 uppercase">
                            <span>{realm.toUpperCase()}</span>
                        </div>
                    </div>

                    {!character ? (
                        <div className="text-center py-32 glass border border-white/5 rounded-3xl backdrop-blur-3xl max-w-2xl mx-auto mt-20 shadow-2xl">
                            <ShieldAlert className="w-16 h-16 text-white/20 mx-auto mb-8 animate-pulse" />
                            <h1 className="text-4xl font-black italic mb-4 uppercase text-white/80 tracking-tighter">Entité Introuvable</h1>
                            <p className="text-white/40 text-[11px] uppercase tracking-[0.5em] mb-12 leading-loose">Impossible de synchroniser {decodedName} sur {realm}.</p>
                            <Link href="/" className="inline-block px-12 py-5 bg-white text-black text-[11px] font-black tracking-[0.4em] hover:bg-white/80 transition-all border border-white/20 shadow-xl">REESSAYER</Link>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">

                            {/* Header Info */}
                            <div className="text-center space-y-2">
                                <h2 className="text-white/30 text-[9px] uppercase font-black tracking-[1.2em]">Azure Protocol // Gaming Hub</h2>
                            </div>

                            {/* Centered Character Card */}
                            <div className="w-full shadow-[0_50px_100px_rgba(0,0,0,1)] max-w-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 bg-zinc-900/40 backdrop-blur-3xl">
                                <CharacterCard character={character} />
                            </div>

                            {/* Performance & Links */}
                            <div className="w-full flex flex-col items-center space-y-12 pt-4">
                                {categories.map((cat, i) => (
                                    <div key={i} className="flex flex-col items-center space-y-8 w-full max-w-xl">
                                        <div className="flex items-center gap-6 w-full opacity-30">
                                            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white font-black whitespace-nowrap">
                                                {cat.title}
                                            </h2>
                                            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/40 to-transparent" />
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-10">
                                            {cat.links.map((link, li) => (
                                                <a
                                                    key={li}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative p-5 flex items-center justify-center border border-white/5 hover:border-white/20 hover:bg-white/[0.02] hover:scale-125 transition-all duration-500 rounded-2xl bg-white/[0.01]"
                                                >
                                                    <div className="w-12 h-12 flex items-center justify-center">
                                                        <img
                                                            src={link.icon || `https://www.google.com/s2/favicons?domain=${link.domain}&sz=128`}
                                                            alt={link.name}
                                                            className={cn(
                                                                "w-full h-full object-contain filter brightness-110 saturate-150 transition-all duration-500",
                                                                link.icon ? "rounded-md" : "opacity-80 group-hover:opacity-100 group-hover:scale-110"
                                                            )}
                                                        />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mythic+ Data Stream (Widget) */}
                            {charId !== "0" && (
                                <div className="w-full flex flex-col items-center pt-8">
                                    <div className="flex items-center gap-6 w-full max-w-xl opacity-20 mb-10">
                                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
                                        <h2 className="text-[10px] uppercase tracking-[0.5em] text-white font-black whitespace-nowrap">
                                            Mythic+ Performance Stream
                                        </h2>
                                        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white to-transparent" />
                                    </div>

                                    <div className="w-full max-w-[340px] border border-white/10 rounded-3xl overflow-hidden bg-black/60 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                                        <div className="p-4 bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-[0.5em] text-white/50 font-black flex items-center justify-between px-6">
                                            <span>LIVE ANALYSIS</span>
                                            <BarChart3 className="w-4 h-4 text-white/20" />
                                        </div>
                                        <div className="relative w-full h-[540px] overflow-hidden flex justify-center">
                                            <iframe
                                                src={`https://raider.io/widgets/dungeons?numRuns=5&date=all&characterId=${charId}&type=character&includeEmptyDungeons=true&chromargb=transparent&season=season-tww-3`}
                                                style={{ border: 'none', width: '300px', height: '540px' }}
                                                title="Mythic+ Progression Widget"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    <footer className="mt-40 pb-20 text-center opacity-10">
                        <p className="text-[9px] tracking-[1.5em] font-black uppercase">End Of Session // Gaming Hub closed</p>
                    </footer>
                </div>
            </div>
        );
    } catch (err) {
        console.error(err);
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-10 bg-black text-white px-20">
                <h1 className="text-4xl font-black italic uppercase text-white/20 tracking-tighter">Erreur de Système</h1>
                <Link href="/" className="mt-12 block text-[11px] font-black tracking-widest uppercase border border-white/20 px-10 py-5 hover:bg-white hover:text-black transition-all">Recharger</Link>
            </div>
        );
    }
}
