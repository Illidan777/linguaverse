import {
    DashboardPage,
    DashboardPageContainer,
    DashboardPageHeader,
    DashboardPageMain,
    DashboardPagePrimaryContent
} from "./style";

const DashboardPageLayout = ({ grayBackground, header, content }) => {
    return (
        <DashboardPageContainer grayBackground={grayBackground}>
            <DashboardPage>
                <DashboardPageHeader>{header}</DashboardPageHeader>
                <DashboardPagePrimaryContent>
                    <DashboardPageMain>{content}</DashboardPageMain>
                </DashboardPagePrimaryContent>
            </DashboardPage>
        </DashboardPageContainer>
    );
};

export default DashboardPageLayout;
