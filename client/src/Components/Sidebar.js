import {
	NotificationsNone,
	Person,
	Store,
	Timeline,
	PermIdentity,
	Storefront,
	ShoppingCart,
	Inventory,
	MailOutline,
	DynamicFeed,
	ChatBubbleOutline,
	WorkOutline,
	Report,
	Settings
} from '@mui/icons-material';
import { useState } from 'react';
import {Link} from 'react-router-dom'

const Sidebar = () => {


	return (<>
		
			
			
			<div className="Sidebar scrollbar" >
				<div className="Sidebartop">
					<div className="topLeft">
						<span className="logo">TechMyService</span>
					</div>
				</div>
				<div className="sidebarMenu ">
				<div className="submenu">
				<ul class="sidebarList">
				<li class="sidebarListItem">
					<Link  to="/Profile">
						<Person className="sidebarIcon" />
						Profile
						</Link>
					</li>
					<li class="sidebarListItem">
					<Link  to="/Profile">
						<NotificationsNone className="sidebarIcon"/>
						Notifications
					</Link>
					</li>
					<li class="sidebarListItem">
					<Link  to="/Profile">
						<Settings className="sidebarIcon" />
						Settings
					</Link>
					</li>
					
					
					</ul>
			</div>
			
			<div className="submenu">
			<ul class="sidebarList">
					<li className="sidebarListItem">
					<Link  to="/Drivers">
						<PermIdentity className="sidebarIcon" />
						Drivers
						</Link>
					</li>
					
					<li className="sidebarListItem">
					<Link  to="/Services">
						<Store className="sidebarIcon" />
						Services
						</Link>
					</li>

					<li className="sidebarListItem">
					<Link  to="/Orders">
						<ShoppingCart className="sidebarIcon" />
						Orders
						</Link>
					</li>
					<li className="sidebarListItem">
					<Link  to="/Packages">
						<Inventory className="sidebarIcon" />
						Packages
						</Link>
					</li>
				</ul>
			</div>
			
			<div className="submenu">
			<ul class="sidebarList">
					<li className="sidebarListItem">
					<Link  to="/Profile">
						<MailOutline className="sidebarIcon" />
						Mail
						</Link>
					</li>
					
					<li className="sidebarListItem">
					<Link  to="/Profile">
						<DynamicFeed className="sidebarIcon" />
						Feedback
						</Link>
					</li>
					<li className="sidebarListItem">
					<Link  to="/Profile">
						<ChatBubbleOutline className="sidebarIcon" />
						Messages
						</Link>
					</li>
					</ul>
			</div>
			
			<div className="submenu">
			<ul class="sidebarList">
					<li className="sidebarListItem">
					<Link  to="/Profile">
						<WorkOutline className="sidebarIcon" />
						Manage
						</Link>
					</li>
					
					<li className="sidebarListItem">

					<Link  to="/Profile">
						<Timeline className="sidebarIcon" />
						Analytics
						</Link>
					</li>
					<li className="sidebarListItem">
					<Link  to="/Profile">
						<Report className="sidebarIcon" />
						Reports
						</Link>
					</li>
				</ul>
				
			</div>
			</div>
			</div>
		</>
	);
};

export default Sidebar;
