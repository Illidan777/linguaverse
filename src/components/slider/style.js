import styled from "styled-components";
import {FlexRow} from "../layout/wrapper/position/style";
import {SecondaryButton} from "../button/style";

export const SlidesWrapper = styled(FlexRow)`
    position: relative;
    width: 100%;
    height: 500px;
    perspective: 1000px;
`
export const SlideItem = styled.div`
    position: absolute;
    flex-shrink: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${({active}) => (active ? 1 : 0)};
    animation: ${({active, direction}) =>
    active
        ? direction === "next"
            ? "shakeRight 0.3s ease-in-out"
            : "shakeLeft 0.3s ease-in-out"
        : "none"};

    @keyframes shakeRight {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(100px) rotateY(30deg);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes shakeLeft {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(-100px) rotateY(-30deg);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

export const SliderNavigationButton = styled(SecondaryButton)`
    padding: 10px;
    border-radius: 40%;
`