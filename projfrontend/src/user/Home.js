import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {testRoute} from "../admin/helper/adminapicalls"
import { API } from '../backend';
import Base from './Base';


const Home = () => {
/*     const [feedbacks, setFeedbacks] = useState([])
    useEffect(()=>{
        testRoute();

       axios.get(`${API}/feedbacks/user/619b398d1e3ddac55e9096b3`)
        .then(response => setFeedbacks([...feedbacks, response.data]))
        .catch(err => console.log(err))

    },[])

 */
    return (
       <Base
        title='Welcome to RideAlong'
        > 
        </Base>
    )
}

export default Home
