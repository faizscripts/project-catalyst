import LoadingComponent from '@/components/ui/loading-component';

export default function Loading(): React.JSX.Element {
    return (
        <div className="flex items-center justify-center h-full py-8">
            <LoadingComponent />
        </div>
    );
}
