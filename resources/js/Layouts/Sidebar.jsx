import { useState } from 'react';
import { Link } from "@inertiajs/react";
import { IconHome, IconChevronDown, IconMenu4, IconCategory, IconMenu2 } from "@tabler/icons-react";
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
        <aside className={ `top-0 left-0 sm:fixed md:relative sm:z-40 md:z-0 
            ${( sidebarOpen || sidebarOpenTemp ) ? 'block' : 'hidden'} 
            ${( sidebarOpen || sidebarOpenTemp ) ? 'w-56 z-50' : 'w-24'} 
            md:block overflow-y-auto transition-all bg-base-200 dark:bg-gray-800 p-4 h-screen duration-300 ease-in-out`}
            {...(!sidebarOpen && { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave })}
            >
            <>
                <div className="text-2xl text-center font-bold mb-4">
                    { (sidebarOpen || sidebarOpenTemp ) ?  'Dashzore' : 'D'}
                </div>
                <ul className="menu menu-md rounded-box duration-300 ease-out">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.children ? (
                                <Link className="menu-item duration-700 ease-in-out text-nowrap" href={item.link}>
                                    {item.icon ? item.icon : <IconCategory size={20} />} 
                                    { (sidebarOpen || sidebarOpenTemp ) && item.name }
                                </Link>
                            ) : (
                                (sidebarOpen || sidebarOpenTemp ) ? (
                                    <>
                                        <span className={`menu-dropdown-toggle duration-700 ease-in-out text-nowrap ${openSubmenus[index] ? 'menu-dropdown-show' : ''}`} onClick={() => toggleSubmenu(index)}>
                                            {item.icon ? item.icon : <IconCategory size={20} />} 
                                            { (sidebarOpen || sidebarOpenTemp ) && item.name }
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
                                                {item.children.map((child, childIndex) => (
                                                    <li key={childIndex} className="py-1">
                                                        <Link className="menu-item" href={child.link}>
                                                            {child.name}
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
                </ul>
            </>
        </aside>
    );
}
