import {BrowserRouter, Route, Routes} from "react-router";
import AppNavbar from "./navbar/AppNavbar";
import AppHeader from "./header/AppHeader";


function App() {
    return (
        <BrowserRouter>
            <main>
                <AppHeader/>
                <AppNavbar/>
                <Routes>
                    {/*<Route index element={<MainPage/>}/>*/}
                    {/*<Route path="/chars/:entityId" element={<SinglePageChar/>}/>*/}
                    {/*<Route path="comics" element={<ComicsPage/>}/>*/}
                    {/*<Route path="/comics/:entityId" element={<SinglePageComics/>}/>*/}
                    {/*<Route path="*" element={<Page404/>}/>*/}
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
