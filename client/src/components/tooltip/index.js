import React, { useState } from "react";
import styled from "styled-components";

const Tooltip = ({ text, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <TooltipWrapper
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            <TooltipText visible={visible}>{text}</TooltipText>
        </TooltipWrapper>
    );
};

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "visible"
})`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 14px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  z-index: var(--z-index-tooltip);
`;

export default Tooltip;
