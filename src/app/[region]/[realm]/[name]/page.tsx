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

interface PageProps {
    params: Promise<{
        region: string;
        realm: string;
        name: string;
    }>;
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
        const region = p.region;
        const realm = p.realm;
        const name = p.name;

        const character = await getCharacterProfile(region, realm, name);
        const classKey = character?.class?.toLowerCase() || "";
        const classColor = CLASS_COLORS[classKey] || "#ffffff";

        // Pre-calculate encoded strings for safe URL usage
        const encName = encodeURIComponent(name);
        const encRealm = encodeURIComponent(realm);
        const encRegion = encodeURIComponent(region);

        const categories = [
            {
                title: "Performance & Progress",
                icon: BarChart3,
                links: [
                    {
                        name: "Raider.io",
                        desc: "Mythique+, Raid Progress & Gear",
                        url: `https://raider.io/characters/${region}/${realm}/${encName}`,
                        domain: "raider.io",
                    },
                    {
                        name: "Armurerie Blizzard",
                        desc: "Profil officiel Battle.net",
                        url: `https://worldofwarcraft.blizzard.com/fr-fr/character/${region}/${realm}/${encName}`,
                        domain: "blizzard.com",
                    },
                    {
                        name: "Warcraft Logs",
                        desc: "Analyses détaillées des combats",
                        url: `https://fr.warcraftlogs.com/character/${region}/${realm}/${encName}`,
                        domain: "warcraftlogs.com",
                    }
                ]
            },
            {
                title: "Collections & Achievements",
                icon: Trophy,
                links: [
                    {
                        name: "SimpleArmory",
                        desc: "Visualisation des Montures & Mascottes",
                        url: `https://simplearmory.com/#/${region}/${realm}/${encName}/collectable/mounts`,
                        domain: "simplearmory.com",
                    }
                ]
            }
        ];

        if (classKey === "monk") {
            categories.push({
                title: "Reference & Meta (Monk)",
                icon: BookOpen,
                links: [
                    {
                        name: "Murlok.io - Brewmaster",
                        desc: "Top builds & talents Mythique+",
                        url: "https://murlok.io/monk/brewmaster/m+",
                        domain: "murlok.io",
                    },
                    {
                        name: "Murlok.io - Mistweaver",
                        desc: "Top builds & talents Mythique+",
                        url: "https://murlok.io/monk/mistweaver/m+",
                        domain: "murlok.io",
                    }
                ]
            });
        }

        return (
            <div className="relative min-h-screen flex flex-col items-center">
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-10 transition-colors duration-1000"
                        style={{ backgroundColor: classColor }}
                    />
                </div>

                <div className="relative z-10 w-full max-w-3xl pt-12 pb-20 px-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all mb-12 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Retour à la sélection
                    </Link>

                    {!character ? (
                        <div className="text-center py-32 glass border border-white/5 rounded-sm backdrop-blur-sm">
                            <ShieldAlert className="w-12 h-12 text-white/10 mx-auto mb-6" />
                            <h1 className="text-3xl font-black italic mb-2 uppercase text-white/60">Azeroth ne répond pas</h1>
                            <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] mb-10">Impossible de trouver {decodeURIComponent(name)} @ {realm}</p>
                            <Link href="/" className="inline-block px-10 py-4 bg-white text-black text-[10px] font-black tracking-[0.3em] hover:bg-white/80 transition-all">REESSAYER</Link>
                        </div>
                    ) : (
                        <>
                            <header className="text-center mb-16 flex flex-col items-center">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 italic uppercase flex flex-col leading-none">
                                    <span className="text-white">{character.name}</span>
                                    <span className="text-white/10 not-italic text-4xl tracking-[0.2em] -mt-1">HUB</span>
                                </h1>
                                <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/30">
                                    <span className="w-8 h-[1px] bg-white/10" />
                                    <span>{character.realm} • {character.region.toUpperCase()}</span>
                                    <span className="w-8 h-[1px] bg-white/10" />
                                </div>
                            </header>

                            <div className="flex justify-center mb-12">
                                <div className="w-full shadow-2xl shadow-black/80">
                                    <CharacterCard character={character} />
                                </div>
                            </div>

                            {/* Secure Iframe Embed */}
                            <div className="mb-20 glass border border-white/10 rounded-sm overflow-hidden p-1 backdrop-blur-md">
                                <div className="p-3 bg-white/5 border-b border-white/10 text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold mb-1">
                                    Progression Raid & Donjons
                                </div>
                                <iframe
                                    src={`https://raider.io/characters/${encRegion}/${encRealm}/${encName}?embed=1&embedmode=progress&showtime=10&chromargb=transparent`}
                                    style={{ border: 'none', width: '100%', height: '350px' }}
                                    className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                />
                            </div>

                            <div className="space-y-20">
                                {categories.map((cat, i) => (
                                    <div key={i} className="space-y-8">
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
                                            <div className="flex items-center gap-3">
                                                <cat.icon className="w-3 h-3 text-white/20" />
                                                <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">
                                                    {cat.title}
                                                </h2>
                                            </div>
                                            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
                                        </div>

                                        <div className="grid gap-4">
                                            {cat.links.map((link, li) => (
                                                <a
                                                    key={li}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative glass-morphism p-6 flex items-center justify-between border border-white/5 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 backdrop-blur-sm"
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 p-2.5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                                                            <img
                                                                src={`https://www.google.com/s2/favicons?domain=${link.domain}&sz=128`}
                                                                alt={link.name}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-black tracking-tight mb-1 group-hover:text-white transition-colors uppercase italic leading-none">
                                                                {link.name}
                                                            </h3>
                                                            <p className="text-[10px] text-white/20 tracking-[0.1em] uppercase font-medium">
                                                                {link.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ExternalLink className="w-3 h-3 text-white/40" />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
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
