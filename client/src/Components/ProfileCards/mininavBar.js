import { Settings, Help, Person } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const MininavBar = () => {
	const pathname = useLocation();
	console.log(pathname);

	return (
		<div className="w-80 mt-2 h-14  flex shadow-lg rounded-lg bg-slate-800">
			<div className=" flex my-auto mx-auto justify-between w-3/4 	">
				<NavLink
					to="/Profile"
					className={`flex px-2 flex-col items-center no-underline ${pathname.pathname.endsWith('Profile') &&
						'border-b-2 border-white '} `}
				>
					<Person className={`text-white`} />
					<span className="text-white">Profile</span>
				</NavLink>
				<NavLink
					to="/Profile/Setting"
					className={`flex px-2 flex-col items-center no-underline ${pathname.pathname.endsWith('Setting') &&
						'border-b-2 border-white '} `}
				>
					<Settings className="text-white" />
					<span className="text-white">Setting</span>
				</NavLink>
				<NavLink
					to="/Profile/Help"
					className={`flex px-2 flex-col items-center no-underline ${pathname.pathname.endsWith('Help') &&
						'border-b-2 border-white '} `}
				>
					<Help className="text-gray-50" />
					<span className="text-gray-50">Help</span>
				</NavLink>
			</div>
		</div>
	);
};

export default MininavBar;
