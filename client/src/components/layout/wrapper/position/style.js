import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction || "row"};
    justify-content: ${(props) => props.justify || "flex-start"};
    align-items: ${(props) => props.align || "stretch"};
    flex-wrap: ${(props) => props.wrap || "nowrap"};
    gap: ${(props) => props.gap || "0"};
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
`;

export const FlexRow = styled(Flex).attrs({ direction: "row" })``;
export const FlexCenter = styled(Flex).attrs({ justify: "center", align: "center" })``;
export const FlexRowSpaceBetween = styled(Flex).attrs({ justify: "space-between" , align: "center"})``;

export const FlexCol = styled(Flex).attrs({ direction: "column" })``;
export const FlexColCenter = styled(Flex).attrs({ direction: "column", justify: "center", align: "center" })``;
export const FlexColSpaceBetween = styled(Flex).attrs({ direction: "column", justify: "space-between" })``;

export default Flex;