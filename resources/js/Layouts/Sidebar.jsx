import React, { useState } from 'react';
import Menu from "@/Utils/Menu"
import { Link, usePage } from "@inertiajs/react";
import * as Icons from "@tabler/icons-react";
import { Transition } from '@headlessui/react';
import LinkItemDropdown from '@/Components/LinkItemDropdown';

export default function Sidebar({sidebarOpen = false, isMobile = false}) {

    // define props
    const { auth } = usePage().props;
    const menuNavigation = auth.menu;
    console.log(menuNavigation);

    // get menu from utils
    // const menuNavigation = Menu();

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

    const getIconComponent = (name) => {
        const Component = Icons[name];
        
        return Component ? <Component size={20} /> : null;
    }

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
                                    <Link className={'menu-item duration-700 ease-in-out text-nowrap ' + (item.active ? 'active' : '')} href={item.href}>
                                        {item.icon ? getIconComponent(item.icon) : <IconCategory size={20} />} 
                                        { (sidebarOpen || sidebarOpenTemp ) && item.title }
                                    </Link>
                                ) : (
                                   <LinkItemDropdown item={item} 
                                        sidebarOpen={sidebarOpen} 
                                        sidebarOpenTemp={sidebarOpenTemp} 
                                        toggleSubmenu={() => toggleSubmenu(index)} 
                                        getIconComponent={getIconComponent}
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
