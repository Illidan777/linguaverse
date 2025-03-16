import DashboardPageLayout from "../../../components/layout/page";
import React, {useState} from "react";
import {FlexCenter, FlexCol, FlexRow} from "../../../components/layout/wrapper/position/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {AddIcon, AIAssistIcon, ReverseIcon, SettingsIcon} from "../../../components/icon";
import {
    BaseButtonBar,
    CirclePrimaryButton,
    CircleSecondaryButton,
    PrimaryButton,
    SecondaryButton,
    StyledButton,
} from "../../../components/button/style";
import {SecondaryInput} from "../../../components/input/style";
import styled from "styled-components";
import ModuleSettingsModal from "../../module/modal/moduleSettingsModal";
import TermRow from "../../module/moduleTermRow";

const ModuleEditPage = () => {
    return (
        <DashboardPageLayout
            grayBackground
            header={<Header/>}
            content={<Content/>}
        />
    )
}

const Header = () => {
    return (
        <FlexRow justify="space-between" align="flex-start">
            <StyledText
                as="h2"
                size={FONT_SIZES.TITLE_MEDIUM}
                weight={FONT_WEIGHTS.SUPER_BOLD}
            >
                Create new module
            </StyledText>
            <FlexRow gap="10px">
                <PrimaryButton onClick={() => console.log("Create module!")}>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Create
                    </StyledText>
                </PrimaryButton>
            </FlexRow>
        </FlexRow>
    )
}

const Content = () => {
    return (
        <FlexCol gap="20px">
            <SecondaryInput placeholder="Name"/>
            <SecondaryInput placeholder="Description"/>
            <Toolbar/>
            <TermsContainer/>
        </FlexCol>
    )
}

const Toolbar = () => {
    const [openedSettingsModal, setSettingsModal] = useState(false);

    const onCloseSettingsModal = () => {
        setSettingsModal(false);
    }
    return (
        <FlexRow justify="space-between">
            <BaseButtonBar>
                <SecondaryButton disabled>
                    <AddIcon size="20px"/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Import
                    </StyledText>
                </SecondaryButton>
                <SecondaryButton disabled>
                    <AddIcon size="20px"/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Add diagram
                    </StyledText>
                </SecondaryButton>
                <SecondaryButton disabled>
                    <AIAssistIcon/>
                    <StyledText
                        as="span"
                        size={FONT_SIZES.SIMPLE_SMALL}
                        weight={FONT_WEIGHTS.SEMI_BOLD}
                    >
                        Create from notes
                    </StyledText>
                </SecondaryButton>
            </BaseButtonBar>
            <BaseButtonBar>
                <CircleSecondaryButton onClick={() => setSettingsModal(true)}>
                    <SettingsIcon/>
                </CircleSecondaryButton>
                <CircleSecondaryButton>
                    <ReverseIcon/>
                </CircleSecondaryButton>
            </BaseButtonBar>
            <ModuleSettingsModal
                opened={openedSettingsModal} onClose={onCloseSettingsModal}
            />
        </FlexRow>
    )
}

const TermsContainer = () => {
    return (
        <FlexCol>
            <TermRow/>
            <TermRowDivider>
                <ImpliedAddNewCardButton>
                    <AddIcon/>
                </ImpliedAddNewCardButton>
            </TermRowDivider>
            <TermRow/>
            <TermRowDivider>
            </TermRowDivider>

            <AddNewTermButton>
                <StyledText
                    as="div"
                    size={FONT_SIZES.SIMPLE_BIG}
                    weight={FONT_WEIGHTS.REGULAR}
                >
                    <AddNewTermButtonTitle>
                        Add card
                    </AddNewTermButtonTitle>
                </StyledText>
            </AddNewTermButton>
        </FlexCol>
    )
}

const TermRowDivider = styled(FlexCenter)`
    cursor: pointer;
    height: 20px;

    &:hover {
        button {
            transform: scale(1);
        }
    }
`

const ImpliedAddNewCardButton = styled(CirclePrimaryButton)`
    position: absolute;
    z-index: 100;
    transform: scale(0);
`

const AddNewTermButton = styled(StyledButton)`
    cursor: pointer;
    padding: 50px;
    width: 100%;
    background-color: var(--main-background-color);

    &:hover {
        background-color: var(--main-background-color);

        span {
            color: var(--lavanda-dark);
            border-bottom-color: var(--lavanda-dark);
        }
    }
`

const AddNewTermButtonTitle = styled.span`
    padding: 10px;
    border-bottom: 5px solid var(--sky-darkest);
`

export default ModuleEditPage;