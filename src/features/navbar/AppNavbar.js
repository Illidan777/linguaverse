import NavbarItem from "./NavbarItem";
import home from '../../assets/icons/home.png';
import library from '../../assets/icons/folder.png';
import styled from "styled-components";
import {useSelector} from "react-redux";

const AppNavbar = () => {

    const openedNavbar = useSelector(state => state.navbar.openedNavbar);

    return (
        <aside>
            <Navbar className="navbar" openedNavbar={openedNavbar}>
                <NavbarItem name='Home' iconSrc={home} iconAlt='home' showFull={openedNavbar}/>
                <NavbarItem name='Library' iconSrc={library} iconAlt='library' showFull={openedNavbar}/>
            </Navbar>
        </aside>
    )
}

const Navbar = styled.nav`
    padding: 40px 10px 0 5px;
    height: 100vh;
    width: ${({openedNavbar}) => (openedNavbar ? '20%' : '10%')};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transition: width 0.3s ease-in-out;
`

export default AppNavbar