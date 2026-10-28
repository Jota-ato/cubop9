import { STRAPI_URL } from '../lib/env';
import { fetchStrapi } from '../lib/strapi';

export interface HomePage {
    titleHero: string;
    description: string;
    heroImage: {
        url: string;
        id: number;
        name: string;
        alternativeText?: string;
        width: number;
        height: number;
        ext: string;
    };
}

export async function getHomePageData(): Promise<HomePage> {
    const response = await fetchStrapi<HomePage>('/home-page', {
        query: {
            populate: "heroImage"
        }
    });

    return {
        ...response,
        heroImage: {
            ...response.heroImage,
            url: `${STRAPI_URL}${response.heroImage.url}`
        }
    }
}