import { normalizeError } from '@/utils/error';

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

        let json: T | { message?: string } | null = null;
        const contentType = res.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            json = await res.json();
        }

        if (!res.ok) {
            throw {
                status: res.status,
                message: (json as { message?: string })?.message || res.statusText || 'API request failed',
                details: json,
            };
        }

        return json as T;
    } catch (error: unknown) {
        throw normalizeError(error);
    }
}
