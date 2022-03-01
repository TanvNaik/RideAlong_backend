import React, {useState} from 'react'
import { Navigate } from 'react-router-dom';
import Base from '../core/Base';

const ChooseRole = () => {
    const [values, setValues] = useState({
        path: "",
        redirect: false
    })

    const handleClick = (event)=>{
        const targetRider = event.target.id === "rider"? true : false;
        console.log(targetRider)
        if(targetRider){
           setValues({...values, path: "/post-ride", redirect: true})
        }else{
            setValues({...values, path: "/get-rides", redirect: true})
        } 
    }

    const performRedirect = () =>{
        if(values.redirect){
            return <Navigate to={values.path} />
        }
    }
    return (
        <Base
        title='Choose Role'>
            <div className="role">
                <table className='role-table'>
                    <tbody>
                    <tr className='role-row'>
                        <td className='role-column'><button className='btn-submit btn-role' onClick={handleClick}id='passsenger'>Passenger</button></td>

                        <td className='role-column'><button className='btn-submit btn-role' id='rider' onClick={handleClick}>Rider</button></td>
                    </tr>
                    </tbody>
                </table>
                {performRedirect()}
            </div>
        </Base>
    )
}
export default ChooseRole;