import styled from "styled-components";

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

Flex.defaultProps = {
    direction: "row",
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
    gap: "0",
    width: "auto",
    height: "auto"
};

export const FlexRow = styled(Flex).attrs({ direction: "row" })``;
export const FlexCenter = styled(Flex).attrs({ justify: "center", align: "center" })``;
export const FlexRowSpaceBetween = styled(Flex).attrs({ justify: "space-between" , align: "center"})``;

export const FlexCol = styled(Flex).attrs({ direction: "column" })``;
export const FlexColCenter = styled(Flex).attrs({ direction: "column", justify: "center", align: "center" })``;
export const FlexColSpaceBetween = styled(Flex).attrs({ direction: "column", justify: "space-between" })``;

export default Flex;
