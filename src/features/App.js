import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import AppNavbar from "../components/layout/page/navbar/AppNavbar";
import AppHeader from "../components/layout/page/header/AppHeader";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import ModulesPage from "./pages/module/ModulesPage";
import FoldersPage from "./pages/folder/FoldersPage";
import {FlexRow} from "../components/layout/wrapper/position/style";

import styled from "styled-components";
import AppFooter from "../components/layout/page/footer/AppFooter";
import FolderItemPage from "./pages/folder/FolderItemPage";
import ModuleItemPage from "./pages/module/ModuleItemPage";
import ModuleEditPage from "./pages/module/ModuleEditPage";


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
                        <Route path=":id/edit" element={<ModuleEditPage/>}>

                        </Route>
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
