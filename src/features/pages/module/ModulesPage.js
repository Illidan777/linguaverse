import styled from "styled-components";
import {FlexCol, FlexRow, FlexRowCenter} from "../../../components/layout/wrapper/position/style";
import avatar from "../../../assets/img/avatar.jpg";
import React from "react";
import LibraryEntity from "../../library/LibraryEntity";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {CoverImage} from "../../../components/image/style";

const MODULES = [
    {
        id: 1,
        name: "Some module1",
        termsCount: 10,
        ownerAvatar: avatar,
        ownerName: "Illidan",
        groupBy: "Today"
    },
    {
        id: 2,
        name: "Some module2",
        termsCount: 10,
        ownerAvatar: avatar,
        ownerName: "Illidan",
        groupBy: "Today"
    },
    {
        id: 3,
        name: "Some modul3",
        termsCount: 10,
        ownerAvatar: avatar,
        ownerName: "Illidan",
        groupBy: "Tomorrow"
    },
    {
        id: 4,
        name: "Some modul4",
        termsCount: 10,
        ownerAvatar: avatar,
        ownerName: "Illidan",
        groupBy: "Tomorrow"
    }
]

const ModulesPage = () => {

    const groupBy = (items) => {
        return items.reduce((acc, item) => {
            const {groupBy} = item;
            if (!acc[groupBy]) {
                acc[groupBy] = [];
            }
            acc[groupBy].push(item);
            return acc;
        }, {});
    }

    const onSearch = () => {
        console.log('Search!!');
    }

    const items = MODULES.map((item) => {
        const {id, name, termsCount, ownerAvatar, ownerName, groupBy} = item;
        const header = <ModuleItemHeader
            termsCount={termsCount}
            username={ownerName}
            userAvatarSrc={ownerAvatar}
        />;
        const content = <ModuleItemContent name={name}/>

        return {id, header, content, groupBy};
    })

    return  <LibraryEntity
        entityItems={items}
        onSearch={onSearch}
        groupBy={groupBy}
    />
}

const ModuleItemContent = ({name}) => {
    return (
        <StyledText
            as="span"
            size={FONT_SIZES.SIMPLE_BIG}
            weight={FONT_WEIGHTS.SUPER_BOLD}
        >
            {name}
        </StyledText>
    )
}

const ModuleItemHeader = ({termsCount, username, userAvatarSrc}) => {
    return (
        <>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.SEMI_BOLD}
            >
                {termsCount}
            </StyledText>
            <Divider/>
            <ModuleOwnerWrapper>
                <OwnerAvatarWrapper>
                    <CoverImage src={userAvatarSrc} alt={username}/>
                </OwnerAvatarWrapper>
                <div>{username}</div>

            </ModuleOwnerWrapper>
        </>
    )
}


const Divider = styled.div`
    width: 3px;
    max-height: 100%;
    background-color: var(--gray);
`

const ModuleOwnerWrapper = styled(FlexRow)`
    gap: 10px;
`

const OwnerAvatarWrapper = styled(FlexRowCenter)`
    width: 16px;
    height: 16px;

    img {
        border-radius: 100%;
    }
`

export default ModulesPage;