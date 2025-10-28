'use client';

import { useEffect } from 'react';
import ErrorComponent from '@/components/error-component';

export default function RootError({ error }: { error: Error }): React.JSX.Element {
    useEffect(() => {
        console.error('App error:', error);
    }, [error]);

    return ( <ErrorComponent message={ error.message || 'Something went wrong.' } /> );
}
