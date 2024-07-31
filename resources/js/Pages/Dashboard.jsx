import Card from '@/Components/Card';
import useSweetAlert from '@/Hooks/useSwal';
import useToast from '@/Hooks/useToast';
import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {

    const { showToast } = useToast();

    const { showAlert } = useSweetAlert();

    const handleAlert = async (option) => {

        const result = await showAlert(option);

        if(result && result.isConfirmed){
            // proceed to delete
            console.log('proceed to delete');

            await showAlert({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <Card>
                <Card.Header>
                    <div className='card-title'>Dashboard</div>
                </Card.Header>
                <Card.Body>
                    <div className="flex gap-2">
                        <Button className={'btn btn-sm btn-primary'}>Primary</Button>
                        <Button className={'btn btn-sm btn-secondary'}>Secondary</Button>
                        <Button className={'btn btn-sm btn-accent'}>Accent</Button>
                        <Button className={'btn btn-sm btn-info'}>Info</Button>
                        <Button className={'btn btn-sm btn-success'}>Success</Button>
                        <Button className={'btn btn-sm btn-warning'}>Warning</Button>
                        <Button className={'btn btn-sm btn-error'}>Error</Button>
                        <Button className={'btn btn-sm btn-link'}>Link</Button>

                    </div>
                    <div className="flex gap-2 mt-2">
                        <span className="badge badge-primary badge-outline">Primary</span>
                        <span className="badge badge-secondary badge-outline">Secondary</span>
                        <span className="badge badge-accent badge-outline">Accent</span>
                        <span className="badge badge-info badge-outline">Info</span>
                        <span className="badge badge-success badge-outline">Success</span>
                        <span className="badge badge-warning badge-outline">Warning</span>
                        <span className="badge badge-error badge-outline">Error</span>
                        <span className="badge badge-link badge-outline">Link</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Button className={'btn btn-sm btn-success'} onClick={() => showToast('Success, something went right!')}>Success Toast</Button>
                        <Button className={'btn btn-sm btn-error'} onClick={() => showToast('Error, something went wrong!','error')}>Error Toast</Button>
                        <Button className={'btn btn-sm btn-primary'} onClick={() => showAlert({
                            title: 'Saved!',
                            text: 'Successfully saved data',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                        })}>Show Swal</Button>
                        <Button className={'btn btn-sm btn-info'} onClick={() => handleAlert({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'No, keep it'
                        })}>Confirmation Swal</Button>
                    </div>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}
