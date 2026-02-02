import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import {
    BarChart3,
    ExternalLink,
    Trophy,
    BookOpen,
    Layers,
    Search,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        region: string;
        realm: string;
        name: string;
    }>;
}

export default async function CharacterHubPage({ params }: PageProps) {
    const { region, realm, name } = await params;
    const character = await getCharacterProfile(region, realm, name);

    const categories = [
        {
            title: "Performance & Progress",
            icon: BarChart3,
            links: [
                {
                    name: "Raider.io",
                    desc: "Mythique+, Raid Progress & Gear",
                    url: `https://raider.io/characters/${region}/${realm}/${name}`,
                    icon: "https://raider.io/images/favicons/favicon-32x32.png",
                    color: "text-orange-400"
                },
                {
                    name: "Warcraft Logs",
                    desc: "Analyses détaillées des combats",
                    url: `https://fr.warcraftlogs.com/character/${region}/${realm}/${name}`,
                    icon: "https://www.warcraftlogs.com/favicon.ico",
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
                    icon: "https://simplearmory.com/favicon.ico",
                    color: "text-yellow-400"
                }
            ]
        }
    ];

    // Add Monk specific links if it's Moussman or a Monk
    if (character?.class.toLowerCase() === "monk") {
        categories.push({
            title: "Reference & Meta (Monk)",
            icon: BookOpen,
            links: [
                {
                    name: "Murlok.io - Brewmaster",
                    desc: "Top builds & talents Mythique+",
                    url: "https://murlok.io/monk/brewmaster/m+",
                    icon: "https://murlok.io/favicon.ico",
                    color: "text-green-500"
                },
                {
                    name: "Murlok.io - Mistweaver",
                    desc: "Top builds & talents Mythique+",
                    url: "https://murlok.io/monk/mistweaver/m+",
                    icon: "https://murlok.io/favicon.ico",
                    color: "text-teal-400"
                }
            ]
        });
    }

    return (
        <div className="relative min-h-screen">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 pt-16 pb-20 px-4 md:px-10 max-w-4xl mx-auto">
                {/* Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors mb-12 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Retour au menu
                </Link>

                {/* Header */}
                <header className="flex flex-col items-center text-center mb-16">
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-2 italic uppercase">
                        {name} <span className="text-white/20 not-italic">HUB</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
                        {realm} - {region.toUpperCase()} | {character?.active_spec_name} {character?.class}
                    </p>
                </header>

                {/* Character Card Centered */}
                <div className="flex justify-center mb-20 w-full">
                    {character ? (
                        <div className="w-full max-w-sm">
                            <CharacterCard character={character} />
                        </div>
                    ) : (
                        <div className="glass p-12 text-center text-white/20 uppercase text-[10px] tracking-[0.4em] w-full">
                            Chargement des données...
                        </div>
                    )}
                </div>

                {/* Categories Grid - Centered items */}
                <div className="space-y-16">
                    {categories.map((cat, i) => (
                        <div key={i} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <cat.icon className="w-4 h-4 text-white/20" />
                                <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium">
                                    {cat.title}
                                </h2>
                                <div className="flex-1 h-[1px] bg-white/5" />
                            </div>

                            <div className="grid gap-3">
                                {cat.links.map((link, li) => (
                                    <a
                                        key={li}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative glass-morphism p-5 flex items-center justify-between border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-sm bg-white/5 p-1.5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                                <img src={link.icon} alt={link.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold tracking-tight mb-0.5 group-hover:text-white transition-colors uppercase">
                                                    {link.name}
                                                </h3>
                                                <p className="text-[10px] text-white/30 tracking-wider font-light uppercase">
                                                    {link.desc}
                                                </p>
                                            </div>
                                        </div>
                                        <ExternalLink className="w-3 h-3 text-white/10 group-hover:text-white/40 transition-all" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
