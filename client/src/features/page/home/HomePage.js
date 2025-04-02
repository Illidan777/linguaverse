/**
 * HomePage Component
 *
 * This is the landing page of the application, providing an introduction to the platform, its purpose,
 * and the technologies used in its development. It also includes a call-to-action button for users to
 * navigate to the library to start their learning journey.
 *
 * Props:
 * None
 */

// React components and hooks
import React from "react";
import {useNavigate} from "react-router";

// Layout components
import DashboardPageLayout from "../../../components/layout/page";

// UI components
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {FlexCenter, FlexCol} from "../../../components/layout/wrapper/position/style";
import {PrimaryButton} from "../../../components/button/style";

// Routing
import {paths} from "../../../app/routes";

/**
 * HomePage serves as the main entry point to the application, offering an overview
 * of the platform and inviting users to start exploring the library of learning modules.
 */
export default function HomePage() {

    const navigate = useNavigate();

    // Define the meta tags for SEO
    const meta = (
        <>
            <meta
                name="description"
                content="Welcome to the ultimate learning platform. Explore modules, manage terms, and enhance your knowledge with our interactive library and notifications."
            />
            <meta
                name="keywords"
                content="learning platform, interactive library, study modules, educational app, terms, push notifications"
            />
            <meta name="robots" content="index, follow" />
            <title>Home - Learning Platform</title>
        </>
    );
    return (
        <DashboardPageLayout meta={meta}
            header={
                <StyledText as="h2" size={FONT_SIZES.TITLE_MEDIUM} weight={FONT_WEIGHTS.SUPER_BOLD}>
                    Welcome to Lingμverse
                </StyledText>
            }
            content={
                <FlexCol gap="30px">
                    <StyledText as="p" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.REGULAR}>
                        Dear visitor, welcome to My Language Learning App!
                    </StyledText>

                    <StyledText as="p" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.REGULAR}>
                        This project is a simplified version of Quizlet, designed to help users learn and practice new
                        words through interactive flashcards. In this app, you can create folders, organize modules with
                        words, and reinforce your knowledge using different learning modes—currently, only the flashcard
                        mode is implemented.
                    </StyledText>

                    <StyledText as="p" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.REGULAR}>
                        This is an educational project aimed at strengthening my skills in React and front-end
                        development. It is a full-stack application built using the following technologies:
                    </StyledText>

                    <StyledText as="p" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.REGULAR}>
                        🔹 <strong>Front-end:</strong> HTML, CSS, SCSS, JavaScript, React, Redux, RTK, Styled Components.<br/>
                        🔹 <strong>Back-end:</strong> Java, Spring Boot, PostgreSQL, JPA, Hibernate.
                    </StyledText>

                    <StyledText as="p" size={FONT_SIZES.SIMPLE_MEDIUM} weight={FONT_WEIGHTS.REGULAR}>
                        The goal of this project is to explore best practices in front-end and back-end development
                        while building a functional and engaging language-learning tool. 🚀
                    </StyledText>

                    <FlexCenter>
                        <PrimaryButton onClick={() => navigate(paths.library.index.getHref())}>Let`s start our
                            journey</PrimaryButton>
                    </FlexCenter>
                </FlexCol>
            }
        />
    );
};