import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="My Profile" />

            <div className="flex flex-col md:flex-row gap-4 w-full">

            <Card className='w-full md:w-1/2'>
                <Card.Header>
                    <h2 className="card-title text-2xl font-bold">Profile</h2>
                </Card.Header>
                <Card.Body>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </Card.Body>
            </Card>

            <Card className='w-full md:w-1/2'>
                <Card.Header>
                    <h2 className="card-title text-2xl font-bold">Password</h2>
                </Card.Header>
                <Card.Body>
                    <UpdatePasswordForm className="max-w-xl" />
                </Card.Body>
            </Card>
            </div>
        </AppLayout>
    );
}
