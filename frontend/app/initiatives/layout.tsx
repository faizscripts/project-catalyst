export default function InitiativesLayout({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
    return (
        <div className="full-height items-center overflow-y-auto py-6">
            <div className="w-full max-w-md p-4 text-center">
                { children }
            </div>
        </div>
    );
}
