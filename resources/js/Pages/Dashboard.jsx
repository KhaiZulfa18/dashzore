import Card from '@/Components/Card';
import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
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
                </Card.Body>
            </Card>
        </AppLayout>
    );
}
