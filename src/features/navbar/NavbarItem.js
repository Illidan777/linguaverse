import styled from "styled-components";
import {BaseCoverImage} from "../../components/styled/ImageStyledComponents";
import {StyledText, FONT_WEIGHTS, FONT_SIZES} from "../../components/styled/StyledText";

const NavbarItem = ({iconSrc, iconAlt, name, showFull}) => {

    return (
        <ul>
            <NavItem>
                <BaseCoverImage src={iconSrc} alt={iconAlt}/>
                {showFull ?
                    <StyledText
                        as='span'
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.REGULAR}
                    >
                        {name}
                    </StyledText>
                    : null}

            </NavItem>
        </ul>

    )
}

const NavItem = styled.li`
    height: 60px;
    padding: 10px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
`

export default NavbarItem;