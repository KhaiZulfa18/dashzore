import { Head } from "@inertiajs/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

export default function AppLayout({ children }) {

    // define state sidebarOpen
    const [sidebarOpen, setSidebarOpen] = useState(
        localStorage.getItem('sidebarOpen') === 'true'
    );

    // define react hooks
    useEffect(() => {
        localStorage.setItem('sidebarOpen', sidebarOpen);
    }, [sidebarOpen])

    // define function toggleSidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // define state isMobile
    const [isMobile, setIsMobile] = useState(false);

    // define useEffect
    useEffect(() => {
        // define handle resize window
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };

        // define event listener
        window.addEventListener('resize', handleResize);

        // call handle resize window
        handleResize();

        // remove event listener
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    })


    return (
        <div className='min-h-screen flex overflow-y-auto bg-gray-300'>
            <Head title="Welcome" />
            <Sidebar sidebarOpen={sidebarOpen} isMobile={isMobile}/>
            { ( sidebarOpen && isMobile ) && (
                <div
                    className="fixed inset-0 bg-base-100 bg-opacity-50 z-40 transition-all duration-200"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div className={`flex-1 flex-col overflow-y-auto h-screen transition-all duration-300 `}>
                <Navbar toggleSidebar={toggleSidebar} isMobile={isMobile}/>
                <div className='w-full py-8 px-2 md:px-6 min-h-screen overflow-y-auto mb-14 md:mb-0 text-base-100'>
                    {children}
                </div>
            </div>
        </div>
    );
}
