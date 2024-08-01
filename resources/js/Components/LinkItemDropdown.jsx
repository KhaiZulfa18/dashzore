import React, { Fragment, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { clsx } from 'clsx';
import { Transition } from '@headlessui/react';

export default function LinkItemDropdown({item, sidebarOpen, sidebarOpenTemp, isOpenSubMenus = false, toggleSubmenu, ...props}) {

    const subDetailActive = item.subdetails ? item.subdetails.some(subdetail => subdetail.active) : false;

    return (
        <>
            {(sidebarOpen || sidebarOpenTemp ) ? (
                <React.Fragment>
                <span className={`menu-dropdown-toggle duration-700 ease-in-out text-nowrap ${( isOpenSubMenus || subDetailActive ) ? 'menu-dropdown-show' : ''}`} onClick={toggleSubmenu}>
                    {item.icon ? item.icon : <IconCategory size={20} />} 
                    { (sidebarOpen || sidebarOpenTemp ) && item.title }
                </span>
                <Transition
                    show={( isOpenSubMenus || subDetailActive ) ?? false}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <ul className={`menu-dropdown duration-300 ease-in-out ${( isOpenSubMenus || subDetailActive ) ? 'menu-dropdown-show' : ''} `}>
                        {item.subdetails.map((child, childIndex) => (
                            <li key={childIndex} className="py-1">
                                <Link className={'menu-item ' + (child.active ? 'active' : '')} href={child.href}>
                                    {child.icon && child.icon } 
                                    { (sidebarOpen || sidebarOpenTemp ) && child.title }
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Transition>
                </React.Fragment>
            ) : (
                <Link className="menu-item duration-700 ease-in-out text-nowrap" href={item.href}>
                    {item.icon ? item.icon : <IconCategory size={20} />} 
                </Link>
            )}
        </>
    )
}
