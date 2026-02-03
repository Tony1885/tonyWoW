export interface WowCharacter {
    name: string;
    race?: string;
    class?: string;
    active_spec_name?: string;
    active_spec_role?: string;
    gender?: string;
    faction?: string;
    achievement_points?: number;
    thumbnail_url?: string;
    region: string;
    realm: string;
    last_crawled_at?: string;
    profile_url?: string;
    gear?: {
        item_level_equipped: number;
        item_level_total: number;
    };
    mythic_plus_scores_by_season?: Array<{
        season: string;
        scores: {
            all: number;
            dps: number;
            healer: number;
            tank: number;
            spec_0?: number;
            spec_1?: number;
            spec_2?: number;
            spec_3?: number;
        };
    }>;
    mythic_plus_ranks?: {
        overall: { world: number; region: number; realm: number };
        class: { world: number; region: number; realm: number };
        tank?: { world: number; region: number; realm: number };
        healer?: { world: number; region: number; realm: number };
        dps?: { world: number; region: number; realm: number };
        class_tank?: { world: number; region: number; realm: number };
        class_healer?: { world: number; region: number; realm: number };
        class_dps?: { world: number; region: number; realm: number };
    };
}

/**
 * Fetches a character profile from Raider.io.
 * Extremely robust encoding for characters with accents.
 */
export async function getCharacterProfile(region: string, realm: string, name: string): Promise<WowCharacter | null> {
    try {
        const r = region.toLowerCase().trim();
        const rl = realm.toLowerCase().trim();

        // Clean and normalize name
        let n = name;
        try { n = decodeURIComponent(name); } catch { }
        n = n.normalize('NFC').trim();

        // For Raider.io API, names with accents can be tricky. 
        // We'll try both the normalized name and the raw encoded version if one fails.
        const namesToTry = [
            encodeURIComponent(n.toLowerCase()),
            encodeURIComponent(n) // case sensitive fallback
        ];

        for (const encodedName of namesToTry) {
            const fields = ["gear", "mythic_plus_scores_by_season:current", "mythic_plus_ranks"].join(",");
            const url = `https://raider.io/api/v1/characters/profile?region=${r}&realm=${rl}&name=${encodedName}&fields=${fields}`;

            const response = await fetch(url, {
                next: { revalidate: 60 }, // Reduce revalidate for testing
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'WoW-Dashboard-Agent/1.0'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.name) return data;
            }
        }

        console.warn(`Profile Fetch failed after tries for ${n}@${rl}`);
        return null;
    } catch (error) {
        console.error("Critical Profile Fetch Error:", error);
        return null;
    }
}
