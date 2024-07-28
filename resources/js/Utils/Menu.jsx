import { usePage } from "@inertiajs/react";
import { IconFingerprint, IconMasksTheater, IconTable, IconUsersGroup } from "@tabler/icons-react";
import React from 'react'

export default function Menu() {
    // define use page
    const { url } = usePage();

    // define menu navigations
    const menuNavigation = [
        {
            title: 'Overview',
            // permissions: hasAnyPermission(['dashboard']),
            details: [
                {
                    title : 'Dashboard',
                    href : '/dashboard',
                    active: url.startsWith('/dashboard') ? true : false,
                    icon : <IconTable size={20}/>,
                    // permissions:  hasAnyPermission(['dashboard']),
                },
            ]
        },
        {
            title: 'User Management',
            // permissions: hasAnyPermission(['permission-view']) || hasAnyPermission(['role-view']) || hasAnyPermission(['user-view']),
            details : [
                {
                    title : 'User',
                    href : '/user',
                    active: url.startsWith('/user') ? true : false,
                    icon : <IconUsersGroup size={20}/>,
                    // permissions: hasAnyPermission(['permission-view']),
                },
                {
                    title : 'Access Control',
                    icon : <IconMasksTheater size={20}/>,
                    // permissions: hasAnyPermission(['user-view']),
                    subdetails: [
                        {
                            title: 'Role',
                            href: '/role',
                            icon: null,
                            active: url.startsWith('/role') ? true : false,
                            // permissions: hasAnyPermission(['user-view']),
                        },
                        {
                            title: 'Permission',
                            href: '/permission',
                            icon: null,
                            active: url.startsWith('/permission') ? true : false,
                            // permissions: hasAnyPermission(['user-view']),
                        },
                    ]
                }
            ]
        },
    ];

    return menuNavigation;
}