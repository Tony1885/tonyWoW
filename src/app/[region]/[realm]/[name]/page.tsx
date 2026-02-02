import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import {
    BarChart3,
    ExternalLink,
    Trophy,
    BookOpen,
    Layers,
    ChevronLeft
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
    const { region, realm, name } = await params;
    const character = await getCharacterProfile(region, realm, name);
    const classKey = character?.class.toLowerCase() || "";
    const classColor = CLASS_COLORS[classKey] || "#ffffff";

    const categories = [
        {
            title: "Performance & Progress",
            icon: BarChart3,
            links: [
                {
                    name: "Raider.io",
                    desc: "Mythique+, Raid Progress & Gear",
                    url: `https://raider.io/characters/${region}/${realm}/${name}`,
                    domain: "raider.io",
                    color: "text-orange-400"
                },
                {
                    name: "Warcraft Logs",
                    desc: "Analyses détaillées des combats",
                    url: `https://fr.warcraftlogs.com/character/${region}/${realm}/${name}`,
                    domain: "warcraftlogs.com",
                    color: "text-blue-400"
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
                    url: `https://simplearmory.com/#/${region}/${realm}/${name}/collectable/mounts`,
                    domain: "simplearmory.com",
                    color: "text-yellow-400"
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
                    color: "text-green-500"
                },
                {
                    name: "Murlok.io - Mistweaver",
                    desc: "Top builds & talents Mythique+",
                    url: "https://murlok.io/monk/mistweaver/m+",
                    domain: "murlok.io",
                    color: "text-teal-400"
                }
            ]
        });
    }

    return (
        <div className="relative min-h-screen bg-[#050505] flex flex-col items-center">
            {/* Background Decor with Class Color */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20 transition-colors duration-1000"
                    style={{ backgroundColor: classColor }}
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 w-full max-w-3xl pt-12 pb-20 px-6">
                {/* Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all mb-12 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Retour à la sélection
                </Link>

                {/* Header - Strongly Centered */}
                <header className="text-center mb-16 flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 italic uppercase flex flex-col leading-none">
                        <span className="text-white">{name}</span>
                        <span className="text-white/10 not-italic text-4xl tracking-[0.2em] -mt-1">HUB</span>
                    </h1>
                    <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/30">
                        <span className="w-8 h-[1px] bg-white/10" />
                        <span>{realm} • {region.toUpperCase()}</span>
                        <span className="w-8 h-[1px] bg-white/10" />
                    </div>
                </header>

                {/* Character Card Boxed & Centered */}
                <div className="flex justify-center mb-24">
                    {character ? (
                        <div className="w-full shadow-2xl shadow-black/50">
                            <CharacterCard character={character} />
                        </div>
                    ) : (
                        <div className="glass p-20 text-center text-white/20 uppercase text-[10px] tracking-[0.4em] w-full border border-white/5">
                            Synchronisation avec Azeroth...
                        </div>
                    )}
                </div>

                {/* Links Section */}
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
                                        className="group relative glass-morphism p-6 flex items-center justify-between border border-white/5 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 p-2.5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${link.domain}&sz=128`}
                                                    alt={link.name}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/%3E%3Cpolyline points="15 3 21 3 21 9"/%3E%3Cline x1="10" y1="14" x2="21" y2="3"/%3E%3C/svg%3E';
                                                    }}
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

                {/* Footer */}
                <footer className="mt-40 text-center opacity-10">
                    <p className="text-[8px] uppercase tracking-[0.8em]">Azeroth Hub Connection Established</p>
                </footer>
            </div>
        </div>
    );
}
