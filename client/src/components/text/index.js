/**
 * StyledText Component
 *
 * This file defines a reusable styled text component using styled-components.
 * It provides predefined font weights, sizes, and line heights for responsive typography.
 */

import styled from "styled-components";
import theme from "../../style/theme";

/**
 * Font weight presets for different screen sizes.
 */
const FONT_WEIGHTS = {
    SUPER_BOLD: { basic: 900, desktop: 900, laptop: 900, bigTablet: 900, tablet: 900, mobile: 900 },
    SEMI_BOLD: { basic: 700, desktop: 700, laptop: 700, bigTablet: 700, tablet: 700, mobile: 700 },
    MEDIUM: { basic: 500, desktop: 500, laptop: 500, bigTablet: 500, tablet: 500, mobile: 500 },
    REGULAR: { basic: 400, desktop: 400, laptop: 400, bigTablet: 400, tablet: 400, mobile: 400 },
    LIGHT: { basic: 300, desktop: 300, laptop: 300, bigTablet: 300, tablet: 300, mobile: 300 },
    THIN: { basic: 200, desktop: 200, laptop: 200, bigTablet: 200, tablet: 200, mobile: 200 },
};

/**
 * Font size presets for different screen sizes.
 */
const FONT_SIZES = {
    SIMPLE_BIG: { basic: "25px", desktop: "25px", laptop: "25px", bigTablet: "21px", tablet: "21px", mobile: "21px" },
    SIMPLE_MEDIUM: { basic: "20px", desktop: "20px", laptop: "20px", bigTablet: "16px", tablet: "16px", mobile: "16px" },
    SIMPLE_SMALL: { basic: "16px", desktop: "16px", laptop: "16px", bigTablet: "12px", tablet: "12px", mobile: "12px" },
    TITLE_MAIN: { basic: "118px", desktop: "118px", laptop: "118px", bigTablet: "118px", tablet: "118px", mobile: "118px" },
    TITLE_BIG: { basic: "35px", desktop: "35px", laptop: "35px", bigTablet: "30px", tablet: "28px", mobile: "28px" },
    TITLE_MEDIUM: { basic: "30px", desktop: "30px", laptop: "30px", bigTablet: "25px", tablet: "23px", mobile: "23px" },
    TITLE_SMALL: { basic: "25px", desktop: "25px", laptop: "25px", bigTablet: "20px", tablet: "18px", mobile: "18px" },
};

/**
 * Line height presets for different screen sizes.
 */
const LINE_HEIGHTS = {
    SUPER_BIG: { basic: 1.5, desktop: 1.5, laptop: 1.5, bigTablet: 1.5, tablet: 1.5, mobile: 1.5 },
    BIG: { basic: 1.1, desktop: 1.1, laptop: 1.1, bigTablet: 1.1, tablet: 1.1, mobile: 1.1 },
    MEDIUM: { basic: 0.9, desktop: 0.9, laptop: 0.9, bigTablet: 0.9, tablet: 0.9, mobile: 0.9 },
    REGULAR: { basic: 0.8, desktop: 0.8, laptop: 0.8, bigTablet: 0.8, tablet: 0.8, mobile: 0.8 },
    SMALL: { basic: 0.7, desktop: 0.7, laptop: 0.7, bigTablet: 0.7, tablet: 0.7, mobile: 0.7 },
};

/**
 * Styled component that applies responsive typography settings.
 */
const StyledComponent = styled.span.withConfig({
    shouldForwardProp: (prop) => !["color", "weight", "size", "lineHeight"].includes(prop)
})`
    color: ${({ color }) => color};
    font-weight: ${({ weight }) => weight.basic};
    font-size: ${({ size }) => size.basic};
    line-height: ${({ lineHeight }) => lineHeight.basic};

    @media (max-width: ${theme.media.desktop}) {
        font-size: ${({ size }) => size.desktop};
        font-weight: ${({ weight }) => weight.desktop};
        line-height: ${({ lineHeight }) => lineHeight.desktop};
    }

    @media (max-width: ${theme.media.laptop}) {
        font-size: ${({ size }) => size.laptop};
        font-weight: ${({ weight }) => weight.laptop};
        line-height: ${({ lineHeight }) => lineHeight.laptop};
    }

    @media (max-width: ${theme.media.bigTablet}) {
        font-size: ${({ size }) => size.bigTablet};
        font-weight: ${({ weight }) => weight.bigTablet};
        line-height: ${({ lineHeight }) => lineHeight.bigTablet};
    }

    @media (max-width: ${theme.media.tablet}) {
        font-size: ${({ size }) => size.tablet};
        font-weight: ${({ weight }) => weight.tablet};
        line-height: ${({ lineHeight }) => lineHeight.tablet};
    }

    @media (max-width: ${theme.media.mobile}) {
        font-size: ${({ size }) => size.mobile};
        font-weight: ${({ weight }) => weight.mobile};
        line-height: ${({ lineHeight }) => lineHeight.mobile};
    }
`;

// Default properties for the StyledComponent
StyledComponent.defaultProps = {
    color: "black",
    weight: FONT_WEIGHTS.REGULAR,
    size: FONT_SIZES.SIMPLE_SMALL,
    lineHeight: LINE_HEIGHTS.REGULAR
};

/**
 * StyledText Component
 *
 * A wrapper for StyledComponent that allows flexible typography customization.
 *
 * @param {string} as - HTML tag to render (e.g., 'span', 'p', 'div').
 * @param {object} weight - Font weight preset.
 * @param {object} size - Font size preset.
 * @param {object} lineHeight - Line height preset.
 * @param {string} color - Text color.
 * @param {ReactNode} children - Child elements.
 */
export const StyledText = ({
                               as = 'span',
                               weight = FONT_WEIGHTS.REGULAR,
                               size = FONT_SIZES.SIMPLE_SMALL,
                               lineHeight = LINE_HEIGHTS.REGULAR,
                               color,
                               children
                           }) => {
    return (
        <StyledComponent
            as={as}
            weight={weight}
            size={size}
            color={color}
            lineHeight={lineHeight}
        >
            {children}
        </StyledComponent>
    );
};

// Export typography constants
export { FONT_WEIGHTS, FONT_SIZES, LINE_HEIGHTS };