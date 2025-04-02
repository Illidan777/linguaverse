// React components and hooks
import {useMemo} from "react";
import {useDispatch} from "react-redux";

// Libs
import styled from "styled-components";
import {Chart} from "react-google-charts";
import toast from "react-hot-toast";

// Custom hooks
import useCSSVariables from "../../../hook/useCSSVariables";

// UI components
import {FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {PrimaryButton, SecondaryButton} from "../../../components/button/style";
import {CoverImage} from "../../../components/image/style";
import {ExamIcon} from "../../../components/icon";

// Assets
import celebrationScr from '../../../assets/icons/celebration.png'

// State
import {toggleFinishedPractice} from "../state/practiceSlice";

// Theme
import theme from "../../../style/theme";

/**
 * PracticeResult component renders the user's practice result based on result from any practice mode with a pie chart and next step options.
 * It uses a combination of charts, styled components, and redux state management to display results and handle user interactions.
 *
 * @param {number} inProgressCount - The count of items in progress.
 * @param {number} learnedCount - The count of items learned.
 * @returns {JSX.Element} - The rendered component for practice results.
 */
const PracticeResult = ({inProgressCount = 0, learnedCount = 0}) => {
    // Fetches CSS variables for color customization
    const [grayColor, successColor] = useCSSVariables(["--gray", "--success-color"]);

    // Pie chart data preparation
    const data = useMemo(() => [
        ["Status", "Count"],
        ["In progress", inProgressCount],
        ["Learned", learnedCount],
    ], [inProgressCount, learnedCount]);

    // Pie chart options configuration
    const options = useMemo(() => ({
        pieHole: 0.4,
        is3D: false,
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {color: "black", fontSize: 16},
        },
        animation: {duration: 1000, easing: "out"},
        colors: [grayColor, successColor],
    }), [grayColor, successColor]);

    return (
        <FlexCol width="100%" gap="30px">
            <Header/>
            <Container>
                <ResultsChart data={data} options={options}/>
                <NextSteps/>
            </Container>
        </FlexCol>
    );
};

/**
 * Header component displays a congratulatory message with an icon.
 *
 * @returns {JSX.Element} - The header with a celebratory message and image.
 */
const Header = () => (
    <FlexRow gap="50px" align="center">
        <StyledText as="span" size={FONT_SIZES.TITLE_BIG} weight={FONT_WEIGHTS.SUPER_BOLD}>
            Congratulations! You have repeated all the cards.
        </StyledText>
        <Icon>
            <CoverImage src={celebrationScr} alt="Congrats image"/>
        </Icon>
    </FlexRow>
);

/**
 * ResultsChart component renders a Google Pie chart displaying the practice progress of the user.
 *
 * @param {Array} data - The data to be displayed on the chart.
 * @param {Object} options - Configuration options for the chart.
 * @returns {JSX.Element} - The rendered pie chart with results.
 */
const ResultsChart = ({data, options}) => (
    <ChartWrapper>
        <StyledText as="span" size={FONT_SIZES.TITLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
            Your results
        </StyledText>
        <Chart chartType="PieChart" data={data} options={options} width="100%" height="100%"/>
    </ChartWrapper>
);

/**
 * NextSteps component renders buttons for the next possible actions after completing the practice.
 *
 * @returns {JSX.Element} - The next step buttons for user interaction.
 */
const NextSteps = () => {
    const dispatch = useDispatch();
    return (
        <NextStepWrapper>
            <StyledText as="span" size={FONT_SIZES.TITLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
                Next steps
            </StyledText>
            <PrimaryButton
                width="100%"
                height="60px"
                onClick={() => toast.error("This functionality is temporarily not supported!")}>
                <ExamIcon/>
                Practice in exam mode
            </PrimaryButton>
            <SecondaryButton
                width="100%"
                height="60px"
                onClick={() => dispatch(toggleFinishedPractice())}>
                Pass flashcards again
            </SecondaryButton>
        </NextStepWrapper>
    )
};

// Styled Components

const Container = styled(FlexRow)`
    height: 100%;
    display: flex;
    gap: 20px;

    @media (max-width: ${theme.media.bigTablet}) {
        flex-direction: column;
    }
`;

const ChartWrapper = styled(FlexCol)`
    width: 60%;
    @media (max-width: ${theme.media.bigTablet}) {
        width: 100%;
    }
`

const NextStepWrapper = styled(FlexCol)`
    width: 40%;
    gap: 20px;
    @media (max-width: ${theme.media.bigTablet}) {
        width: 100%;
    }
`

const Icon = styled.div`
    width: 100px;
    height: 100px;
`;

export default PracticeResult;
