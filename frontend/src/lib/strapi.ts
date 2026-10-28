const { STRAPI_URL = 'http://localhost:1337', STRAPI_TOKEN } = import.meta.env;

interface FetchOptions extends RequestInit {
    query?: Record<string, string | number>;
}

export async function fetchStrapi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { query, ...fetchOptions } = options;
    const url = new URL(`/api${endpoint}`, STRAPI_URL);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const res = await fetch(url.toString(), {
        ...fetchOptions,
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`Error en la petición a Strapi [${res.status}]: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
}