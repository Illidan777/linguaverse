import styled from "styled-components";
import {FlexCol} from "../wrapper/position/style";
import LoadingBoundary from "../wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../wrapper/boundary/controllableErrorBoundary";
import {BaseFallbackComponent} from "../wrapper/boundary/fallback/base";

const DashboardPageLayout = ({isLoading, isError, grayBackground, header, content}) => {

    return (
        <LoadingBoundary isLoading={isLoading}>
            <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent/>}>
                <DashboardPageContainer grayBackground={grayBackground}>
                    <DashboardPage>
                        <DashboardPageHeader>{header}</DashboardPageHeader>
                        <DashboardPagePrimaryContent>
                            <DashboardPageMain>{content}</DashboardPageMain>
                        </DashboardPagePrimaryContent>
                    </DashboardPage>
                </DashboardPageContainer>
            </ControllableErrorBoundary>
        </LoadingBoundary>
    )
};

export const DashboardPageContainer = styled.div`
    margin: 0 auto;
    padding: 50px 300px;
    background-color: ${({grayBackground}) => grayBackground ? `var(--second-background-color)` : `var(--main-background-color)`};
`

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
