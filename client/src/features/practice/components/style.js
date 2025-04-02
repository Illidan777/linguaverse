import styled from "styled-components";
import {FlexCenter} from "../../../components/layout/wrapper/position/style";
import theme from "../../../style/theme";

export const StudyModesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    gap: 10px;

    @media (max-width: ${theme.media.tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }
`

export const StudyModeItem = styled(FlexCenter)`
    padding: 15px;
    background-color: var(--second-background-color);
    gap: 10px;
`