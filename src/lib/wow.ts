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
        scores: {
            all: number;
            dps: number;
            healer: number;
            tank: number;
        };
    }>;
}

export async function getCharacterProfile(region: string, realm: string, name: string): Promise<WowCharacter | null> {
    try {
        // Enforce basic strings
        const r = String(region).toLowerCase();
        const rl = String(realm).toLowerCase();
        const n = String(name).toLowerCase();

        // Use a clean URL without manual decoding/encoding if not needed, 
        // but Raiders.io needs correctly escaped characters.
        const encodedName = encodeURIComponent(n);
        const encodedRealm = encodeURIComponent(rl);
        const encodedRegion = encodeURIComponent(r);

        const url = `https://raider.io/api/v1/characters/profile?region=${encodedRegion}&realm=${encodedRealm}&name=${encodedName}&fields=gear,mythic_plus_scores_by_season:current`;

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
