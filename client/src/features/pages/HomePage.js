import DashboardPageLayout from "../../components/layout/page";
import React from "react";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../components/text";
import {FlexCenter, FlexCol} from "../../components/layout/wrapper/position/style";
import {PrimaryButton} from "../../components/button/style";
import {useNavigate} from "react-router";
import {paths} from "../../app/routes";

export default function HomePage() {

    const navigate = useNavigate();

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