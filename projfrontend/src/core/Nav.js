import React  from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated, signout } from '../authentication/helper'
import logo from "../l-r.png"
// const currentTab = (history, path) => {
//     if (history.location.pathname === path) {
//       return { color: "#1FAA59" };
//     } else {
//       return { color: "#ffffff" };
//     }
//   };

const Nav = ({history}) => {
    /* const [user, setuser] = useState({
        userId: "",
        token: ""
    }) 
    https://p.kindpng.com/picc/s/352-3525571_cars-logo-for-website-hd-png-download.png
    */
    
    
    return (
        <div className='nav'>
            <h1 className="rideAlong">
            <Link to={"../choose-role"} style={{"textDecoration": "None", height:"50px"}}><img src={logo} className='logo'/></Link>
                
            </h1>
            <ul className='navList'>
                {/* <li><a href="#footer">About</a></li> */}
                <li><Link to={"../contact"}>Contact Us</Link></li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className='nav-item'>
                <Link
                // style={currentTab(history, "/user-dashboard")}
                className='nav-link'
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
      {/* { isAuthenticated() ? ( isAuthenticated() && isAuthenticated().user.role===0 ?  (
        <li><Link to="/user-dashboard">Profile</Link></li>
      ) 
                    :
      (
        <li><Link to="/admin-dashboard">Profile</Link></li>
      )) : ""
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
                <li><Link to={"../signup"}>Sign Up</Link></li>
                <li><Link to={"../"}>Login</Link></li>
                </>

            )
            }
           
            </ul>
        </div>
    )
}

export default Nav