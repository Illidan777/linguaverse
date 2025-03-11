import styled from "styled-components";
import {OutlinedButton, PrimaryButton, SecondaryButton, StyledButton} from "../../components/button/style";
import {PrimaryStyledInput} from "../../components/input/style";
import ContextMenu from "../../components/menu";

const HomePage = () => {
    return (
        <HomePageWrapper>
            <StyledButton>
                Just Styled
            </StyledButton>
            <OutlinedButton>
                Outlined
            </OutlinedButton>
            <PrimaryButton>
                Primary
            </PrimaryButton>
            <SecondaryButton>
                Secondary
            </SecondaryButton>
            <PrimaryStyledInput placeholder="Enter what you want to search"/>
            <ContextMenu/>

        </HomePageWrapper>
    )
}
const HomePageWrapper = styled.div`
    padding: 50px;
    background-color: var(--gray-lighter);
    width: 700px;
    height: 100%;
`


export default HomePage;