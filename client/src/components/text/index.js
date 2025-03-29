import styled from "styled-components";

const FONT_WEIGHTS = {
    SUPER_BOLD: { basic: 900, mobile: 100 },
    SEMI_BOLD: { basic: 700, mobile: 100 },
    MEDIUM: { basic: 500, mobile: 100 },
    REGULAR: { basic: 400, mobile: 100 },
    LIGHT: { basic: 300, mobile: 100 },
    THIN: { basic: 200, mobile: 100 },
};

const FONT_SIZES = {
    SIMPLE_BIG: { basic: "25px", mobile: "24px" },
    SIMPLE_MEDIUM: { basic: "20px", mobile: "20px" },
    SIMPLE_SMALL: { basic: "16px", mobile: "20px" },
    TITLE_MAIN: { basic: "118px", mobile: "20px" },
    TITLE_BIG: { basic: "35px", mobile: "28px" },
    TITLE_MEDIUM: { basic: "30px", mobile: "28px" },
    TITLE_SMALL: { basic: "25px", mobile: "20px" },
};

const LINE_HEIGHTS = {
    SUPER_BIG: { default: 1.5, mobile: 0.7 },
    BIG: { default: 1.1, mobile: 0.7 },
    MEDIUM: { default: 0.9, mobile: 0.7 },
    REGULAR: { basic: 0.8, mobile: 0.7 },
    SMALL: { default: 0.7, mobile: 0.7 },
};

const StyledComponent = styled.span.withConfig({
    shouldForwardProp: (prop) => !["color", "weight", "size", "lineHeight"].includes(prop)
})`
    color: ${({ color }) => color};
    font-weight: ${({ weight }) => weight.basic};
    font-size: ${({ size }) => size.basic};
    line-height: ${({ lineHeight }) => lineHeight};

    @media (max-width: 768px) {
        font-size: ${({ size }) => size.mobile};
        font-weight: ${({ weight }) => weight.mobile};
    }
`;

StyledComponent.defaultProps = {
    color: "black",
    weight: FONT_WEIGHTS.REGULAR,
    size: FONT_SIZES.SIMPLE_SMALL,
    lineHeight: LINE_HEIGHTS.REGULAR
};

export const StyledText = ({
                               as = 'span',
                               weight,
                               size,
                               color,
                               lineHeight,
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

export { FONT_WEIGHTS, FONT_SIZES, LINE_HEIGHTS };
