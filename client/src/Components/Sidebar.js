import { StoreOutlined, PermIdentity, ShoppingBasketOutlined, DashboardOutlined, Redeem, AnalyticsOutlined, HomeOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className="Sidebar scrollbar">
			<div className="Sidebartop">
				<div className="top">
					<span className="logo">LOGO</span>
				</div>
			</div>
			<div className="sidebarMenu ">
				<div className="submenu">
					<ul class="sidebarList">
						<li class="sidebarListItem">
							<Link to="/">
								<HomeOutlined className="sidebarIcon" />
								Overview
							</Link>
						</li>
						<li class="sidebarListItem">
							<Link to="/Packages">
								<DashboardOutlined className="sidebarIcon" />
								Products
							</Link>
						</li>
						<li class="sidebarListItem">
							<Link to="/Orders">
								<ShoppingBasketOutlined className="sidebarIcon" />
								Orders
							</Link>
						</li>

						<li className="sidebarListItem">
							<Link to="/Drivers">
								<PermIdentity className="sidebarIcon" />
								Drivers
							</Link>
						</li>

						<li className="sidebarListItem">
							<Link to="/Services">
								<StoreOutlined className="sidebarIcon" />
								Services
							</Link>
						</li>
						<li className="sidebarListItem">
							<Link to="/Gifts">
								<Redeem className="sidebarIcon" />
							Gifts
							</Link>
						</li>

						<li className="sidebarListItem">
							<Link to="/AnalyticsOutlineds">
								<AnalyticsOutlined className="sidebarIcon" />
								Analytics
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
