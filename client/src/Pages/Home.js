import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useState, useEffect } from 'react';
import DashboardCard01 from '../Components/cards/DashboardCard1';
import DashboardCard02 from '../Components/cards/DashboardCard2';
import DashboardCard03 from '../Components/cards/DashboardCard3';
import Login from './Login';
import WelcomeBanner from '../Components/WelcomeBanner';
import api from '../service';
import { Navigate  } from 'react-router-dom';
import DashboardCard10 from '../Components/cards/DashboardCard4';
import DashboardCard13 from '../Components/cards/DashboardCard5';
import DashboardCard07 from '../Components/cards/DashboardCard7';
const Home = () => {
    const [loggedIn,setloggedIn]=useState(false)
    const auth = localStorage.getItem('auth-token');
    let navigate = useNavigate();
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
            console.log(loggedIn);
            api.get('api/user', header).then((response) => {
                console.log(response.status)
                if (response.status == 200) {
                    user.name = response.data.name
                    user.prename = response.data.prename
                    setName({ ...user })
                    setloggedIn(true)
                    
                }
                else {
                    navigate("/login", {replace:true})
                }
                   
            }
            )
            
        
        }, [loggedIn])

    return (<>
   
    <div className="Container ">

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className='welcomebar'>
                <Navbar user={user} />
            </div>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                {/* Welcome banner */}
                <WelcomeBanner user={user} />
                <div className="grid grid-cols-12 gap-6">
                    <DashboardCard01 />
                    <DashboardCard02 />
                    <DashboardCard03 />
                    <DashboardCard10/>
                    <DashboardCard13/>
                    <DashboardCard07/>
                </div>
            </div>
        </div>
    </div>
    
    </>)

}

export default Home;