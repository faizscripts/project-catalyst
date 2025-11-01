import type { NormalizedError } from '@/interfaces/error';

export function normalizeError(error: unknown): NormalizedError {
    if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'message' in error
    ) {
        const { status, message, details } = error as {
            status: number;
            message: string;
            details?: unknown;
        };
        return { status, message, details };
    }

    if (error instanceof Error) {
        return {
            status: 500,
            message: error.message || 'Unexpected error occurred',
            details: error.stack,
        };
    }

    if (typeof error === 'string') {
        return { status: 500, message: error };
    }

    return { status: 500, message: 'Unknown error', details: error };
}
