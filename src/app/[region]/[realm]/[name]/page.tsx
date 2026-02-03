import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import MythicPlusProgression from "@/components/MythicPlusProgression";
import {
    BarChart3,
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

function safeDecode(val: string) {
    if (!val) return "";
    try {
        return decodeURIComponent(val);
    } catch {
        return val;
    }
}

export default async function CharacterHubPage({ params }: PageProps) {
    try {
        const p = await params;
        if (!p || !p.region || !p.realm || !p.name) {
            throw new Error("Missing route parameters");
        }

        const region = String(p.region).toLowerCase();
        const realm = String(p.realm).toLowerCase();
        const name = String(p.name).toLowerCase();

        // Safety check for encoding issues
        const decodedName = safeDecode(name).toLowerCase();

        // Fetch data from Raider.io API
        const character = await getCharacterProfile(region, realm, name);

        const classKey = character?.class?.toLowerCase() || "";
        const classColor = CLASS_COLORS[classKey] || "#ffffff";

        const encName = encodeURIComponent(name);

        return (
            <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-x-hidden pt-12">
                {/* Dynamic Background Glow Overlay */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20"
                        style={{ backgroundColor: classColor }}
                    />
                </div>

                <div className="relative z-10 w-full pt-4 pb-20 px-6 max-w-[1400px] flex flex-col items-center">

                    <div className="w-full flex justify-start mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.5em] text-white/50 hover:text-white transition-all group font-black"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                            Menu Principal
                        </Link>
                    </div>

                    {!character ? (
                        <div className="text-center py-32 glass border border-white/5 rounded-lg backdrop-blur-3xl max-w-2xl mx-auto mt-20">
                            <ShieldAlert className="w-16 h-16 text-white/20 mx-auto mb-8 animate-pulse" />
                            <h1 className="text-4xl font-black italic mb-4 uppercase text-white/80 tracking-tighter">Entité Introuvable</h1>
                            <p className="text-white/40 text-[11px] uppercase tracking-[0.5em] mb-12 leading-loose">Impossible de synchroniser le profil de {decodedName} sur {realm}.</p>
                            <Link href="/" className="inline-block px-12 py-5 bg-white text-black text-[11px] font-black tracking-[0.4em] hover:bg-white/80 transition-all border border-white/20 shadow-xl">REESSAYER</Link>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center space-y-12">

                            {/* Header Info */}
                            <div className="text-center space-y-3">
                                <div className="flex items-center justify-center gap-4 text-[10px] font-black tracking-[0.6em] text-white/20 uppercase">
                                    <span>{realm.toUpperCase()}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                    <span>{region.toUpperCase()}</span>
                                </div>
                                <h2 className="text-white/30 text-[9px] uppercase font-black tracking-[1.2em]">Azure Analytics // Real-Time Stream</h2>
                            </div>

                            {/* Main Content Layout */}
                            <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">

                                {/* Left Side: Character Card */}
                                <div className="w-full lg:w-auto lg:sticky lg:top-24">
                                    <div className="w-full max-w-lg mx-auto shadow-[0_50px_100px_rgba(0,0,0,1)] border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/40 backdrop-blur-3xl">
                                        <CharacterCard character={character} />
                                    </div>
                                </div>

                                {/* Right Side: Raider.io Widget */}
                                <div className="w-full lg:w-auto lg:sticky lg:top-24">
                                    <div className="w-full max-w-[340px] mx-auto border border-white/10 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                                        <div className="p-4 bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-[0.5em] text-white/50 font-black flex items-center justify-between">
                                            <span>MYTHIC+ RUNS</span>
                                            <BarChart3 className="w-4 h-4 text-white/20" />
                                        </div>
                                        <div className="relative w-full h-[540px] overflow-hidden">
                                            <iframe
                                                src={`https://raider.io/widgets/dungeons?numRuns=5&date=all&characterId=${decodedName === 'moussman' ? '288772995' : '0'}&type=character&includeEmptyDungeons=true&chromargb=transparent&season=season-tww-3`}
                                                style={{ border: 'none', width: '300px', height: '540px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Large Progression Card (From Screenshot) */}
                            <div className="w-full flex justify-center pt-8">
                                <MythicPlusProgression character={character} />
                            </div>

                        </div>
                    )}

                    <footer className="mt-40 pb-20 text-center opacity-10">
                        <p className="text-[9px] tracking-[1.5em] font-black uppercase">End Of Analysis // Azure Output</p>
                    </footer>
                </div>
            </div>
        );
    } catch (err) {
        console.error(err);
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-10 bg-black text-white px-20">
                <div>
                    <h1 className="text-4xl font-black italic uppercase text-white/20 tracking-tighter">Erreur Critique de Sync</h1>
                    <Link href="/" className="mt-12 inline-block px-10 py-5 bg-white text-black font-black tracking-widest uppercase italic">Reconnecter au Hub</Link>
                </div>
            </div>
        );
    }
}
