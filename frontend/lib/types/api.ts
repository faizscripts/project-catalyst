import type { ApiError } from '@/interfaces/error';

export type ApiResponseType<T> = {
    data?: T;
    error?: ApiError;
};
