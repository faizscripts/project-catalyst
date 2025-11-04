'use client';

import * as React from 'react';
import { Input } from '@/shadcn/input';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** The forwarded ref from react-hook-form field.ref */
    fieldRef?: React.Ref<HTMLInputElement>;
}

/**
 * A date input that ensures the native date picker opens properly
 * inside modals, drawers, or Radix/Vaul components.
 */
export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
    ({ fieldRef, onClick, ...props }, ref) => {
        const localRef = React.useRef<HTMLInputElement | null>(null);

        // Combine RHF's ref and local ref
        const combinedRef = (el: HTMLInputElement | null) => {
            if (typeof fieldRef === 'function') fieldRef(el);
            else if (fieldRef && 'current' in fieldRef) (fieldRef as any).current = el;
            (ref as any)?.(el);
            localRef.current = el;
        };

        const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
            // Run any existing click handlers
            onClick?.(e);

            // Try to open the native picker
            const input = localRef.current;
            if (input) {
                const anyInput = input as any;
                if (typeof anyInput.showPicker === 'function') {
                    anyInput.showPicker();
                } else {
                    input.focus();
                }
            }
        };

        return (
            <Input
                ref={combinedRef}
                type="date"
                onClick={handleClick}
                className="pointer-events-auto w-full appearance-none text-sm leading-tight p-2"
                {...props}
            />
        );
    }
);

DateInput.displayName = 'DateInput';
