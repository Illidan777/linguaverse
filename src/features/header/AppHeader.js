import logo from '../../assets/icons/logo.png';
import burger from '../../assets/icons/burger.png';
import {BaseCoverImage} from "../../components/styled/ImageStyledComponents";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {toggleNavbar} from "../navbar/navbarSlice";

const AppHeader = () => {

    const dispatch = useDispatch();

    return (
        <Header>
            <LogoWrapper>
                <BaseCoverImage onClick={() => dispatch(toggleNavbar())} src={burger} alt="menu"/>
                <BaseCoverImage src={logo} alt="logo"/>
            </LogoWrapper>
        </Header>
    )
}

const Header = styled.header`
    padding: 12px 16px;
    height: 64px;
    width: 100%;
    display: flex;
`

const LogoWrapper = styled.div`
    display: flex;
    gap: 20px;
`

export default AppHeader;