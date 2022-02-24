import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import AddCity from './admin/AddCity';
import DeleteCity from './admin/DeleteCity';
import UserVerification from './admin/UserVerification';
import Messenger from './chat/Messenger';
import ViewMap from './Map/ViewMap';
import CheckPayments from './Ride/CheckPayments';
import Payment from './Ride/Payment';
import ShowRideRequests from './Ride/ShowRideRequests';
import ShowRides from './Ride/ShowRides';
import AddVehicle from './user/AddVehicle';
import AdminDashboard from './user/AdminDashboard';
import CheckRideStatus from './user/CheckRideStatus';
import ChooseRole from './user/ChooseRole';
import Feedback from './user/Feedback';
import PostRide from './user/PostRide';
import SignIn from './user/Signin';
import Signup from './user/Signup';
import UpdateProfile from './user/UpdateProfile';
import UserDashboard from './user/UserDashboard';
import ViewUserProfile from './user/ViewUserProfile';

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
                <Route path="/get-rides" exact element={<ShowRides/>} />
                <Route path="/add-vehicle" exact element={<AddVehicle/>} />
                <Route path="/user-dashboard" exact element={<UserDashboard/>} />
                <Route path="/show-ride-requests" exact element={<ShowRideRequests/>} />
                <Route path="/view-profile/:viewId" exact element={<ViewUserProfile/>} />
                <Route path="/check-request-status" exact element={<CheckRideStatus/>} />
                <Route path="/checkpayments/:rideId" exact element={<CheckPayments/>} />
                <Route path="/payment/:rideId" exact element={<Payment/>} />
                <Route path="/feedback/:rideId" exact element={<Feedback/>} />
                <Route path="/viewmap/:rideId" exact element={<ViewMap/>} />
                <Route path="/messenger/:userId" exact element={<Messenger/>} />
                <Route path="/messenger" exact element={<Messenger/>} />
                <Route path="/update-profile" exact element={<UpdateProfile/>} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routers
