import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import { Search, Plus } from "lucide-react";

export default async function DashboardPage() {
    // Récupération initiale du personnage principal de l'utilisateur
    const mainCharacter = await getCharacterProfile("eu", "ysondre", "moussman");

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40 block mb-4">
                        World of Warcraft
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                        PROFIL <br /> <span className="text-white/20 italic">TRACKER</span>
                    </h1>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="RECHERCHER UN PERSO..."
                            className="bg-white/5 border border-white/10 px-12 py-4 rounded-sm text-xs uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all w-[240px]"
                        />
                    </div>
                    <button className="glass px-6 py-4 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mainCharacter ? (
                    <CharacterCard character={mainCharacter} />
                ) : (
                    <div className="col-span-full py-20 text-center glass-morphism">
                        <p className="text-white/40 uppercase tracking-widest text-sm">
                            Personnage "Moussman @ Ysondre" non trouvé ou API inaccessible.
                        </p>
                    </div>
                )}

                {/* Mock for other characters to show the grid */}
                <div className="border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center p-12 group hover:border-white/20 transition-colors cursor-pointer">
                    <Plus className="w-8 h-8 text-white/10 group-hover:text-white/40 transition-colors mb-4" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 group-hover:text-white/40 transition-colors">
                        Ajouter un personnage
                    </span>
                </div>
            </div>

            <div className="mt-32">
                <h2 className="text-2xl font-bold tracking-tighter mb-8 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-white/20" />
                    APIS CONNECTÉES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 glass border border-white/5">
                        <h3 className="text-sm font-bold mb-2">Raider.io</h3>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Utilisé pour les scores Mythic+ et l'équipement en temps réel. Pas d'authentification requise.
                        </p>
                    </div>
                    <div className="p-6 glass border border-white/5 opacity-40">
                        <h3 className="text-sm font-bold mb-2 text-white/60">Blizzard API</h3>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Données officielles, HF et statistiques détaillées. Nécessite des clés Client ID/Secret.
                        </p>
                    </div>
                    <div className="p-6 glass border border-white/5 opacity-40">
                        <h3 className="text-sm font-bold mb-2 text-white/60">Warcraft Logs</h3>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Analyses de combat et performances en raid. Nécessite une clé API v2.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
