import { fetchStrapi } from '../lib/strapi';

export interface HomePage {
    titleHero: string;
    description: string;
    heroImage: string;
}

export async function getHomePageData() {
    return fetchStrapi<HomePage>('/home-page');
}