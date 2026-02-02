import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import { Search, Plus, Swords, User, ShieldCheck, Compass } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  // Personnage principal par défaut
  const mainCharacter = await getCharacterProfile("eu", "ysondre", "moussman");

  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
        {/* Header UX Optimisé */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 glass-morphism flex items-center justify-center">
              <Compass className="w-8 h-8 text-white/40" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter leading-none mb-1">
                WOW <span className="text-white/20 italic">TRACKER</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Suivi de performance en temps réel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="RECHERCHER UN AVENTURIER..."
                className="bg-white/5 border border-white/10 px-12 py-3 rounded-full text-[10px] uppercase tracking-widest focus:outline-none focus:border-white/30 focus:w-[300px] transition-all w-[240px]"
              />
            </div>
            <button className="glass w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Personnages", value: "01", icon: User },
            { label: "Mythique+ Avg", value: mainCharacter ? Math.round(mainCharacter.mythic_plus_scores_by_season?.[0]?.scores.all || 0) : "0", icon: Swords },
            { label: "iLevel Max", value: mainCharacter?.gear?.item_level_equipped || "0", icon: ShieldCheck },
            { label: "Région", value: "EU-FR", icon: Compass },
          ].map((stat, i) => (
            <div key={i} className="glass border border-white/5 p-4 rounded-sm">
              <div className="flex items-center gap-3 text-white/20 mb-2">
                <stat.icon className="w-3 h-3" />
                <span className="text-[9px] uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainCharacter ? (
            <CharacterCard character={mainCharacter} />
          ) : (
            <div className="col-span-full py-20 text-center glass-morphism border-dashed border-white/10">
              <p className="text-white/40 uppercase tracking-widest text-sm">
                Aucun personnage trouvé. Lancez une recherche.
              </p>
            </div>
          )}

          <button className="border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center p-12 group hover:border-white/20 transition-colors">
            <Plus className="w-8 h-8 text-white/10 group-hover:text-white/40 transition-colors mb-4" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 group-hover:text-white/40">
              Ajouter un perso
            </span>
          </button>
        </div>

        {/* Status Indicators */}
        <footer className="mt-32 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-6">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-[9px] uppercase tracking-widest text-white/40">Raider.io API Online</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-[9px] uppercase tracking-widest text-white/40">Warcraft Logs Pending</span>
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/10">
            Design & Engine by Antigravity v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
