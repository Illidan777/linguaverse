import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  gap: ${(props) => props.gap || "0"};
`;

export const FlexRow = styled(Flex).attrs({ direction: "row" })``;
export const FlexCol = styled(Flex).attrs({ direction: "column" })``;
export const FlexCenter = styled(Flex).attrs({ justify: "center", align: "center" })``;
export const FlexBetween = styled(Flex).attrs({ justify: "space-between" })``;
export const FlexAround = styled(Flex).attrs({ justify: "space-around" })``;
export const FlexEvenly = styled(Flex).attrs({ justify: "space-evenly" })``;
export const FlexRowCenter = styled(Flex).attrs({ direction: "row", justify: "center", align: "center" })``;
export const FlexColCenter = styled(Flex).attrs({ direction: "column", justify: "center", align: "center" })``;
export const FlexStretch = styled(Flex).attrs({ align: "stretch" })``;
export const FlexWrap = styled(Flex).attrs({ wrap: "wrap" })``;
export const FlexWrapReverse = styled(Flex).attrs({ wrap: "wrap-reverse" })``;

export default Flex;