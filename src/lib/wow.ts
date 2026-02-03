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
 * Handles accent normalization and correct URI encoding.
 */
export async function getCharacterProfile(region: string, realm: string, name: string): Promise<WowCharacter | null> {
    try {
        // Normalize and clean inputs
        const r = region.toLowerCase().trim();
        const rl = realm.toLowerCase().trim();

        // Ensure name is decoded before re-encoding to avoid double encoding bug
        let n = name;
        try {
            n = decodeURIComponent(name);
        } catch {
            // ignore if already decoded
        }

        // Final normalization for character names (NFC is preferred by Blizzard/RIO)
        n = n.normalize('NFC').toLowerCase().trim();

        const encodedName = encodeURIComponent(n);
        const encodedRealm = encodeURIComponent(rl);
        const encodedRegion = encodeURIComponent(r);

        const fields = [
            "gear",
            "mythic_plus_scores_by_season:current",
            "mythic_plus_ranks"
        ].join(",");

        const url = `https://raider.io/api/v1/characters/profile?region=${encodedRegion}&realm=${encodedRealm}&name=${encodedName}&fields=${fields}`;

        const response = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 mins
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'WoW-Dashboard-Agent/1.0'
            }
        });

        if (!response.ok) {
            console.warn(`Profile Fetch Failure [${response.status}] for ${n}@${rl}`);
            return null;
        }

        const data = await response.json();
        return data && data.name ? data : null;
    } catch (error) {
        console.error("Critical Profile Fetch Error:", error);
        return null;
    }
}
