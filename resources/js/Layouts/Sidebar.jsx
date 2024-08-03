import React, { useState } from 'react';
import Menu from "@/Utils/Menu"
import { Link, usePage } from "@inertiajs/react";
import { Transition } from '@headlessui/react';
import LinkItemDropdown from '@/Components/LinkItemDropdown';
import GetIcons from '@/Utils/Icons';

export default function Sidebar({sidebarOpen = false, isMobile = false}) {

    const { url, props } = usePage();
    const menuNavigation = props.auth.menu;
    
    const [openSubmenus, setOpenSubmenus] = useState({});
    const [sidebarOpenTemp, setSidebarOpenTemp] = useState(false);

    const toggleSubmenu = (index) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleMouseEnter = () => {
        setSidebarOpenTemp(true);
    };

    const handleMouseLeave = () => {
        setSidebarOpenTemp(false);
    };

    const isActive = href => url.startsWith(href);

    const sideBarClass = `relative rounded-br-xl p-4 bg-base-300 md:block overflow-y-auto shadow h-screen transition-all duration-300 ease-in-out ${(sidebarOpen || sidebarOpenTemp) ? 'w-56' : 'w-24'}`;
    const sideBarMobileClass = `fixed top-0 left-0 z-50 w-56 h-full rounded-br-xl p-3 bg-base-300 overflow-y-auto shadow h-screen transition-all duration-300 ease-in-out ${(sidebarOpen) ?'translate-x-0 opacity-100' : '-translate-x-full'} `;

    return (
        <aside 
            className={(isMobile ? sideBarMobileClass : sideBarClass)}
            {...(!sidebarOpen && { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave })}
            >
            <>
                <div className="text-xl text-center font-bold mb-4 bg-base-100 rounded-xl py-3 px-2 tracking-widest">
                    { (sidebarOpen || sidebarOpenTemp ) ?  'Dashzore' : 'Dz'}
                </div>
                <ul className="menu menu-md rounded-box duration-300 ease-out">
                    {menuNavigation.map((menu, index) => (
                        <React.Fragment key={index}>
                        { (sidebarOpen || sidebarOpenTemp ) && <li className="menu-title text-nowrap">{menu.title}</li> }
                        {menu.children && menu.children.map((item, index) => (
                            <li key={index}>
                                {!item.children ? (
                                    <Link className={'menu-item duration-700 ease-in-out text-nowrap ' + (isActive(item.href) ? 'active' : '')} href={item.href}>
                                        {item.icon ? <GetIcons name={item.icon} /> : <IconCategory size={20} />} 
                                        { (sidebarOpen || sidebarOpenTemp ) && item.title }
                                    </Link>
                                ) : (
                                   <LinkItemDropdown item={item} 
                                        sidebarOpen={sidebarOpen} 
                                        sidebarOpenTemp={sidebarOpenTemp} 
                                        toggleSubmenu={() => toggleSubmenu(index)} 
                                        isActive={isActive}
                                        isOpenSubMenus={openSubmenus[index]} />
                                )}
                            </li>
                            )
                        )}
                        </React.Fragment>
                    ))}
                </ul>
            </>
        </aside>
    );
}
