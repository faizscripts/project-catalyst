export default function InitiativesLayout({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
    return (
        <div className="full-height items-center overflow-y-auto">
            <div className="w-full max-w-md py-8 px-4 text-center">
                { children }
            </div>
        </div>
    );
}
