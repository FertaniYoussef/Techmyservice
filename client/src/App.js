import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login";
import Home from "./Pages/Home"
import Sidebar from "./Components/Sidebar"
import Packages from './Pages/Packages';
import Orders from './Pages/Orders';
import Service from './Pages/Service';
import Drivers from './Pages/Drivers';
import Calendar from './Pages/Calendar'


function App() {
  
  return (
    <div className="App">
    <Router>
          <Routes>
            <Route element={<Sidebar/>}>
            <Route exact path="/" element = {<Home/>}/>
            <Route exact path="/Packages" element= {<Packages/>}/>
            <Route exact path="/Orders" element= {<Orders/>}/>
            <Route exact path="/Services" element={<Service/>}/>
            <Route exact path="/Drivers/Calendar" element={<Calendar/>}/>
            <Route exact path="/Drivers" element= {<Drivers/>}/>
            </Route>
            <Route exact path="/login" element= {<Login/>}/> 
          </Routes>
    </Router>
    </div>
  );
}

export default App;
