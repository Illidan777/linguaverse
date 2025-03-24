import Spinner from "../../../spinner/Spinner";

export default function LoadingBoundary({isLoading, spinnerSize, children}) {
    if (isLoading) {
        return <Spinner size={spinnerSize}/>
    }
    return <>
        {children}
    </>
}