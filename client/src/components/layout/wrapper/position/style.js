import styled from "styled-components";

/**
 * Flex is a styled-component wrapper around a div that provides flexible layout capabilities.
 * It supports various flex properties such as direction, justify-content, align-items, wrap, gap, width, and height.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.direction='row'] - The flex direction (row, column, etc.).
 * @param {string} [props.justify='flex-start'] - The justify-content property (alignment along the main axis).
 * @param {string} [props.align='stretch'] - The align-items property (alignment along the cross axis).
 * @param {string} [props.wrap='nowrap'] - The flex-wrap property (whether flex items should wrap).
 * @param {string} [props.gap='0'] - The gap between flex items.
 * @param {string} [props.width='auto'] - The width of the flex container.
 * @param {string} [props.height='auto'] - The height of the flex container.
 *
 * @returns {JSX.Element} A styled div with flex properties.
 */
const Flex = styled.div.withConfig({
    shouldForwardProp: (prop) => !["direction", "justify", "align", "wrap", "gap", "width", "height"].includes(prop)
})`
    display: flex;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    flex-wrap: ${(props) => props.wrap};
    gap: ${(props) => props.gap};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

// Default props for Flex component to ensure consistent behavior.
Flex.defaultProps = {
    direction: "row",
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
    gap: "0",
    width: "auto",
    height: "auto"
};

// Various predefined flex containers for different layout purposes.
export const FlexRow = styled(Flex).attrs({ direction: "row" })``;
export const FlexCenter = styled(Flex).attrs({ justify: "center", align: "center" })``;
export const FlexRowSpaceBetween = styled(Flex).attrs({ justify: "space-between", align: "center" })``;

export const FlexCol = styled(Flex).attrs({ direction: "column" })``;
export const FlexColCenter = styled(Flex).attrs({ direction: "column", justify: "center", align: "center" })``;
export const FlexColSpaceBetween = styled(Flex).attrs({ direction: "column", justify: "space-between" })``;

// Export the base Flex component as the default export.
export default Flex;
