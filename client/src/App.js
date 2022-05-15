import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Login from "./Pages/Login";
import Home from "./Pages/Home"
import Sidebar from "./Components/Sidebar"
import Packages from './Pages/Packages';
import Orders from './Pages/Orders';
import Service from './Pages/Service';
import Drivers from './Pages/Drivers';
import Calendar from './Pages/Calendar'
import Signup from './Pages/Signup';
import api from './service';
import Admins from './Pages/Admins';
import Addons from './Pages/Addons';
import Profile from './Pages/Profile';


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
            <Route exact path="/Admins" element={<Admins/>} />
            <Route exact path="/Addons" element={<Addons/>} />
            <Route exact path="/Profile" element={<Profile/>} />
            <Route exact path="/Profile/Setting"  element={<Profile/>}/>
            <Route exact path="/Profile/help"  element={<Profile/>}/>
            </Route>
         
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element= {<Login/>}/>
      
          </Routes>
    </Router>
    </div>
  );
}

export default App;
