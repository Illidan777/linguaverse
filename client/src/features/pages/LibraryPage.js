import styled from "styled-components";
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../components/text";
import {Outlet} from "react-router";
import {RoutingLink} from "../../components/button/style";
import withPathBasedSelectableChild from "../../components/hoc/withPathBasedSelectableChild";
import {AssemblyTab, AssemblyTabs} from "../../components/tab/style";
import DashboardPageLayout from "../../components/layout/page";

// Menu item dictionary: navigation path, option label name and svg icon React Component
const LIBRARY_TAB_ITEMS = [
    {
        path: "/library/modules",
        name: "Modules",
    },
    {
        path: "/library/folders",
        name: "Folders",
    },
]

const LibraryPage = () => {
    const tabItems = LIBRARY_TAB_ITEMS.map((item, index) =>
        <LibraryNavigationTab item={item} key={index}/>
    )

    const meta = (
        <>
            <meta name="description"
                  content="Explore and learn terms with our library of modules and folders. Create lists and enhance your knowledge with an intuitive interface for working with terms."/>
            <meta name="keywords"
                  content="library, modules, terms, folders, educational materials, learning app, term list"/>
            <meta name="robots" content="index, follow"/>
            <title>Library - Learning Modules and Terms</title>
        </>
    )
    return (
        <DashboardPageLayout
            meta={meta}
            grayBackground
            header={
                <>
                    <StyledText
                        as="h2"
                        size={FONT_SIZES.TITLE_MEDIUM}
                        weight={FONT_WEIGHTS.SUPER_BOLD}
                    >
                        Your library
                    </StyledText>
                    <LibraryNavigationBar>
                        <AssemblyTabs>
                            {tabItems}
                        </AssemblyTabs>
                    </LibraryNavigationBar>
                </>
            }
            content={
                <Outlet/>
            }
        />
    )
}

const LibraryNavigationBar = styled.div`
    position: relative;

    &:before {
        background: var(--gray);
        content: " ";
        position: absolute;
        left: 0;
        right: 1px;
        bottom: 0;
        height: 2px;
    }
`

const LibraryNavigationTab = ({item}) => {
    const SelectableItem = withPathBasedSelectableChild(AssemblyTab, item.path);
    return (
        <SelectableItem
            as={RoutingLink}
            to={item.path}
            {...item}
        >
            <StyledText
                as="span"
                size={FONT_SIZES.SIMPLE_SMALL}
                weight={FONT_WEIGHTS.REGULAR}
            >
                {item.name}
            </StyledText>
        </SelectableItem>
    );
}

export default LibraryPage