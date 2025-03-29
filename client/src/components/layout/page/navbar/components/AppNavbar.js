import NavMenu from "./NavMenu";
import styled from "styled-components";
import {useSelector} from "react-redux";

const AppNavbar = () => {

    const openedNavbar = useSelector(state => state.navbar.openedNavbar);

    return (
        <aside>
            <Navbar opened={openedNavbar}>
                <NavMenu openedNavbar={openedNavbar}/>
            </Navbar>
        </aside>
    )
}

const Navbar = styled.nav.withConfig({
    shouldForwardProp: (prop) => prop !== "opened"
})`
    padding: 10px;
    min-height: 100%;
    width: ${({ opened }) => (opened ? 25 : 7)}vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.2s;
`;

export default AppNavbar