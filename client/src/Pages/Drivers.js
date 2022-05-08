import TableDrivers from "../Components/TableDrivers"
import Navbar from '../Components/Navbar';
import api from '../service';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Calendars from './Calendar';
const Drivers = () => {
    
    const history = useNavigate();
    const auth = localStorage.getItem('auth-token');
    const header = {
        headers: {
            'auth-token': auth
        }
    };
    const [user, setName] = useState({
        name: "",
        prename: ""
    })
    
    
    
    useEffect(
        () => {
            api.get('api/user', header).then((response) => {
                if (response.status == 200) {
                    user.name = response.data.name
                    user.prename = response.data.prename
                    setName({ ...user })
                }
                else {
                    history('/login')
                }
            })
        }, [setName])
    return ( <div className="Container scrollbar">
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className='welcomebar'>
        <Navbar user={user} />
    </div> 

<div className="w-full mx-auto  scrollbar">
          
            <TableDrivers/>
    </div> 
    </div></div> );
}
 
export default Drivers;