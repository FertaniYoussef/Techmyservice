import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login";
import Home from "./Pages/Home"
import Sidebar from "./Components/Sidebar"
import Packages from './Pages/Packages';


function App() {
  return (
    <div className="App">
    <Router>
   <Sidebar/>
          <Routes>
            {/* <Route exact path="/" element= {<Login/>}/> */}
            <Route exact path="/" element = {<Home/>}/>
            <Route exact path="/Packages" element= {<Packages/>}/>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
