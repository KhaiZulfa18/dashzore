import { Button } from "@headlessui/react";
import { IconBell, IconMenu3, IconSearch } from "@tabler/icons-react";

export default function Navbar({toggleSidebar}) {
    
    return (
        <nav className="bg-base-100 shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Button className="btn btn-ghost btn-square" onClick={toggleSidebar}>
                        <IconMenu3 size={20}/>
                    </Button>
                </div>
                <div className="flex items-center space-x-3 pr-3">
                    <button className="btn btn-ghost btn-circle">
                        <IconSearch size={20}/>
                    </button>
                    <button className="btn btn-ghost btn-circle relative">
                        <IconBell size={20}/>
                        <span className="badge badge-xs badge-primary absolute top-0 right-0"></span>
                    </button>
                    <div className="dropdown dropdown-end">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
