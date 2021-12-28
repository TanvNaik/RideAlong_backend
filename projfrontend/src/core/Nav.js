import React from 'react'

const Nav = () => {
    return (
        <div className='nav'>
            <h1 className="rideAlong">
                <img src='https://p.kindpng.com/picc/s/352-3525571_cars-logo-for-website-hd-png-download.png' className='logo'/> 
                RideAlong
            </h1>
            <ul className='navList'>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Sign Up</a></li>
            </ul>
        </div>
    )
}

export default Nav
