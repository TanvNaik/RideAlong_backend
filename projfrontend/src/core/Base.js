import React from 'react'
import Nav from './Nav'

const Base = ({
    title ="My title",
    children
}) => {

    return (
        <div>
            <Nav></Nav>
            <div className='container-main'>
                { title ? (
                    <div className='title'>
                    <h2>{title}</h2>
                </div>
                ): ""}

                
                <div className='children' >
                    {children}
                </div>
            </div>
            {/* <div className="footer" id='footer'>
                <div className="footer-text">
                © Copyright RideAlong. All Rights Reserved
                </div>
            </div> */}
        </div>
    )
}

export default Base
