import styled from "styled-components";
import {FlexCol} from "../wrapper/position/style";
import LoadingBoundary from "../wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../wrapper/boundary/controllableErrorBoundary";
import {BaseFallbackComponent} from "../wrapper/boundary/fallback/base";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import Spinner from "../../spinner/Spinner";

const DashboardPageLayout = ({
                                 isLoading,
                                 isError,
                                 grayBackground,
                                 header,
                                 content,
                                 redirectCondition,
                                 redirectTo,
                                 meta
                             }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (redirectCondition) {
            navigate(redirectTo);
        } else {
            setIsChecking(false);
        }
    }, [redirectCondition, redirectTo, navigate]);

    if (isChecking) {
        return <Spinner/>;
    }

    return (
        <LoadingBoundary isLoading={isLoading}>
            <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
                {meta}
                <DashboardPageContainer bg={grayBackground}>
                    <DashboardPage>
                        <DashboardPageHeader>{header}</DashboardPageHeader>
                        <DashboardPagePrimaryContent>
                            <DashboardPageMain>{content}</DashboardPageMain>
                        </DashboardPagePrimaryContent>
                    </DashboardPage>
                </DashboardPageContainer>
            </ControllableErrorBoundary>
        </LoadingBoundary>
    );
};

export const DashboardPageContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "bg"
})`
    margin: 0 auto;
    padding: 50px 300px;
    background-color: ${({bg}) => (bg ? `var(--second-background-color)` : `var(--main-background-color)`)};
`;

export const DashboardPage = styled(FlexCol)`
`

export const DashboardPageHeader = styled(FlexCol)`
    width: 100%;
    gap: 100px;
    justify-content: space-between;
`

export const DashboardPagePrimaryContent = styled.div`
`

export const DashboardPageMain = styled.div`
    padding: 50px 0;
`

export default DashboardPageLayout;
