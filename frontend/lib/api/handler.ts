const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const res = await fetch(url, config);

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(
                `API Error (${res.status}): ${res.statusText} - ${errorText}`
            );
        }

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return res.json() as Promise<T>;
        }

        return null as T;
    } catch (error: unknown) {
        console.error('API Request Failed:', error);
        throw error;
    }
}
