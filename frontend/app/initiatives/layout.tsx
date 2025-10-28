export default function InitiativesLayout({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
    return (
        <div className="full-height flex-center">
            <div className="full-height flex-center w-full max-w-md p-4 text-center">
                { children }
            </div>
        </div>
    );
}
