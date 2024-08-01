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

export default function index({auth, roles, permissions}) {

    const { queryParams } = usePage().props;
    const [search, setSearch] = useState(queryParams?.search ?? '');

    const searchData = useCallback(() => {
        const updatedQueryParams = { ...queryParams };

        if (search) {
            updatedQueryParams.search = search;
        } else {
            delete updatedQueryParams.search;
        }

        router.get(route('role.index'), updatedQueryParams, {
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
        selectedPermissions: [],
        isUpdate: false,
        isOpen: false,
    });

    const setselectedPermissions = (value) => {
        setData('selectedPermissions', value);
    }

    const { delete: destroy } = useForm();

    const { showAlert } = useSweetAlert();

    transform((data) => ({
        ...data,
        selectedPermissions: data.selectedPermissions.map(permission => permission.id),
        _method : data.isUpdate === true ? 'put' : 'post'
    }))

    const saveRole = async (e) => {
        e.preventDefault();

        post(route('role.store'), {
            onSuccess: () => {
                setData({
                    id: '',
                    name: '',
                    selectedPermissions: [],
                    isUpdate: false,
                    isOpen: false,
                })
            }
        });
    }

    const updateRole = async (e) => {
        e.preventDefault();

        post(route('role.update', data.id), {
            onSuccess : () => {
                setData({
                    id: '',
                    name: '',
                    selectedPermissions: [],
                    isUpdate: false,
                    isOpen: false,
                });
            }
        })
    }
    const deleteData = async (id) => {
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
                destroy(route('role.destroy', id));

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
            <Head title="Role" />

            <Card className='bg-gray-50 pb-6'>
                <Card.Header className='justify-between'>
                    <h2 className="card-title text-2xl font-bold">Role</h2>
                </Card.Header>
                <Card.Body>
                    <div className="flex justify-between mb-2">
                        <div className='card-actions'>
                            <Button className={'btn btn-sm btn-primary text-white'} onClick={() => setData('isOpen', true)}><IconPlus size={14}/> New Role</Button>
                        </div>
                        <TextInput className={`py-1 rounded-2xl`} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <Table>
                        <Table.Header className='bg-slate-200'>
                            <tr className='border-slate-400 '>
                                <th className='w-1/12'>No</th>
                                <th className='w-3/12'>Role Name</th>
                                <th className='w-6/12'>Permission</th>
                                <th className='w-3/12'>Action</th>
                            </tr>
                        </Table.Header>
                        <Table.Body>
                            {roles.data.map((role, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{++index + (roles.meta.current_page-1) * roles.meta.per_page}</Table.Cell>
                                    <Table.Cell>{role.name}</Table.Cell> 
                                    <Table.Cell>
                                        {role.permissions.map((permission) => (
                                            <span key={permission.id} className='badge badge-outline badge-primary'>{permission.name}</span>
                                        ))}
                                    </Table.Cell> 
                                    <Table.Cell className='text-center'>
                                        <div className='flex gap-2 justify-end'>
                                            <Button className={'btn btn-sm btn-accent'} 
                                                onClick={() =>
                                                    setData({
                                                        id: role.id,
                                                        selectedPermissions: role.permissions,
                                                        name: role.name,
                                                        password: '',
                                                        isUpdate: true,
                                                        isOpen : !data.isOpen,
                                                    })
                                                } >
                                                <IconPencil color='white' size={20}/>
                                            </Button>
                                            <Button className={'btn btn-sm btn-error'} onClick={() => deleteData(role.id)}>
                                                <IconTrash color='white' size={20}/>
                                            </Button>   
                                        </div>
                                    </Table.Cell> 
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Pagination links={roles.meta.links} align="r"/>
                </Card.Body>
            </Card>

            <Modal show={data.isOpen} 
                onClose={() => setData({
                    id: '',
                    name: '',
                    selectedPermissions: [],
                    isUpdate: false,
                    isOpen: false,
                })}
                verticalAlign={'top'}
                title={`${data.isUpdate ? 'Update Role' : 'Add New Role'}`}>
                <form onSubmit={data.isUpdate === true ? updateRole : saveRole}>
                    <div className='mb-4'>
                        <label className='text-gray-700 text-sm'>Name</label>
                        <TextInput placeholder='Name' className="w-full" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} autoComplete="off" />
                    </div>
                    <div className='mb-4'>
                        <ListBox 
                            label={'Choose Permissions'}
                            data={permissions}
                            selected={data.selectedPermissions}
                            setSelected={setselectedPermissions}
                            errors={errors.selectedPermissions}/>
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
