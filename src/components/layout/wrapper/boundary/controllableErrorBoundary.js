export default function ControllableErrorBoundary({hasError, children, fallback}) {

    if (hasError) {
        return fallback;
    }

    return (
        <>
            {children}
        </>
    );
};