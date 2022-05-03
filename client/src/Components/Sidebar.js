import { StoreOutlined, PermIdentity, ShoppingBasketOutlined, DashboardOutlined, Redeem, AnalyticsOutlined, HomeOutlined } from '@mui/icons-material';

import { Link,Outlet,NavLink,useNavigate,useLocation  } from 'react-router-dom';


const Sidebar = () => {
	const location = useLocation();
	const {pathname}=location
	return (
		<>
		<div className="Sidebar scrollbar">
		<div className="flex justify-between mb-10 pr-10 sm:px-2">
		<NavLink end to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
              <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
            </svg>
          </NavLink>
			</div>
			<div className="space-y-8 mt-24">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
				
				<ul className="mt-3 px-0">
					<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/' && 'bg-slate-900'}`}>
                <NavLink end to="/" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname === '/' && 'hover:text-slate-200'} no-underline`}>
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-400 ${pathname === '/' && '!text-indigo-500'}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                      <path className={`fill-current text-slate-600 ${pathname === '/' && 'text-indigo-600'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                      <path className={`fill-current text-slate-400 ${pathname === '/' && 'text-indigo-200'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                  </div>
                </NavLink>
              </li>
			  <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('Packages') && 'bg-slate-900'}`}>
							<NavLink end to="Packages" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('Packages') && 'hover:text-slate-200'} no-underline`}>
							<div className="flex items-center">
							<svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className={`fill-current text-slate-400 ${pathname.includes('Packages') && 'text-indigo-300'}`} d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                              <path className={`fill-current text-slate-700 ${pathname.includes('Packages') && '!text-indigo-600'}`} d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                              <path className={`fill-current text-slate-600 ${pathname.includes('Packages') && 'text-indigo-500'}`} d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />
                            </svg>

							<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Products</span>
							</div>
							</NavLink>
						</li>
						<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('Services') && 'bg-slate-900'}`}>
							<NavLink end to="Services" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('Services') && 'hover:text-slate-200'} no-underline`}>
							<div className="flex items-center">
							<svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes('Services')  && 'text-indigo-500'}`} d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z" />
                      <path className={`fill-current text-slate-400 ${pathname.includes('Services')  && 'text-indigo-300'}`} d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                    </svg>

							<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Services</span>
							</div>
							</NavLink>
						</li>

						<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 rounded-lg ${pathname.includes('Drivers')  && 'bg-slate-900'}`}>
							<NavLink end to="Drivers" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('Drivers') && 'hover:text-slate-200'} no-underline`}>
							<div className="flex items-center">
							<svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className={`fill-current text-slate-600 ${pathname.includes('Drivers') && 'text-indigo-500'}`} d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                              <path className={`fill-current text-slate-400 ${pathname.includes('Drivers') && 'text-indigo-300'}`} d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                            </svg>

							<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Drivers</span>
							</div>
							</NavLink>
						</li>
						<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 rounded-lg ${pathname.includes('Orders')  && 'bg-slate-900'}`}>
							<NavLink end to="Orders" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('Bills') && 'hover:text-slate-200'} no-underline`}>
							<div className="flex items-center">
							<svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes('Orders') && 'text-indigo-500'}`} d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z" />
                      <path className={`fill-current text-slate-600 ${pathname.includes('Orders') && 'text-indigo-500'}`} d="M1 1h22v23H1z" />
                      <path className={`fill-current text-slate-400 ${pathname.includes('Orders') && 'text-indigo-300'}`} d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z" />
                    </svg>

							<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Orders</span>
							</div>
							</NavLink>
						</li>

						<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 rounded-lg ${pathname.includes('Admins')  && 'bg-slate-900'}`}>
							<NavLink end to="Admins" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('Admins') && 'hover:text-slate-200'} no-underline`}>
							<div className="flex items-center">
							<svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className={`fill-current text-slate-600 ${pathname.includes('Admins') && 'text-indigo-500'}`} d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                              <path className={`fill-current text-slate-400 ${pathname.includes('Admins') && 'text-indigo-300'}`} d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                            </svg>

							<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Admins</span>
							</div>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<Outlet />
		</>
	);
};

export default Sidebar;
