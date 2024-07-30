import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { IconPencil, IconTrash } from '@tabler/icons-react';

export default function index({auth, users}) {
    return (
        <AppLayout>
            <Head title="User" />

            <Card className='bg-gray-50 pb-6'>
                <Card.Header className='justify-between'>
                    <h2 className="card-title text-2xl font-bold">User</h2>
                </Card.Header>
                <Card.Body>
                    <div className="flex justify-between mb-2">
                        <div className='card-actions'>
                            <Button className={'btn btn-sm btn-primary text-white'}>Add User</Button>
                        </div>
                        <TextInput className={`py-1 rounded-2xl focus:border-violet-400 focus:ring-violet-50`} placeholder="Search..." />
                    </div>
                    <Table>
                        <Table.Header className='bg-slate-200'>
                            <tr className='border-slate-400 '>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </Table.Header>
                        <Table.Body>
                            {users.data.map((user, index) => (
                                <Table.Row>
                                    <Table.Cell>{index + 1}</Table.Cell> 
                                    <Table.Cell>{user.name}</Table.Cell> 
                                    <Table.Cell>{user.email}</Table.Cell> 
                                    <Table.Cell>
                                        {user.roles.map((role) => (
                                            <span className='badge badge-primary'>{role.name}</span>
                                        ))}
                                    </Table.Cell> 
                                    <Table.Cell className='text-center'>
                                        <div className='flex gap-2 justify-end'>
                                            <Button className={'btn btn-sm btn-accent'}>
                                                <IconPencil color='white' size={20}/>
                                            </Button>
                                            <Button className={'btn btn-sm btn-error'}>
                                                <IconTrash color='white' size={20}/>
                                            </Button>   
                                        </div>
                                    </Table.Cell> 
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Pagination links={users.meta.links} align="r"/>
                </Card.Body>
            </Card>

                {/* <div class="card bg-base-100 shadow-xl text-white">
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
                </div> */}
        </AppLayout>
    );
}
