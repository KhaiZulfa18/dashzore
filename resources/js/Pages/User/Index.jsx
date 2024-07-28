import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function index({auth}) {
    return (
        <AppLayout>
            <Head title="User" />

                <div className="max-w-full min-h-screen mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 bg-gray-900 border-b border-gray-200">
                            User
                        </div>
                    </div>
                </div>
        </AppLayout>
    );
}
