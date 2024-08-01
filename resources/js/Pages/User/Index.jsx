import Card from '@/Components/Card';
import ListBox from '@/Components/ListBox';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import useSweetAlert from '@/Hooks/useSwal';
import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

export default function index({auth, users, roles}) {

    const { queryParams } = usePage().props;
    const [search, setSearch] = useState(queryParams?.search ?? '');

    const searchData = useCallback(() => {
        const updatedQueryParams = { ...queryParams };

        if (search) {
            updatedQueryParams.search = search;
        } else {
            delete updatedQueryParams.search;
        }

        router.get(route('user.index'), updatedQueryParams, {
            replace: true,
            preserveState: true,
        });
    }, [search, queryParams]);

    useEffect(() => {
        const timerId = setTimeout(() => searchData(), 100); 

        return () => clearTimeout(timerId);
    }, [search]);

    const { data, setData, transform, post, errors} = useForm({
        id: '',
        name: '',
        email: '',
        password: '',
        selectedRoles: [],
        isUpdate: false,
        isOpen: false,
    });

    const setSelectedRoles = (value) => {
        setData('selectedRoles', value)
    }

    const { delete: destroy } = useForm();

    const { showAlert } = useSweetAlert();

    transform((data) => ({
        ...data,
        selectedRoles: data.selectedRoles.map(role => role.id),
        _method : data.isUpdate === true ? 'put' : 'post'
    }))

    const saveUser = async (e) => {
        e.preventDefault();

        post(route('user.store'), {
            onSuccess: () => {
                setData({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    selectedRoles: [],
                    isUpdate: false,
                    isOpen: false,
                })
            }
        });
    }

    const updateUser = async (e) => {
        e.preventDefault();

        post(route('user.update', data.id), {
            onSuccess : () => {
                setData({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    selectedRoles: [],
                    isUpdate: false,
                    isOpen: false,
                });
            }
        })
    }
    const deleteUser = async (id) => {
        try {
            const result = await showAlert({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
            });
    
            if (result && result.isConfirmed) {
                destroy(route('user.destroy', id));

                await showAlert({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
          console.error('Error showing alert:', error);
        }
    };
    
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
                            <Button className={'btn btn-sm btn-primary text-white'} onClick={() => setData('isOpen', true)}><IconPlus size={14}/> New User</Button>
                        </div>
                        <TextInput className={`py-1 rounded-2xl`} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <Table>
                        <Table.Header className='bg-slate-200'>
                            <tr className='border-slate-400 '>
                                <th className='w-1/12'>No</th>
                                <th className='w-3/12'>Name</th>
                                <th className='w-3/12'>Email</th>
                                <th className='w-3/12'>Role</th>
                                <th className='w-3/12'>Action</th>
                            </tr>
                        </Table.Header>
                        <Table.Body>
                            {users.data.map((user, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{++index + (users.meta.current_page-1) * users.meta.per_page}</Table.Cell>
                                    <Table.Cell>{user.name}</Table.Cell> 
                                    <Table.Cell>{user.email}</Table.Cell> 
                                    <Table.Cell>
                                        {user.roles.map((role) => (
                                            <span key={role.id} className='badge badge-outline badge-primary'>{role.name}</span>
                                        ))}
                                    </Table.Cell> 
                                    <Table.Cell className='text-center'>
                                        <div className='flex gap-2 justify-end'>
                                            <Button className={'btn btn-sm btn-accent'} 
                                                onClick={() =>
                                                    setData({
                                                        id: user.id,
                                                        selectedRoles: user.roles,
                                                        name: user.name,
                                                        email: user.email,
                                                        password: '',
                                                        isUpdate: true,
                                                        isOpen : !data.isOpen,
                                                    })
                                                } >
                                                <IconPencil color='white' size={20}/>
                                            </Button>
                                            <Button className={'btn btn-sm btn-error'} onClick={() => deleteUser(user.id)}>
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

            <Modal show={data.isOpen} 
                onClose={() => setData({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    selectedRoles: [],
                    isUpdate: false,
                    isOpen: false,
                })}
                verticalAlign={'top'}
                title={`${data.isUpdate ? 'Update User' : 'Add New User'}`}>
                <form onSubmit={data.isUpdate === true ? updateUser : saveUser}>
                    <div className='mb-4'>
                        <label className='text-gray-700 text-sm'>Name</label>
                        <TextInput placeholder='Name' className="w-full" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} autoComplete="off" />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 text-sm'>Email</label>
                        <TextInput type={'email'} placeholder='Email' className="w-full" value={data.email} onChange={e => setData('email', e.target.value)} errors={errors.email} autoComplete="off" />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 text-sm'>Password</label>
                        <TextInput type={'password'} placeholder='Password' className="w-full" value={data.password} onChange={e => setData('password', e.target.value)} errors={errors.password} autoComplete="off" />
                    </div>
                    <div className='mb-4'>
                        <ListBox 
                            label={'Choose Roles'}
                            data={roles}
                            selected={data.selectedRoles}
                            setSelected={setSelectedRoles}
                            errors={errors.selectedRoles}/>
                    </div>
                    <Button
                        type={'submit'}
                        className={'btn btn-sm btn-primary text-white'}>
                            Simpan
                    </Button>
                </form>
            </Modal>
        </AppLayout>
    );
}
