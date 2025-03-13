import LibraryEntity from "../../library/LibraryEntity";
import React from "react";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {FlexRow, FlexRowCenter} from "../../../components/layout/style";
import {FolderIcon, LibraryIcon} from "../../../components/icon";

const FOLDERS = [
    {
        id: 1,
        name: "Folder 1",
        objectsCount: 5,
    },
    {
        id: 2,
        name: "Folder 2",
        objectsCount: 10,
    },
    {
        id: 3,
        name: "Folder 3",
        objectsCount: 0,
    },
    {
        id: 4,
        name: "Folder 4",
        objectsCount: 7,
    },
]

const FoldersPage = () => {
    const onSearch = () => {
        console.log('Search!!');
    }

    const items = FOLDERS.map((item) => {
        const {name, objectsCount, id} = item;
        const header = <FolderItemHeader objectsCount={objectsCount}/>;
        const content = <FolderItemContent name={name}/>

        return {id, header, content};
    })

    return <LibraryEntity
        entityItems={items}
        onSearch={onSearch}
    />
}

const FolderItemContent = ({name}) => {
    return (
        <FlexRowCenter gap="10px">
            <FolderIcon/>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_BIG}
                weight={FONT_WEIGHTS.SUPER_BOLD}
            >
                {name}
            </StyledText>
        </FlexRowCenter>

    )
}

const FolderItemHeader = ({objectsCount}) => {
    return (
        <>
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.SEMI_BOLD}
            >
                {objectsCount} objects
            </StyledText>
        </>
    )
}


export default FoldersPage;