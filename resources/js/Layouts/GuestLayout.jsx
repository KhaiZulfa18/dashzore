import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300">
            <div className="flex flex-col items-center mb-8">
                <Link href="/">
                    <ApplicationLogo className="w-24 h-24 fill-current text-gray-500 transform hover:scale-110 transition duration-300 ease-in-out" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-6 py-8 bg-white shadow-lg rounded-lg overflow-hidden transform hover:shadow-xl transition duration-300 ease-in-out">
                {children}
            </div>
        </div>
    );
}