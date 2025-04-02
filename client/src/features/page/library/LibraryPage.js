// External Libraries
import styled from "styled-components";
import {Outlet} from "react-router"; // Handles the nested routing outlet

// UI Components
import {FONT_SIZES, FONT_WEIGHTS, StyledText} from "../../../components/text";
import {RoutingLink} from "../../../components/button/style";
import withPathBasedSelectableChild from "../../../components/hoc/withPathBasedSelectableChild";
import {AssemblyTab, AssemblyTabs} from "../../../components/tab/style";
import DashboardPageLayout from "../../../components/layout/page";

/**
 * Constant for Library Tab Items
 * Holds path and label for each navigation tab in the library section.
 */
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

/**
 * LibraryPage Component
 * This component renders the library page layout with navigation tabs and content section.
 * It uses the DashboardPageLayout to structure the page with meta tags, header, and content.
 * The content section is dynamically rendered using the <Outlet /> from React Router.
 */
const LibraryPage = () => {
    // Map through the LIBRARY_TAB_ITEMS and create navigation tabs for each item
    const tabItems = LIBRARY_TAB_ITEMS.map((item, index) =>
        <LibraryNavigationTab item={item} key={index}/>
    )

    // Meta tags for SEO and page information
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
                            {tabItems} {/* Render tab items */}
                        </AssemblyTabs>
                    </LibraryNavigationBar>
                </>
            }
            content={
                <Outlet/> // Dynamically load nested route content here
            }
        />
    )
}

/**
 * LibraryNavigationTab Component
 * This component renders a single tab within the library navigation bar.
 * It uses the `withPathBasedSelectableChild` HOC to wrap the tab component with path-based selection logic.
 */
const LibraryNavigationTab = ({item}) => {
    // Create a SelectableItem component by wrapping the AssemblyTab with selection logic
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

/**
 * Styled component for the library navigation bar
 * Applies a styled div with a bottom border separator to the navigation bar.
 */
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

export default LibraryPage