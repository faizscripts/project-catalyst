import { Badge } from '@/shadcn/badge';

interface StatusBadgeProps<T extends string> {
    status: T;
    labelMap: Record<T, string>;
    variantMap: Record<T, 'default' | 'alternate' | 'destructive' | 'success' | 'secondary' | 'outline'>;
}

export default function StatusBadge<T extends string>({ status, labelMap, variantMap }: StatusBadgeProps<T>): React.JSX.Element {

    if (!status) return <></>;

    const variant = variantMap[status];
    const label = labelMap[status];

    return (
        <Badge variant={ variant }>
            { label }
        </Badge>
    );
}
