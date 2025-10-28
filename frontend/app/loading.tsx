export default function Loading(): React.JSX.Element {
    return (
        <div className="flex items-center justify-center h-full py-8">
            <div className="h-8 w-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
    );
}
