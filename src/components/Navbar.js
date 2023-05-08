import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidenav from "./Sidenav"
import Auto from "./Auto"
import Manual from "./Manual"

const Navbar = () => {

    return (
        <>
            <BrowserRouter>
                <Sidenav />
                <Routes>
                    <Route element={<Auto />} path="/auto" exact />
                    <Route element={<Manual />} path="/manual" exact />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Navbar