import type { ApiResponseType } from '@/types/api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponseType<T>> {
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
        if (contentType && contentType.includes('application/json')) {
            json = (await res.json()) as T | { message?: string };
        }

        if (!res.ok) {
            return {
                error: {
                    status: res.status,
                    message: (json as { message?: string })?.message || res.statusText,
                    details: json,
                },
            };
        }

        return { data: json as T };
    } catch (error: unknown) {
        console.error('API Request Failed:', error);
        return {
            error: {
                status: 500,
                message: 'Internal API request error',
                details: error,
            },
        };
    }
}
