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

export async function getCharacterProfile(region: string, realm: string, name: string): Promise<WowCharacter | null> {
    try {
        const r = String(region).toLowerCase();
        const rl = String(realm).toLowerCase();
        const n = String(name).toLowerCase();

        const encodedName = encodeURIComponent(n);
        const encodedRealm = encodeURIComponent(rl);
        const encodedRegion = encodeURIComponent(r);

        // Fetching more fields for progression card
        const fields = [
            "gear",
            "mythic_plus_scores_by_season:current",
            "mythic_plus_ranks"
        ].join(",");

        const url = `https://raider.io/api/v1/characters/profile?region=${encodedRegion}&realm=${encodedRealm}&name=${encodedName}&fields=${fields}`;

        const response = await fetch(url, {
            next: { revalidate: 60 },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'WoW-Dashboard-Agent/1.0'
            }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data && data.name ? data : null;
    } catch (error) {
        console.error("Critical Profile Fetch Error:", error);
        return null;
    }
}
