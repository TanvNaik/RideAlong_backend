import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import AddCity from './admin/AddCity';
import DeleteCity from './admin/DeleteCity';
import UserVerification from './admin/UserVerification';
import AdminDashboard from './user/AdminDashboard';
import ChooseRole from './user/ChooseRole';
import PostRide from './user/PostRide';
import SignIn from './user/Signin';
import Signup from './user/Signup';

const Routers = () => {

    
    return (

        // implement admin routes, protected routes and private routes
        <BrowserRouter>
            <Switch>
                <Route path="/" exact element = {<SignIn/>} />
                <Route path="/login" exact element = {<SignIn/>} />
                <Route path="/signup" exact element= {<Signup/>}/>
                <Route path="/add-city" exact element={<AddCity/>}/>
                <Route path="/choose-role" exact element={<ChooseRole/>} />
                <Route path="/post-ride" exact element={<PostRide/>} />
                <Route path="/admin-dashboard" exact element={<AdminDashboard/>} />
                <Route path="/delete-city" exact element={<DeleteCity/>} />
                <Route path="/user-verification" exact element={<UserVerification/>} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routers
