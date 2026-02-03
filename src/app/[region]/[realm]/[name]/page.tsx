import { getCharacterProfile } from "@/lib/wow";
import CharacterCard from "@/components/CharacterCard";
import MythicPlusProgression from "@/components/MythicPlusProgression";
import {
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

        return (
            <div className="relative min-h-screen w-full flex flex-col items-center bg-[#0a0a0a] overflow-x-hidden pt-8">

                {/* Dynamic Background Glow Overlay */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div
                        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[200px] opacity-10"
                        style={{ backgroundColor: classColor }}
                    />
                </div>

                <div className="relative z-10 w-full pt-4 pb-32 px-6 max-w-[1200px] flex flex-col items-center">

                    {/* Top Bar */}
                    <div className="w-full flex justify-between items-center mb-16 opacity-60">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.6em] text-white/50 hover:text-white transition-all group font-black"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Roster
                        </Link>
                        <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">
                            <span>{realm.toUpperCase()}</span>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span>{region.toUpperCase()}</span>
                        </div>
                    </div>

                    {!character ? (
                        <div className="text-center py-32 glass border border-white/5 rounded-lg backdrop-blur-3xl max-w-2xl mx-auto mt-20">
                            <ShieldAlert className="w-16 h-16 text-white/20 mx-auto mb-8 animate-pulse" />
                            <h1 className="text-4xl font-black italic mb-4 uppercase text-white/80 tracking-tighter">Sync Failed</h1>
                            <p className="text-white/40 text-[11px] uppercase tracking-[0.5em] mb-12 leading-loose">The entity {decodedName} is not responding on {realm}.</p>
                            <Link href="/" className="inline-block px-12 py-5 bg-white text-black text-[11px] font-black tracking-[0.4em] hover:bg-white/80 transition-all border border-white/20 shadow-xl">RETRY INITIALIZATION</Link>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                            {/* Character Identity Overview */}
                            <div className="w-full max-w-lg shadow-[0_50px_100px_rgba(0,0,0,1)] border border-white/10 rounded-2xl overflow-hidden bg-[#151515] backdrop-blur-3xl">
                                <CharacterCard character={character} />
                            </div>

                            {/* Mythic+ Progression (Replaces the old widget) */}
                            <div className="w-full flex justify-center pt-4">
                                <MythicPlusProgression character={character} />
                            </div>

                        </div>
                    )}

                    <footer className="mt-64 pb-20 text-center opacity-10">
                        <p className="text-[10px] tracking-[2em] font-black uppercase">Azure Protocol // Terminal Output 03-B</p>
                    </footer>
                </div>
            </div>
        );
    } catch (err) {
        console.error(err);
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-10 bg-black text-white px-20">
                <div>
                    <h1 className="text-4xl font-black italic uppercase text-white/20 tracking-tighter">System Malfunction</h1>
                    <Link href="/" className="mt-12 inline-block px-10 py-5 bg-white text-black font-black tracking-widest uppercase italic border border-white/20">REBOOT SYSTEM</Link>
                </div>
            </div>
        );
    }
}
