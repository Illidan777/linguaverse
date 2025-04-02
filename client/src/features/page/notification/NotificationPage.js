// React components and hooks
import React from "react";
import {useNavigate} from "react-router";

// Layout Components
import DashboardPageLayout from "../../../components/layout/page";

// UI Components
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {FlexCenter, FlexCol} from "../../../components/layout/wrapper/position/style";
import {BaseButtonBar, PrimaryButton, SecondaryButton} from "../../../components/button/style";

// Routing
import {paths} from "../../../app/routes";

/**
 * NotificationPage Component
 * Displays the notification management page.
 *
 * @returns {JSX.Element} Notification page layout
 */
export default function NotificationPage() {

    const navigate = useNavigate();

    // Meta information for SEO
    const meta = (
        <>
            <meta
                name="description"
                content="Manage your internal push notifications. View received notifications and set preferences to tailor your experience."
            />
            <meta
                name="keywords"
                content="internal push notifications, notification settings, alert preferences, user notifications"
            />
            <meta name="robots" content="index, follow" />
            <title>Notifications</title>
        </>
    );
    return (
        <DashboardPageLayout meta={meta}
            header={
                <StyledText as="h2" size={FONT_SIZES.TITLE_MEDIUM} weight={FONT_WEIGHTS.SUPER_BOLD}>
                    Notifications
                </StyledText>
            }
            content={
                <FlexCol gap="30px">
                    <StyledText as="p" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.REGULAR}>
                        Your notifications is empty, because functionality has no been implemented yet :(
                        But it is gonna appear here as soon as possible, keep in touch)
                    </StyledText>

                    <FlexCenter>
                        <BaseButtonBar>
                            <PrimaryButton onClick={() => navigate(paths.library.index.getHref())}>Go to the Library</PrimaryButton>
                            <SecondaryButton onClick={() => navigate(paths.index.getHref())}>Go to the Home page</SecondaryButton>
                        </BaseButtonBar>
                    </FlexCenter>
                </FlexCol>
            }
        />
    );
};