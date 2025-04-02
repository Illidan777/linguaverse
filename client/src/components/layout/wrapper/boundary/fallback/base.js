/**
 * BaseFallbackComponent renders a fallback UI when something goes wrong.
 * It includes an error icon, a message, and optional actions like reload and go home.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.iconSrc=oopsSrc] - The source for the error icon.
 * @param {string} [props.text='Ooops... something went wrong :('] - The fallback message text.
 * @param {boolean} [props.includeBaseActions=true] - Whether to include base actions like reload and go home.
 * @param {Array} [props.actions=[]] - Custom actions to display below the message.
 *
 * @returns {JSX.Element} The rendered fallback UI.
 */

import styled from "styled-components";
import { FlexCenter, FlexColCenter } from "../../position/style";
import { FONT_SIZES, FONT_WEIGHTS, StyledText } from "../../../../text";
import { CoverImage } from "../../../../image/style";
import oopsSrc from "../../../../../assets/icons/oops.png";
import { BaseButtonBar, PrimaryButton } from "../../../../button/style";
import { paths } from "../../../../../app/routes";

export const BaseFallbackComponent = ({
                                          iconSrc = oopsSrc,
                                          text = 'Ooops... something went wrong :(',
                                          includeBaseActions = true,
                                          actions = []
                                      }) => {

    // Add default actions if not provided.
    if (includeBaseActions) {
        actions.push(
            <PrimaryButton onClick={() => window.location.reload()}>
                Reload page
            </PrimaryButton>,
            <PrimaryButton onClick={() => window.location.assign(paths.index.getHref())}>
                Go home
            </PrimaryButton>
        );
    }

    return (
        <Container>
            <FlexCenter gap="30px">
                <Icon>
                    <CoverImage src={iconSrc} alt="errorIcon" />
                </Icon>
                <StyledText
                    as="span"
                    size={FONT_SIZES.TITLE_MEDIUM}
                    weight={FONT_WEIGHTS.SUPER_BOLD}
                >
                    {text}
                </StyledText>
            </FlexCenter>
            <BaseButtonBar>
                {actions}
            </BaseButtonBar>
        </Container>
    );
};

// Styled container for the fallback component.
const Container = styled(FlexColCenter)`
    padding: 20px;
    gap: 10px;
`;

// Styled icon wrapper.
const Icon = styled(FlexCenter)`
    width: 50px;
    height: 50px;
`;

