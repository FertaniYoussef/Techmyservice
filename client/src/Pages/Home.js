import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Analytics from '../Components/Analytics';
const Home = () => {
    return ( <div className="Container">
           <Navbar/>
           <Analytics/>
    </div> );
}
 
export default Home;