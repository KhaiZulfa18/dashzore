import Card from "@/Components/Card";
import SelectSearch from "@/Components/SelectSearch";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import GetIcons from "@/Utils/Icons";
import { Button, Select } from "@headlessui/react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { IconArrowBack, IconBackpack, IconCategory, IconDeviceFloppy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function create({menus, permissions}) {

    const [parentOptions, setParentOptions] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        level: '',
        parentId: '',
        title: '',
        url: '',
        icon: '',
        status: '',
        permissions: [],
    });

    const levelOptions = [
        {value: 0, label: 'Menu Section (0)'},
        {value: 1, label: 'Menu (1)'},
        {value: 2, label: 'Submenu (2)'},
    ];

    const statusOptions = [
        { value: 0, label: 'Can be Deleted' },
        { value: 1, label: 'Cannot be Deleted' },
    ];

    const permissionOptions = permissions.data.map(permission => ({value: permission.id, label: permission.name}));

    useEffect(() => {
        let filteredParentOptions = [];
        if(data.level == 1) 
            filteredParentOptions = menus.data.filter(menu => menu.level == 0).map(menu => ({value: menu.id, label: menu.title}));
        else if (data.level == 2)
            filteredParentOptions = menus.data.filter(menu => menu.level == 1).map(menu => ({value: menu.id, label: menu.title}));

        setParentOptions(filteredParentOptions);
        setData('parentId','');
    }, [data.level]);

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route('menu.store'));
    };


    return (
        <AppLayout>
            <Head title="Create Menu"/>

            <Card className='bg-gray-50 pb-6'>
                <Card.Header>
                    <h2 className="card-title text-2xl font-bold">Create Menu</h2>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit} >
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-3">
                            <label className="text-sm">Level</label>
                            <SelectSearch options={levelOptions} onChange={e => setData('level', e.value)} placeholder={'Choose Level'} value={data.level}/>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-3">
                            <label className="text-sm">Parent</label>
                            <SelectSearch options={parentOptions} onChange={e => setData('parentId', e.value)} placeholder={'Choose Parent'} value={data.parentId}/>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-3">
                            <label className="text-sm">Title</label>
                            <TextInput className={`w-full`} placeholder="Title" onChange={(e) => setData('title', e.target.value)} errors={errors.title}/>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-3">
                            <label className="text-sm">URL</label>
                            <TextInput className={`w-full`} placeholder="URL start with '/'" onChange={(e) => setData('url', e.target.value)} errors={errors.url}/>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-3">
                            <label className="text-sm">Icon</label>
                            <div className="join w-full">
                                <TextInput className={`join-item w-3/4`} placeholder="Icon Name" onChange={(e) => setData('icon', e.target.value)} errors={errors.icon}/>
                                <div className={`join-item w-1/4 bg-gray-100 border border-gray-300 shadow-sm text-gray-700 flex items-center justify-center `} >
                                    <GetIcons name={data.icon} size={20} />
                                </div>
                            </div>
                            <label className="text-xs text-neutral">Icon name from <a href="https://tabler-icons.io" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Tabler Icons</a></label>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-3">
                            <label className="text-sm">Deletion Status</label>
                            <SelectSearch options={statusOptions} onChange={e => setData('status', e.value)} placeholder={'Choose Status'} 
                                menuPosition={'fixed'}
                                menuPlacement={'auto'}/>
                            {data.status == 1 && <label className="text-xs text-neutral">You only can delete this menu from database.</label> }
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-3">
                            <label className="text-sm">Permissions</label>
                            <SelectSearch options={permissionOptions} onChange={(selected) => setData('permissions', selected.map(selected => selected.value))} isMulti placeholder={'Choose Menu Permission'} 
                                menuPosition={'fixed'}
                                menuPlacement={'auto'}/>
                            <label className="text-xs text-neutral">If permissions are left empty, the menu will be visible to all users.</label>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mr-5">
                        <Link disabled={processing} className={'btn btn-error btn-sm text-white'} href={route('menu.index')} >
                            <IconArrowBack size={20}/>
                            Back
                        </Link>
                        <Button type="submit" disabled={processing} className={'btn btn-primary btn-sm text-white'}>
                            <IconDeviceFloppy size={20}/>
                            Save
                        </Button>
                    </div>
                    </form>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}