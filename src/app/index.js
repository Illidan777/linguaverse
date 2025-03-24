import {BrowserRouter, useRoutes} from "react-router";
import {ErrorBoundary} from "react-error-boundary";

import styled from "styled-components";
import {FlexRow} from "../components/layout/wrapper/position/style";
import {Toaster} from "react-hot-toast";

import AppNavbar from "../components/layout/page/navbar/components/AppNavbar";
import AppHeader from "../components/layout/page/header/AppHeader";
import AppFooter from "../components/layout/page/footer/AppFooter";
import {BaseFallbackComponent} from "../components/layout/wrapper/boundary/fallback/base";

import {routes} from "./routes";
import ModalManager from "../components/modal/modalManager";


function AppRoutes() {
    return useRoutes(routes);
}

function App() {
    return (
        <ErrorBoundary fallback={<BaseFallbackComponent/>}>
            <BrowserRouter>
                <AppHeader/>
                <Site>
                    <AppNavbar/>
                    <Main>
                        <AppRoutes/>
                    </Main>
                </Site>
                <AppFooter/>
                <Toaster/>
                <ModalManager/>
            </BrowserRouter>
        </ErrorBoundary>
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
