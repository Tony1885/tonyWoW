import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import {
  BarChart3,
  ExternalLink,
  Trophy,
  BookOpen,
  Zap,
  Compass,
  Layers,
  Search,
  Plus
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const mainCharacter = await getCharacterProfile("eu", "ysondre", "moussman");

  const categories = [
    {
      title: "Performance & Progress",
      icon: BarChart3,
      links: [
        {
          name: "Raider.io",
          desc: "Mythique+, Raid Progress & Gear",
          url: "https://raider.io/characters/eu/ysondre/Moussman",
          color: "text-orange-400"
        },
        {
          name: "Warcraft Logs",
          desc: "Analyses détaillées des combats",
          url: "https://fr.warcraftlogs.com/character/eu/ysondre/moussman",
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
          url: "https://simplearmory.com/#/eu/ysondre/moussman/collectable/mounts",
          color: "text-yellow-400"
        }
      ]
    },
    {
      title: "Reference & Meta (Monk)",
      icon: BookOpen,
      links: [
        {
          name: "Murlok.io - Brewmaster",
          desc: "Top builds & talents Mythique+",
          url: "https://murlok.io/monk/brewmaster/m+",
          color: "text-green-500"
        },
        {
          name: "Murlok.io - Mistweaver",
          desc: "Top builds & talents Mythique+",
          url: "https://murlok.io/monk/mistweaver/m+",
          color: "text-teal-400"
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4 md:px-10 max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-16">
          <div className="w-20 h-20 glass-morphism rounded-full flex items-center justify-center mb-6">
            <Compass className="w-10 h-10 text-white/40" />
          </div>
          <h1 className="text-5xl font-bold tracking-tighter mb-2 italic">
            MOUSSMAN <span className="text-white/20 not-italic">HUB</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
            Ysondre - EU | Monk Master
          </p>
        </header>

        {/* Character Quick View */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-[1px] bg-white/20" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40">Statut Actuel</h2>
          </div>
          {mainCharacter ? (
            <div className="max-w-md mx-auto">
              <CharacterCard character={mainCharacter} />
            </div>
          ) : (
            <div className="glass p-8 text-center text-white/20 uppercase text-xs tracking-widest">
              Données de personnage indisponibles
            </div>
          )}
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categories.map((cat, i) => (
            <div key={i} className="space-y-6">
              <div className="flex items-center gap-4">
                <cat.icon className="w-4 h-4 text-white/20" />
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">
                  {cat.title}
                </h2>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>

              <div className="grid gap-4">
                {cat.links.map((link, li) => (
                  <a
                    key={li}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative glass-morphism p-6 flex items-center justify-between border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex items-center gap-6">
                      <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${link.color} group-hover:scale-110 transition-transform duration-500`}>
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:translate-x-1 transition-transform">
                          {link.name}
                        </h3>
                        <p className="text-xs text-white/40 tracking-wide font-light">
                          {link.desc}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-white/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-16 border-t border-white/5 text-center">
          <div className="flex justify-center gap-8 mb-8 opacity-40">
            <Search className="w-4 h-4 cursor-help" />
            <Plus className="w-4 h-4 cursor-help" />
            <Zap className="w-4 h-4 cursor-help" />
          </div>
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/10">
            Crafted for Moussman @ Ysondre-EU
          </p>
        </footer>
      </div>
    </div>
  );
}
