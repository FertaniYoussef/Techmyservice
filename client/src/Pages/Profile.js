import Navbar from '../Components/Navbar';
import api from '../service';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ImageCard from '../Components/ProfileCards/ImageCard';
import ProfileDetails from '../Components/ProfileCards/ProfileDetails';
const Profile = () => {
    const history = useNavigate();
    const auth = localStorage.getItem('auth-token');
    const header = {
        headers: {
            'auth-token': auth
        }
    };
    const [user, setName] = useState([])
    
    
    
    useEffect(
        () => {
            api.get('api/user', header).then((response) => {
                if (response.status == 200) {
                  setName(response.data)
                }
                else {
                    history('/login')
                }
            })
        }, [setName])
    

    return (<div className="Container ">
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className='welcomebar'>
        <Navbar user={user} />
    </div> 

<div className="w-full flex  mx-auto h-5/6 my-auto">
         <ImageCard user={user}/>
            <ProfileDetails user={user}/>
          
    </div> 
    </div></div>);
}
 
export default Profile;