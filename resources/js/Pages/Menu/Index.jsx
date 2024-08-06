import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import useSweetAlert from "@/Hooks/useSwal";
import AppLayout from "@/Layouts/AppLayout";
import GetIcons from "@/Utils/Icons";
import { Button } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function index({menus, queryParams}) {

    const [search, setSearch] = useState(queryParams?.search ?? '');

    const { delete: destroy } = useForm();
    const { showAlert } = useSweetAlert();
    const deleteMenu = async (id) => {
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
                destroy(route('menu.destroy', id));

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
            <Head title="Menu"/>

            <Card>
                <Card.Header>
                    <h2 className="card-title text-2xl font-bold">Menu</h2>
                </Card.Header>
                <Card.Body>
                    <div className="flex justify-between mb-2">
                        <div className='card-actions'>
                            <Link href={route('menu.create')} className={'btn btn-sm btn-primary text-white'} ><IconPlus size={14}/> New Menu</Link>
                        </div>
                        <TextInput className={`py-1 rounded-2xl`} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <Table>
                        <Table.Header className='bg-slate-200'>
                            <tr className='border-slate-400 '>
                                <th className='w-1/12'>No</th>
                                <th className='w-2/12'>Parent</th>
                                <th className='w-1/12'>Level</th>
                                <th className='w-2/12'>Name</th>
                                <th className='w-2/12'>URL</th>
                                <th className='w-2/12'>Icon</th>
                                <th className='w-1/12'>Permissions</th>
                                <th className='w-1/12'>Action</th>
                            </tr>
                        </Table.Header>
                        <Table.Body> 
                            {menus.data.map((menu, index) => (
                                <Table.Row key={menu.id}>
                                    <Table.Cell>{++index + (menus.meta.current_page-1) * menus.meta.per_page}</Table.Cell>
                                    <Table.Cell>{menu.parent?.title}</Table.Cell>
                                    <Table.Cell>{menu.level}</Table.Cell>
                                    <Table.Cell>{menu.title}</Table.Cell>
                                    <Table.Cell>{menu.url}</Table.Cell>
                                    <Table.Cell>
                                        {menu.icon && (  
                                            <div className="flex items-center">
                                                <GetIcons name={menu.icon}/>
                                                <span className="ml-2">{menu.icon}</span>
                                            </div>
                                        ) }
                                    </Table.Cell>
                                    <Table.Cell>
                                        {menu.permissions.length > 0 && menu.permissions.map((permission, index) => (
                                            <span key={permission.id} className='badge badge-outline badge-primary whitespace-nowrap overflow-hidden text-ellipsis'>{permission.name}</span>
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-2 justify-end'>
                                            <Link href={route('menu.edit', menu.id)} className={'btn btn-sm btn-accent'} 
                                                >
                                                <IconPencil color='white' size={20}/>
                                            </Link>
                                            {menu.status == 0 && 
                                            <Button className={'btn btn-sm btn-error'} onClick={() => deleteMenu(menu.id)}>
                                                <IconTrash color='white' size={20}/>
                                            </Button>
                                            }
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Pagination links={menus.meta.links} align="r"/>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}