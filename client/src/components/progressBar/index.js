import styled from "styled-components";

const ProgressBar = ({progress}) => {
    return (
        <BarContainer>
            <Progress style={{width: `${progress}%`}}/>
        </BarContainer>
    );
};

const BarContainer = styled.div`
    width: 100%;
    height: 3px;
    background-color: var(--gray);
    border-radius: 9999px;
    overflow: hidden;
    z-index: 200;
`;

const Progress = styled.div`
    height: 100%;
    background-color: var(--lavanda);
    transition: width 0.3s ease-in-out;
`;


export default ProgressBar;