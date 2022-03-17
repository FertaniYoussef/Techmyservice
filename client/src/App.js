import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login";
import Home from "./Pages/Home"
import Sidebar from "./Components/Sidebar"
import Packages from './Pages/Packages';
import Orders from './Pages/Orders';
import Service from './Pages/Service';


function App() {
  return (
    <div className="App">
    <Router>
   <Sidebar/>
          <Routes>
            {/* <Route exact path="/" element= {<Login/>}/> */}
            <Route exact path="/" element = {<Home/>}/>
            <Route exact path="/Packages" element= {<Packages/>}/>
            <Route exact path="/Orders" element= {<Orders/>}/>
            <Route exact path="/Services" element={<Service/>}/>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
