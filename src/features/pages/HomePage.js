import styled from "styled-components";
import {
    OutlinedButton,
    PaddingStyledButton,
    PrimaryButton,
    SecondaryButton,
    StyledButton,
    TransparentPrimaryButton
} from "../../components/button/style";
import {PrimaryInput} from "../../components/input/style";
import ContextMenu from "../../components/menu";
import {useGetAllFoldersQuery} from "../folder/api";

const HomePage = () => {


    const {
        data,
        isLoading,
        isError
    } = useGetAllFoldersQuery();


    console.log('home render')
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
            <PaddingStyledButton>Styled</PaddingStyledButton>
            <TransparentPrimaryButton disabled>Trans[parent</TransparentPrimaryButton>
            <PrimaryInput placeholder="Enter what you want to search"/>
            <ContextMenu/>

        </HomePageWrapper>
    )
}
const HomePageWrapper = styled.div`
    padding: 50px;
    background-color: var(--second-background-color);
    width: 700px;
    height: 100%;
`


export default HomePage;