import styled from "styled-components";
import useCSSVariables from "../../../hook/useCSSVariables";
import {FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {Chart} from "react-google-charts";
import {PrimaryButton, SecondaryButton} from "../../../components/button/style";
import {CoverImage} from "../../../components/image/style";


import celebrationScr from '../../../assets/icons/celebration.png'
import toast from "react-hot-toast";

import {useMemo} from "react";
import {ExamIcon} from "../../../components/icon";
import {useDispatch} from "react-redux";
import {toggleFinishedPractice} from "../state/practiceSlice";

const PracticeResult = ({inProgressCount = 0, learnedCount = 0}) => {
    const [grayColor, successColor] = useCSSVariables(["--gray", "--success-color"]);
    console.log(inProgressCount, learnedCount)

    const data = useMemo(() => [
        ["Status", "Count"],
        ["In progress", inProgressCount],
        ["Learned", learnedCount],
    ], [inProgressCount, learnedCount]);

    const options = useMemo(() => ({
        pieHole: 0.4,
        is3D: false,
        legend: {
            alignment: "center",
            textStyle: {color: "black", fontSize: 14},
        },
        animation: {duration: 1000, easing: "out"},
        colors: [grayColor, successColor],
    }), [grayColor, successColor]);

    return (
        <FlexCol width="100%">
            <Header/>
            <Container>
                <ResultsChart data={data} options={options}/>
                <NextSteps/>
            </Container>
        </FlexCol>
    );
};

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

const ResultsChart = ({data, options}) => (
    <FlexCol>
        <StyledText as="span" size={FONT_SIZES.TITLE_SMALL} weight={FONT_WEIGHTS.SEMI_BOLD}>
            Your results
        </StyledText>
        <Chart chartType="PieChart" data={data} options={options} width="100%" height="100%"/>
    </FlexCol>
);

const NextSteps = () => {
    const dispatch = useDispatch();
    return (
        <FlexCol gap="20px">
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
        </FlexCol>
    )
};


const Container = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 150px;
`;

const Icon = styled.div`
    width: 100px;
    height: 100px;
`;

export default PracticeResult;
