import { useState, useEffect } from 'react';
import api from '../../service';
import pic from '../../images/pdp.png'
import { useNavigate } from 'react-router-dom';
import {
    NotificationsNoneOutlined
} from '@mui/icons-material'

const Navbar = () => {
    const history = useNavigate();
    const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
	};
    const [user,setName]=useState({
        name:"",
        prename:""
    })
    
        
    useEffect(
		() => {
           api.get('api/user',header).then((response)=> {
               if (response.status==200) {
                   console.log(response.data)
                   user.name=response.data.name
                   user.prename=response.data.prename
                   setName({...user})
               }
               else {
                history('/login')
               }
           }) 
        },[setName])

    return ( <div className="Navbar">
        <nav className="welcomebar">
            <div className="TopLeft">
                <h3 className="WelcomeText"><span>Hello</span> <span className="font-bold"> {user.name}</span><span>, welcome back!</span></h3>
            </div>
            <div className="TopRight">
                <div className="Bell mr-52">
            <NotificationsNoneOutlined/>
            </div>
            <div className="Profile rounded-lg">
                <img className="w-10 rounded-md  mr-8"src={pic} alt=""/>
                <h3 className="Username mt-2">{user.name} {user.prename}</h3>
            </div>
            </div>
        </nav>
    </div> );
}
 
export default Navbar;