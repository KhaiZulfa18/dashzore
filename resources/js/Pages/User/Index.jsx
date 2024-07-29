import Card from '@/Components/Card';
import Table from '@/Components/Table';
import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function index({auth}) {
    return (
        <AppLayout>
            <Head title="User" />

            <Card className='bg-gray-50'>
                <Card.Header className='justify-between'>
                    <h2 className="card-title text-2xl font-bold">User</h2>
                </Card.Header>
                <Card.Body>
                    <Table>
                        <Table.Header className='bg-slate-200'>
                            <tr className='border-slate-400 '>
                                <th className='rounded-tl-lg'>Name</th>
                                <th>Admin</th>
                                <th>Members</th>
                                <th>Status</th>
                                <th>Run time</th>
                                <th className='rounded-tr-lg'>Finish date</th>
                            </tr>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <td>ClientOnboarding - Circle</td> 
                                <td>Yes</td>
                                <td>3</td>
                                <td>3</td>
                                <td>3</td>
                                <td>3</td>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Body>
            </Card>

                <div class="card bg-base-100 shadow-xl text-white">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="card-title text-2xl font-bold">Last tasks</h2>
                            <div class="text-sm text-gray-600 dark:text-gray-400">
                                <span>117 total, proceed to resolve them</span>
                            </div>
                        </div>
                    
                        <div class="overflow-x-auto">
                            <table class="table w-full">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Admin</th>
                                    <th>Members</th>
                                    <th>Status</th>
                                    <th>Run time</th>
                                    <th>Finish date</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>ClientOnboarding - Circle</td>
                                    <td>Samantha J.</td>
                                    <td>3</td>
                                    <td>
                                    <span class="badge badge-primary">In progress</span>
                                    </td>
                                    <td>6 hours</td>
                                    <td>6 Mon</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </AppLayout>
    );
}
