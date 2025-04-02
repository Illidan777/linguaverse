/**
 * Dashboard Page Layout Component
 *
 * This component provides a structured layout for dashboard pages,
 * including loading and error boundaries, a header, main content,
 * and conditional navigation logic.
 */

import styled from "styled-components";
import { FlexCol } from "../wrapper/position/style";
import LoadingBoundary from "../wrapper/boundary/loadingBoundary";
import ControllableErrorBoundary from "../wrapper/boundary/controllableErrorBoundary";
import { BaseFallbackComponent } from "../wrapper/boundary/fallback/base";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../../spinner/Spinner";
import theme from "../../../style/theme";

/**
 * DashboardPageLayout Component
 *
 * @param {boolean} isLoading - Determines if the page is loading
 * @param {boolean} isError - Indicates if an error has occurred
 * @param {boolean} grayBackground - Enables gray background styling
 * @param {ReactNode} header - The header component
 * @param {ReactNode} content - The main content component
 * @param {boolean} redirectCondition - Condition for redirection
 * @param {string} redirectTo - Path to redirect to
 * @param {ReactNode} meta - Metadata components (e.g., SEO tags)
 */
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
        return <Spinner />;
    }

    return (
        <LoadingBoundary isLoading={isLoading}>
            <ControllableErrorBoundary hasError={isError} fallback={<BaseFallbackComponent />}>
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

/**
 * Styled container for the dashboard page layout.
 * Adjusts padding based on screen size.
 *
 * @param {boolean} bg - Determines background color
 */
export const DashboardPageContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "bg"
})`
    margin: 0 auto;
    padding: 50px 300px;
    background-color: ${({ bg }) => (bg ? `var(--second-background-color)` : `var(--main-background-color)`) };

    @media (max-width: ${theme.media.desktop}) {
        padding: 50px 200px;
    }
    @media (max-width: ${theme.media.laptop}) {
        padding: 50px 100px;
    }
    @media (max-width: ${theme.media.bigTablet}) {
        padding: 50px;
    }
    @media (max-width: ${theme.media.tablet}) {
        padding: 30px;
    }
    @media (max-width: ${theme.media.mobile}) {
        padding: 20px;
    }
`;

/**
 * Flex column container for the dashboard layout.
 */
export const DashboardPage = styled(FlexCol)``;

/**
 * Styled container for the dashboard page header.
 * Contains spacing adjustments.
 */
export const DashboardPageHeader = styled(FlexCol)`
    width: 100%;
    gap: 100px;
    justify-content: space-between;
`;

/**
 * Primary content wrapper for the dashboard page.
 */
export const DashboardPagePrimaryContent = styled.div``;

/**
 * Main content area with defined padding.
 */
export const DashboardPageMain = styled.div`
    padding: 50px 0;
`;

export default DashboardPageLayout;
