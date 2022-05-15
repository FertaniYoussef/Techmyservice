import Navbar from '../Components/Navbar';
import api from '../service';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ImageCard from '../Components/ProfileCards/ImageCard';
import ProfileDetails from '../Components/ProfileCards/ProfileDetails';
import ProfileSettings from '../Components/ProfileCards/ProfileSettings'
import MininavBar from '../Components/ProfileCards/mininavBar';
import Help from '../Components/ProfileCards/Help';
const Profile = () => {
	const location = useLocation();
	const history = useNavigate();
	const auth = localStorage.getItem('auth-token');
	const header = {
		headers: {
			'auth-token': auth
		}
    };
    
	const [ user, setName ] = useState([]);
    

	useEffect(
		() => {
			api.get('api/user', header).then((response) => {
				if (response.status == 200) {
					setName(response.data);
				} else {
					history('/login');
				}
			});
		},
		[ setName ]
	);

	return (
		<div className="Container ">
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<div className="welcomebar">
					<Navbar user={user} />
				</div>

				<div className="w-full flex place-content-center     h-5/6 my-auto">
					<div className=" flex flex-col	 ">
						<ImageCard user={user} />
						<MininavBar tab={1} setTab={()=>{}} />
					</div>
           			{location.pathname.endsWith('Profile') &&	<ProfileDetails user={user} />}
                       {location.pathname.endsWith('Setting') &&	<ProfileSettings user={user} />}
					   {location.pathname.endsWith('help') && <Help/>} 
				</div>
			</div>
		</div>
	);
};

export default Profile;
