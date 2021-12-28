import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './user/Signin';

const Routers = () => {

    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element = {<SignIn/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
