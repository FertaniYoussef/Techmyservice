import { useState, useEffect } from 'react';
import SearchModal from './Navbar/SearchModal';
import Notifications from './Navbar/Notifications';
import Help from './Navbar/Help';
import UserMenu from './Navbar/Usermenu';
import api from '../service';
import { Link,Outlet,NavLink,useNavigate,useLocation  } from 'react-router-dom';

const Navbar = ({sidebarOpen,
    setSidebarOpen,user
  }) => {
    const [searchModalOpen, setSearchModalOpen] = useState(false)
    const location = useLocation();
    const {pathname}=location
    
        

    return (
      <div> <header className="sticky top-0 bg-white min-w-screen border-b border-slate-200 z-30">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 -mb-px">
      <div className="flex mt-3">
      <ol class="inline-flex items-center space-x-1 md:space-x-3 relative">
    <li class="inline-flex items-center">
    <NavLink end to="/" className={` inline-flex block text-slate-900 hover:text-slate-500 truncate transition duration-150 ${pathname === '/' && 'hover:text-slate-200'} no-underline`}>
    <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-indigo-500`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                      <path className={`fill-current text-indigo-600`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                      <path className={`fill-current text-indigo-200`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                    </svg>
                    <span className="text-sm font-medium ml-3  text-indigo-500">TechMyService</span>
                  </div>
      </NavLink>
    </li>
    <li class="inline-flex items-center absolute left-40">
    <NavLink end to="/Packages" className={` inline-flex block text-slate-900 hover:text-slate-500 truncate transition duration-150 ${pathname.includes('Packages') ? 'hover:text-slate-200' : 'hidden'} no-underline`}>
    <div className="flex items-center">
    <svg class="w-6 h-6 text-gray-400 mt-1  " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className="ml-1 text-sm font-medium  text-indigo-500">Products</span>
                  </div>
      </NavLink>
    </li>
    <li class="inline-flex items-center absolute left-40">
    <NavLink end to="/Services" className={` inline-flex block text-slate-900 hover:text-slate-500 truncate transition duration-150 ${pathname.includes('Services') ? 'hover:text-slate-200' : 'hidden'} no-underline`}>
    <div className="flex items-center">
    <svg class="w-6 h-6 text-gray-400 mt-1  " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className=" text-sm font-medium  text-indigo-500">Services</span>
                  </div>
      </NavLink>
    </li>
    <li class="inline-flex items-center absolute left-40">
    <NavLink end to="/Drivers" className={` inline-flex block text-slate-900 hover:text-slate-500 truncate transition duration-150 ${pathname.includes('Drivers') ? 'hover:text-slate-200' : 'hidden'} no-underline`}>
    <div className="flex items-center">
    <svg class="w-6 h-6 text-gray-400 mt-1  " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className=" text-sm font-medium  text-indigo-500">Drivers</span>
                  </div>
      </NavLink>
    </li>
    <li class="inline-flex items-center absolute left-60">
    <NavLink end to="/Drivers/Calendar" className={` inline-flex block text-slate-900 hover:text-slate-500 truncate transition duration-150 ${pathname.includes('Calendar') ? 'hover:text-slate-200' : 'hidden'} no-underline`}>
    <div className="flex items-center">
    <svg class="w-6 h-6 text-gray-400 mt-1  " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className=" text-sm font-medium  text-indigo-500">Calendar</span>
                  </div>
      </NavLink>
    </li>
    <li class="inline-flex items-center absolute left-40">
    <NavLink end to="/Orders" className={` inline-flex block text-slate-900 hover:text-slate-500 truncate transition duration-150 ${pathname.includes('Orders') ? 'hover:text-slate-200' : 'hidden'} no-underline`}>
    <div className="flex items-center">
    <svg class="w-6 h-6 text-gray-400 mt-1  " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className=" text-sm font-medium  text-indigo-500">Orders</span>
                  </div>
      </NavLink>
    </li>
  </ol>
</div>
        {/* Header: Right side */}
        <div className="flex items-center">

          <button
            className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${searchModalOpen && 'bg-slate-200'}`}
            onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
            aria-controls="search-modal"
          >
            <span className="sr-only">Search</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path className="fill-current text-slate-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path className="fill-current text-slate-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
          <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
          <Notifications />
          <Help />
          {/*  Divider */}
          <hr className="w-px h-6 bg-slate-200 mx-3" />
          <UserMenu user={user}/>

        </div>

      </div>
    </div>
  </header>
  </div>

  
)
}
 
export default Navbar;