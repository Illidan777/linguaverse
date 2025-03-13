import DashboardPageLayout from "../../../components/layout";
import React, {useState} from "react";
import {FlexCenter, FlexCol, FlexRow} from "../../../components/layout/style";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {
    AddIcon,
    AIAssistIcon,
    DeleteIcon,
    DownArrowIcon,
    ReverseIcon,
    SettingsIcon,
    UpArrowIcon
} from "../../../components/icon";
import {
    BaseButtonBar,
    CirclePrimaryButton,
    CircleSecondaryButton,
    CircleStyledButton,
    PrimaryButton,
    SecondaryButton,
    StyledButton,
} from "../../../components/button/style";
import {SecondaryInput} from "../../../components/input/style";
import styled from "styled-components";
import TextAreaWithCounter from "../../../components/input";
import CreateFolderModal from "../../../components/modal/CreateFolderModal";
import ModuleSettingsModal from "../../../components/modal/ModuleSettingsModal";

const ModuleEditPage = (props) => {
    const [text, setText] = useState('');
    const [openedSettingsModal, setSettingsModal] = useState(false);

    const onCloseSettingsModal = () => {
        setSettingsModal(false);
    }

    return (
        <DashboardPageLayout
            grayBackground
            header={
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
            }
            content={
                <FlexCol gap="20px">
                    <SecondaryInput placeholder="Name"/>
                    <SecondaryInput placeholder="Description"/>
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
                    </FlexRow>

                    <FlexCol>
                        <TermRow>
                            <TermRowHeader>
                                <TermUiContainer>
                                    <FlexRow justify="space-between" align="center">
                                        <StyledText
                                            as="span"
                                            size={FONT_SIZES.SIMPLE_BIG}
                                            weight={FONT_WEIGHTS.REGULAR}
                                        >
                                            1
                                        </StyledText>
                                        <BaseButtonBar>
                                            <CircleStyledButton>
                                                <AddIcon size="25px"/>
                                            </CircleStyledButton>
                                            <CircleStyledButton>
                                                <UpArrowIcon size="20px"/>
                                            </CircleStyledButton>
                                            <CircleStyledButton>
                                                <DownArrowIcon size="20px"/>
                                            </CircleStyledButton>
                                            <CircleStyledButton>
                                                <DeleteIcon size="20px"/>
                                            </CircleStyledButton>
                                        </BaseButtonBar>

                                    </FlexRow>
                                </TermUiContainer>
                            </TermRowHeader>

                            <div>
                                <TermUiContainer>
                                    <FlexRow gap="50px" justify="space-between" align="center">
                                        <TextAreaWithCounter
                                            placeholder="Term"
                                            maxLength={150}
                                            value={text}
                                            onChange={setText}
                                        />
                                        <TextAreaWithCounter
                                            placeholder="Definition"
                                            maxLength={150}
                                            value={text}
                                            onChange={setText}
                                        />
                                    </FlexRow>
                                </TermUiContainer>
                            </div>
                        </TermRow>
                        <TermRowDivider>
                            <ImpliedAddNewCardButton>
                                <AddIcon/>
                            </ImpliedAddNewCardButton>
                        </TermRowDivider>
                        <TermRow>
                            <TermRowHeader>
                                <TermUiContainer>
                                    <FlexRow justify="space-between" align="center">
                                        <StyledText
                                            as="span"
                                            size={FONT_SIZES.SIMPLE_BIG}
                                            weight={FONT_WEIGHTS.REGULAR}
                                        >
                                            2
                                        </StyledText>
                                        <BaseButtonBar>
                                            <CircleStyledButton>
                                                <AddIcon size="25px"/>
                                            </CircleStyledButton>
                                            <CircleStyledButton>
                                                <UpArrowIcon size="20px"/>
                                            </CircleStyledButton>
                                            <CircleStyledButton>
                                                <DownArrowIcon size="20px"/>
                                            </CircleStyledButton>
                                            <CircleStyledButton>
                                                <DeleteIcon size="20px"/>
                                            </CircleStyledButton>
                                        </BaseButtonBar>

                                    </FlexRow>
                                </TermUiContainer>
                            </TermRowHeader>

                            <div>
                                <TermUiContainer>
                                    <FlexRow gap="50px" justify="space-between" align="center">
                                        <TextAreaWithCounter
                                            placeholder="Term"
                                            maxLength={150}
                                            value={text}
                                            onChange={setText}
                                        />
                                        <TextAreaWithCounter
                                            placeholder="Definition"
                                            maxLength={150}
                                            value={text}
                                            onChange={setText}
                                        />
                                    </FlexRow>
                                </TermUiContainer>
                            </div>
                        </TermRow>
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
                    <ModuleSettingsModal
                        opened={openedSettingsModal} onClose={onCloseSettingsModal}
                    />


                </FlexCol>

            }
        />
    )
}

const TermRow = styled(FlexCol)`
    width: 100%;
    background-color: white;
    border-radius: var(--base-item-border-radius);
`

const TermUiContainer = styled.div`
    padding: 12px;
`

const TermRowHeader = styled.div`
    border-bottom: 1px solid var(--gray-light);
`

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
    background-color: white;

    &:hover {
        background-color: white;

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