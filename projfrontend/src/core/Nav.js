import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated, signout } from '../authentication/helper'


const Nav = () => {
    /* const [user, setuser] = useState({
        userId: "",
        token: ""
    }) */
    const user = isAuthenticated();
    return (
        <div className='nav'>
            <h1 className="rideAlong">
                <img src='https://p.kindpng.com/picc/s/352-3525571_cars-logo-for-website-hd-png-download.png' className='logo'/> 
                RideAlong
            </h1>
            <ul className='navList'>
                <li><a href="#footer">About</a></li>
                <li><a href="#">Contact Us</a></li>
                {isAuthenticated() && (
                    
                    <li><Link to="/" onClick={() => {
                        signout();
                      }}>SignOut</Link></li>

                )}
                {!isAuthenticated() && (
                    <>
                    <li><Link to={"./signup"}>Sign Up</Link></li>
                    <li><Link to={"../"}>Login</Link></li>
                    </>

                )}
                

            </ul>
        </div>
    )
}

export default Nav
