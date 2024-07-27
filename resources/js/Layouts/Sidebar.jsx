import { useState } from 'react';
import { Link } from "@inertiajs/react";
import { IconHome, IconChevronDown, IconMenu4 } from "@tabler/icons-react";
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

export default function Sidebar({sidebarOpen = false}) {
    const [openSubmenus, setOpenSubmenus] = useState({});

    const toggleSubmenu = (index) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <aside className={'bg-base-200 dark:bg-gray-800 p-4 h-screen ' + (sidebarOpen ? 'w-64' : 'w-24')}>
            {sidebarOpen ? 
            <>
                <div className="text-2xl text-center font-bold mb-4">Dashzore</div>
                <ul className="menu menu-md rounded-box">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.children ? (
                                <Link className="menu-item" href={item.link}>
                                    {item.name}
                                </Link>
                            ) : (
                                <>
                                    <span className={`menu-dropdown-toggle ${openSubmenus[index] ? 'menu-dropdown-show' : ''}`} onClick={() => toggleSubmenu(index)}>{item.name}</span>
                                    <Transition
                                        show={openSubmenus[index] ?? false}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <ul className={`menu-dropdown ${openSubmenus[index] ? 'menu-dropdown-show' : ''} `}>
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
                            )}
                        </li>
                    ))}
                </ul>
            </>
            :
            <>
                <div className="text-2xl text-center font-bold mb-4">D</div>
                <ul className="menu menu-md rounded-box">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.children ? (
                                <Link className="menu-item tooltip tooltip-right" data-tip="Home" href={item.link}>
                                    { item.icon ? item.icon : <IconMenu4 size={24} /> }
                                </Link>
                            ) : (
                                <>
                                    <span className={`menu-dropdown-toggle tooltip tooltip-right ${openSubmenus[index] ? 'menu-dropdown-show' : ''}`} data-tip="Home" onClick={() => toggleSubmenu(index)}>
                                        { item.icon ? item.icon : <IconMenu4 size={24} /> }
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
                                        <ul className={`menu-dropdown ${openSubmenus[index] ? 'menu-dropdown-show' : ''} `}>
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
                            )}
                        </li>
                    ))}
                </ul>
            </>
            }
        </aside>
    );
}
