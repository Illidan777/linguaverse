import styled from "styled-components";

import {FlexCenter, FlexColCenter} from "../../position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../../text";
import {CoverImage} from "../../../../image/style";

import oopsSrc from "../../../../../assets/icons/oops.png"
import {BaseButtonBar, PrimaryButton} from "../../../../button/style";
import {paths} from "../../../../../app/routes";

export const BaseFallbackComponent = ({
                                          iconSrc = oopsSrc,
                                          text = 'Ooops... something went wrong :(',
                                          includeBaseActions = true,
                                          actions = []
                                      }) => {

    if(includeBaseActions) {
        actions.push(
            <PrimaryButton
                onClick={() => window.location.reload()}
            >
                Reload page
            </PrimaryButton>,
            <PrimaryButton
                onClick={() => window.location.assign(paths.index.getHref())}
            >
                Go home
            </PrimaryButton>
        )
    }

    return (
        <Container>
            <FlexCenter gap="30px">
                <Icon>
                    <CoverImage src={iconSrc} alt='errorIcon'/>
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

const Container = styled(FlexColCenter)`
    padding: 20px;
    gap: 10px;
`

const Icon = styled(FlexCenter)`
    width: 50px;
    height: 50px;
`