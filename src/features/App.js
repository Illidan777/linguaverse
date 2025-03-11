import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import AppNavbar from "./navbar/AppNavbar";
import AppHeader from "./header/AppHeader";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/library/LibraryPage";
import ModulesPage from "./pages/library/ModulesPage";
import FoldersPage from "./pages/library/FoldersPage";
import {FlexRow} from "../components/layout/style";

import styled from "styled-components";
import AppFooter from "./footer/AppFooter";
import FolderItemPage from "./pages/library/FolderItemPage";
import ModuleItemPage from "./pages/library/ModuleItemPage";


function App() {
    return (
        <BrowserRouter>
            <AppHeader/>
            <Site>
                <AppNavbar/>
                <Main>
                    <Routes>
                        <Route index element={<HomePage/>}/>
                        <Route path="library" element={<LibraryPage/>}>
                            <Route index element={<Navigate to="modules" replace/>}/>
                            <Route path="modules" element={<ModulesPage/>}/>
                            <Route path="folders" element={<FoldersPage/>}>
                                {/*<Route path=":id" element={<FolderItemPage/>}/>*/}
                            </Route>
                        </Route>
                        {/*todo resolve problem with outlet to move it to library as sub route*/}
                        <Route path="library/folders/:id" element={<FolderItemPage />} />
                        <Route path="library/modules/:id" element={<ModuleItemPage />} />
                    </Routes>
                </Main>
            </Site>
            <AppFooter/>
        </BrowserRouter>
    );
}

const Site = styled(FlexRow)`
    min-height: 100%;
    min-width: 100%;
`

const Main = styled.main`
    height: 100%;
    width: 100%;
    max-width: 100%;
`

export default App;
