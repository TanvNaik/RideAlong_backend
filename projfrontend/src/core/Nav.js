import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated, signout } from '../authentication/helper'
const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#1FAA59" };
    } else {
      return { color: "#ffffff" };
    }
  };

const Nav = ({history}) => {
    /* const [user, setuser] = useState({
        userId: "",
        token: ""
    }) */
    
    return (
        <div className='nav'>
            <h1 className="rideAlong">
                <img src='https://p.kindpng.com/picc/s/352-3525571_cars-logo-for-website-hd-png-download.png' className='logo'/> 
                RideAlong
            </h1>
            <ul className='navList'>
                {/* <li><a href="#footer">About</a></li> */}
                <li><a href="#">Contact Us</a></li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className='nav-item'>
          <Link
            // style={currentTab(history, "/user-dashboard")}
            className='nav-link '
            to='/user-dashboard'
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className='nav-item'>
          <Link
            // style={currentTab(history, "/admin/dashboard")}
            className='nav-link '
            to='/admin-dashboard'
          >
            Dashboard
          </Link>
        </li>
      )}
                {/* { isAuthenticated() ?  ( isAuthenticated().user.role===0 ?  (
                    <li><Link to="/user-dashboard">Profile</Link></li>
                    ) 
                    :
                     (
                        <li><Link to="/admin-dashboard">Profile</Link></li>
                    )): ""
                } */}
                
                {isAuthenticated() ? (
                    <>
                        <li><Link to={"/messenger"}>Messenger</Link></li>
                        <li><Link to="/" onClick={() => {
                            signout();
                        }}>SignOut</Link></li>
                    </>
                ) 
            :
            (
                <>
                <li><Link to={"./signup"}>Sign Up</Link></li>
                <li><Link to={"../"}>Login</Link></li>
                </>

            )
            }
           

            
            </ul>
        </div>
    )
}

export default Nav
