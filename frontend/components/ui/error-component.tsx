interface ErrorComponentProps {
    status?: number;
    message?: string;
    className?: string;
}

export default function ErrorComponent({ status, message, className }: ErrorComponentProps): React.JSX.Element {
    return (
        <div
            className={ `border border-red-300 bg-red-50 text-red-700 rounded-lg p-3 flex-center flex-col full-height m-4 ${className ?? ''}` }
            role="alert">
            <p className="font-semibold">
                { status ? `Error ${status}` : 'Error' }
            </p>
            { message && <p className="mt-1">{ message }</p> }
        </div>
    );
}
