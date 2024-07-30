import { Button } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { IconBell, IconMenu3, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Navbar({toggleSidebar, isMobile}) {
    
    const { auth } = usePage().props;

    return (
        <>
        <nav className={`bg-gray-50 text-gray-800 shadow-md rounded-b-lg md:rounded-b-xl ${isMobile ? 'top-0 left-0 w-full z-0' : ''}`}>
            <div className="navbar mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Button className="btn btn-ghost btn-square" onClick={toggleSidebar}>
                        <IconMenu3 size={20}/>
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Button className="btn btn-ghost btn-circle">
                        <IconSearch size={20}/>
                    </Button>
                    <Button className="btn btn-ghost btn-circle relative">
                        <IconBell size={20}/>
                        <span className="badge badge-xs badge-primary absolute top-0 right-0"></span>
                    </Button>
                    <div className="dropdown dropdown-end">
                        <div tabIndex="0" role="Button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-gray-50 rounded-box z-[1] mt-3 w-auto min-w-52 p-2 shadow">
                            <li className="border border-violet-500 bg-violet-500/10 rounded-xl active:bg-violet-700 selection:bg-violet-400 ">
                                <span className="text-md tracking-widest font-semibold uppercase">{auth.user.name}</span>
                            </li>
                            <li>
                                <Link href={route('profile.edit')} className="hover:text-violet-600">My Profile</Link>
                            </li>
                            <li>
                                <Link href={route('logout')} method="post" as="button" className="hover:text-red-600">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
}
