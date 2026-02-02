import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import {
    BarChart3,
    ExternalLink,
    Trophy,
    BookOpen,
    ChevronLeft,
    ShieldAlert
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

export default async function CharacterHubPage({ params }: PageProps) {
    try {
        const p = await params;
        const region = p.region.toLowerCase();
        const realm = p.realm.toLowerCase();
        const name = p.name.toLowerCase();

        const character = await getCharacterProfile(region, realm, name);
        const classKey = character?.class?.toLowerCase() || "";
        const classColor = CLASS_COLORS[classKey] || "#ffffff";

        const encName = encodeURIComponent(name);
        const encRealm = encodeURIComponent(realm);
        const encRegion = encodeURIComponent(region);

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
        }

        return (
            <div className="relative min-h-screen flex flex-col items-center">
                {/* Dynamic Background Glow Overlay */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-10 transition-colors duration-1000"
                        style={{ backgroundColor: classColor }}
                    />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] pt-12 pb-20 px-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all mb-12 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Retour à la sélection
                    </Link>

                    {!character ? (
                        <div className="text-center py-32 glass border border-white/5 rounded-sm backdrop-blur-sm max-w-2xl mx-auto">
                            <ShieldAlert className="w-12 h-12 text-white/10 mx-auto mb-6" />
                            <h1 className="text-3xl font-black italic mb-2 uppercase text-white/60">Azeroth ne répond pas</h1>
                            <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] mb-10">Impossible de trouver {decodeURIComponent(name)} @ {realm}</p>
                            <Link href="/" className="inline-block px-10 py-4 bg-white text-black text-[10px] font-black tracking-[0.3em] hover:bg-white/80 transition-all">REESSAYER</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row justify-center items-start gap-16">

                            {/* Central Hub: Narrower & Centered */}
                            <div className="w-full max-w-md lg:max-w-lg flex flex-col items-center space-y-12 shrink-0">
                                <header className="text-center">
                                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-2 italic uppercase flex flex-col leading-none">
                                        <span className="text-white">{character.name}</span>
                                        <span className="text-white/10 not-italic text-3xl tracking-[0.2em] -mt-1">HUB</span>
                                    </h1>
                                    <div className="mt-4 flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">
                                        <span>{character.realm}</span>
                                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                                        <span>{character.region.toUpperCase()}</span>
                                    </div>
                                </header>

                                <div className="w-full shadow-2xl shadow-black/80">
                                    <CharacterCard character={character} />
                                </div>

                                {/* Compact Links: Icons Only */}
                                <div className="w-full space-y-10 pt-4">
                                    {categories.map((cat, i) => (
                                        <div key={i} className="flex flex-col items-center space-y-4">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
                                                <h2 className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold">
                                                    {cat.title}
                                                </h2>
                                                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
                                            </div>

                                            <div className="flex flex-wrap justify-center gap-4">
                                                {cat.links.map((link, li) => (
                                                    <a
                                                        key={li}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title={link.name}
                                                        className="group relative glass-morphism p-4 flex items-center justify-center border border-white/5 hover:border-white/40 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm rounded-lg"
                                                    >
                                                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={link.icon || `https://www.google.com/s2/favicons?domain=${link.domain}&sz=128`}
                                                                alt={link.name}
                                                                className={cn(
                                                                    "w-full h-full object-contain transition-all",
                                                                    link.icon ? "rounded-sm" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                                                                )}
                                                            />
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Raider.io Dungeons Widget - Pushed far right */}
                            <div className="w-full max-w-sm lg:w-[380px] space-y-6 sticky top-12 lg:ml-auto">
                                <div className="glass border border-white/10 rounded-sm overflow-hidden p-1 backdrop-blur-md shadow-2xl">
                                    <div className="p-3 bg-white/5 border-b border-white/10 text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold mb-1 flex items-center justify-between">
                                        <span>Derniers Donjons</span>
                                        <BarChart3 className="w-3 h-3 opacity-30" />
                                    </div>
                                    <iframe
                                        src={`https://raider.io/widgets/dungeons?date=all&characterId=${name === 'moussman' ? '288772995' : '0'}&type=character&includeEmptyDungeons=true&chromargb=transparent&season=season-tww-3`}
                                        style={{ border: 'none', width: '100%', height: '560px' }}
                                        className="grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>

                                <div className="p-4 glass border border-white/5 rounded-sm opacity-20">
                                    <p className="text-[8px] uppercase tracking-[0.3em] leading-relaxed text-center font-bold">
                                        Synchronisation Azeroth Real-time
                                    </p>
                                </div>
                            </div>

                        </div>
                    )}

                    <footer className="mt-40 text-center opacity-10">
                        <p className="text-[8px] uppercase tracking-[0.8em]">Azeroth Hub Connection Established</p>
                    </footer>
                </div>
            </div>
        );
    } catch (err) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-10">
                <div>
                    <h1 className="text-2xl font-black uppercase text-white/20">Une erreur critique est survenue</h1>
                    <Link href="/" className="mt-6 inline-block text-[10px] tracking-widest text-white/60 hover:text-white italic underline">Retourner au menu</Link>
                </div>
            </div>
        );
    }
}
