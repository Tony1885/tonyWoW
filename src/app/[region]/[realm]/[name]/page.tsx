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

const CHARACTER_RENDERS: Record<string, string> = {
    "moussman": "https://render.worldofwarcraft.com/eu/character/ysondre/204/182755532-main.jpg",
    "mamènne": "https://render.worldofwarcraft.com/eu/character/ysondre/141/182755469-main.jpg",
    "mamenne": "https://render.worldofwarcraft.com/eu/character/ysondre/141/182755469-main.jpg"
};

export default async function CharacterHubPage({ params }: PageProps) {
    try {
        const p = await params;
        const region = p.region.toLowerCase();
        const realm = p.realm.toLowerCase();
        const name = p.name.toLowerCase();
        const decodedName = decodeURIComponent(name).toLowerCase();

        const character = await getCharacterProfile(region, realm, name);
        const classKey = character?.class?.toLowerCase() || "";
        const classColor = CLASS_COLORS[classKey] || "#ffffff";
        const characterRender = CHARACTER_RENDERS[decodedName] || CHARACTER_RENDERS[name];

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
            <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden pt-12">
                {/* Dynamic Background Glow Overlay */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20 transition-colors duration-1000"
                        style={{ backgroundColor: classColor }}
                    />
                </div>

                {/* Character Skin Background Render (High Visibility Overlay) */}
                {characterRender && (
                    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
                        <img
                            src={characterRender}
                            alt=""
                            className="h-[120vh] w-auto object-contain scale-110 opacity-15 filter saturate-[1.5] brightness-125"
                        />
                    </div>
                )}

                <div className="relative z-10 w-full pt-4 pb-20 px-6 max-w-[1900px]">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.5em] text-white/50 hover:text-white transition-all mb-12 group ml-10 font-black"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        Retour au Menu
                    </Link>

                    {!character ? (
                        <div className="text-center py-32 glass border border-white/5 rounded-lg backdrop-blur-3xl max-w-2xl mx-auto mt-20">
                            <ShieldAlert className="w-16 h-16 text-white/20 mx-auto mb-8 animate-pulse" />
                            <h1 className="text-4xl font-black italic mb-4 uppercase text-white/80 tracking-tighter">Entité Introuvable</h1>
                            <p className="text-white/40 text-[11px] uppercase tracking-[0.5em] mb-12 leading-loose">Impossible de synchroniser le profil de {decodeURIComponent(name)} sur {realm}.</p>
                            <Link href="/" className="inline-block px-12 py-5 bg-white text-black text-[11px] font-black tracking-[0.4em] hover:bg-white/80 transition-all border border-white/20 shadow-xl">REESSAYER</Link>
                        </div>
                    ) : (
                        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1.2fr] gap-0 items-start">

                            {/* Left Column: Massive Side Skin */}
                            <div className="hidden lg:flex justify-start shrink-0 pointer-events-none sticky top-12 left-0 h-[80vh]">
                                <div className="relative w-full h-full flex flex-col justify-center">
                                    <img
                                        src={characterRender}
                                        alt={character.name}
                                        className="h-full w-auto object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.2)] filter saturate-[1.4] brightness-110 -translate-x-[15%]"
                                    />
                                    <div className="absolute bottom-20 left-10 w-64 h-16 bg-black/60 blur-[100px] rounded-full" />
                                </div>
                            </div>

                            {/* Center Column: Hub Content (PERFECTLY CENTERED) */}
                            <div className="flex flex-col items-center space-y-16 w-full py-10">
                                <header className="text-center space-y-4">
                                    <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-0 italic uppercase flex flex-col leading-none">
                                        <span className="text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">{character.name}</span>
                                        <span className="text-white/10 not-italic text-5xl tracking-[0.3em] -mt-2">COMMAND HUB</span>
                                    </h1>
                                    <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.6em] text-white/40 font-black">
                                        <span className="w-12 h-[1px] bg-white/10" />
                                        <span>{character.realm} // {character.region.toUpperCase()}</span>
                                        <span className="w-12 h-[1px] bg-white/10" />
                                    </div>
                                </header>

                                <div className="w-full shadow-[0_40px_100px_rgba(0,0,0,0.8)] max-w-lg border border-white/5 rounded-xl overflow-hidden">
                                    <CharacterCard character={character} />
                                </div>

                                {/* Compact Links: Vivid Icons Only */}
                                <div className="w-full space-y-16 pt-8 max-w-sm">
                                    {categories.map((cat, i) => (
                                        <div key={i} className="flex flex-col items-center space-y-8">
                                            <div className="flex items-center gap-6 w-full opacity-60">
                                                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                                <h2 className="text-[10px] uppercase tracking-[0.6em] text-white font-black whitespace-nowrap">
                                                    {cat.title}
                                                </h2>
                                                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                                            </div>

                                            <div className="flex flex-wrap justify-center gap-6">
                                                {cat.links.map((link, li) => (
                                                    <a
                                                        key={li}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title={link.name}
                                                        className="group relative glass-morphism p-6 flex items-center justify-center border border-white/10 hover:border-white/50 hover:bg-white/[0.05] hover:scale-125 active:scale-95 transition-all duration-500 backdrop-blur-2xl rounded-2xl shadow-2xl"
                                                    >
                                                        <div className="w-12 h-12 flex items-center justify-center">
                                                            <img
                                                                src={link.icon || `https://www.google.com/s2/favicons?domain=${link.domain}&sz=128`}
                                                                alt={link.name}
                                                                className={cn(
                                                                    "w-full h-full object-contain transition-all filter brightness-110",
                                                                    link.icon ? "rounded-md" : "saturate-150"
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap pointer-events-none font-bold">
                                                            {link.name}
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Raider.io Dungeons Widget - TIGHTENED & PUSHED RIGHT */}
                            <div className="w-full flex justify-end px-12 mt-20 lg:mt-0 lg:sticky lg:top-24">
                                <div className="w-full max-w-[320px] lg:mr-4">
                                    <div className="glass-morphism border border-white/20 rounded-lg overflow-hidden p-1 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                                        <div className="p-4 bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-[0.5em] text-white/50 font-black flex items-center justify-between">
                                            <span>MYTHIC+ LOGS</span>
                                            <BarChart3 className="w-4 h-4 text-white/20" />
                                        </div>
                                        <div className="relative w-full h-[520px] overflow-hidden">
                                            <iframe
                                                src={`https://raider.io/widgets/dungeons?numRuns=5&date=all&characterId=${decodedName === 'moussman' ? '288772995' : '0'}&type=character&includeEmptyDungeons=true&chromargb=transparent&season=season-tww-3`}
                                                style={{ border: 'none', width: '300px', height: '520px', marginLeft: '-5px' }}
                                                className="transition-all duration-700 filter brightness-110 pointer-events-auto"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-5 mt-6 glass border border-white/5 rounded-lg bg-black/40">
                                        <p className="text-[9px] uppercase tracking-[0.4em] leading-relaxed text-center font-black text-white/30 animate-pulse">
                                            RETRANSMISSION EN DIRECT
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    <footer className="mt-48 text-center opacity-10">
                        <p className="text-[9px] uppercase tracking-[1em] font-black">Protocol Azure-Sync-06 // Complete</p>
                    </footer>
                </div>
            </div>
        );
    } catch (err) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-10 bg-black">
                <div className="glass p-20 border border-white/10 rounded-3xl">
                    <h1 className="text-4xl font-black uppercase text-white/10 italic">Lien Perdu avec Azeroth</h1>
                    <Link href="/" className="mt-10 inline-block px-10 py-5 bg-white text-black text-[11px] tracking-[0.5em] font-black uppercase hover:bg-white/80 transition-all rounded-sm italic">Reconnecter</Link>
                </div>
            </div>
        );
    }
}
