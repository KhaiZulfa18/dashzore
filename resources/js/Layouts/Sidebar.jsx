import React, { useState } from 'react';
import Menu from "@/Utils/Menu"
import { Link, usePage } from "@inertiajs/react";
import { IconHome, IconCategory } from "@tabler/icons-react";
import { Transition } from '@headlessui/react';

const menuItems = [
    { name: 'Item 1', link: '#' },
    { 
        name: 'Parent 1', 
        icon: <IconHome size={20} />, 
        children: [
            { name: 'Submenu 1', link: '#' },
            { name: 'Submenu 2', link: '#' }
        ] 
    },
    { name: 'Item 2', link: '#' },
    { 
        name: 'Parent 2', 
        children: [
            { name: 'Submenu 1', link: '#' },
            { name: 'Submenu 2', link: '#' }
        ] 
    }
];

export default function Sidebar({sidebarOpen = false, isMobile = false}) {

    // define props
    const { auth } = usePage().props;

    // get menu from utils
    const menuNavigation = Menu();

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

    return (
        <aside className={ `top-0 left-0 sm:fixed md:relative sm:z-40 md:z-0 rounded-br-xl
            ${( sidebarOpen || sidebarOpenTemp ) ? 'w-56 z-50' : 'w-24'}
            ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
            md:block overflow-y-auto transition-all bg-base-300 shadow p-4 h-screen duration-300 ease-in-out`}
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
                        {menu.details.map((item, index) => (
                            <li key={index}>
                                {!item.subdetails ? (
                                    <Link className="menu-item duration-700 ease-in-out text-nowrap" href={item.link}>
                                        {item.icon ? item.icon : <IconCategory size={20} />} 
                                        { (sidebarOpen || sidebarOpenTemp ) && item.title }
                                    </Link>
                                ) : (
                                    (sidebarOpen || sidebarOpenTemp ) ? (
                                        <>
                                            <span className={`menu-dropdown-toggle duration-700 ease-in-out text-nowrap ${openSubmenus[index] ? 'menu-dropdown-show' : ''}`} onClick={() => toggleSubmenu(index)}>
                                                {item.icon ? item.icon : <IconCategory size={20} />} 
                                                { (sidebarOpen || sidebarOpenTemp ) && item.title }
                                            </span>
                                            <Transition
                                                show={openSubmenus[index] ?? false}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <ul className={`menu-dropdown duration-300 ease-in-out ${openSubmenus[index] ? 'menu-dropdown-show' : ''} `}>
                                                    {item.subdetails.map((child, childIndex) => (
                                                        <li key={childIndex} className="py-1">
                                                            <Link className="menu-item" href={child.link}>
                                                                {child.icon && child.icon } 
                                                                { (sidebarOpen || sidebarOpenTemp ) && child.title }
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Transition>
                                        </>
                                    ) : (
                                        <Link className="menu-item duration-700 ease-in-out text-nowrap" href={item.link}>
                                            {item.icon ? item.icon : <IconCategory size={20} />} 
                                        </Link>
                                    )
                                )}
                            </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            </>
        </aside>
    );
}
