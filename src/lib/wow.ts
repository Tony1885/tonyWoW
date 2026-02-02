export interface WowCharacter {
    name: string;
    race: string;
    class: string;
    active_spec_name: string;
    active_spec_role: string;
    gender: string;
    faction: string;
    achievement_points: number;
    thumbnail_url: string;
    region: string;
    realm: string;
    last_crawled_at: string;
    profile_url: string;
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
        const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear,mythic_plus_scores_by_season:current`;
        const response = await fetch(url, { next: { revalidate: 3600 } });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching WoW character:", error);
        return null;
    }
}
