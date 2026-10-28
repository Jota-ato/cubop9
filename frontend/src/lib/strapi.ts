const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

export async function fetchStrapi(endpoint: string) {
    const url = new URL(`/api${endpoint}`, STRAPI_URL);

    console.log(STRAPI_TOKEN)

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Error al conectar con Strapi: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
}