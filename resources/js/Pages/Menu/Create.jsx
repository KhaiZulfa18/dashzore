import Card from "@/Components/Card";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { Select } from "@headlessui/react";
import { Head } from "@inertiajs/react";

export default function create({menus, permissions}) {

    return (
        <AppLayout>
            <Head title="Create Menu"/>

            <Card>
                <Card.Header>
                    <h2 className="card-title text-2xl font-bold">Create Menu</h2>
                </Card.Header>
                <Card.Body>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                            <label className="text-sm">Level</label>
                            <Select className={`w-full`} placeholder="Select Level">
                                <option value="0">0 (Root)</option>
                                <option value="1">1 (Menu)</option>
                                <option value="2">2 (Submenu)</option>
                            </Select>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                            <label className="text-sm">Parent</label>
                            <Select className={`w-full`} placeholder="Select Parent">
                            </Select>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                            <label className="text-sm">Title</label>
                            <TextInput className={`w-full`} placeholder="Title" />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                            <label className="text-sm">URL</label>
                            <TextInput className={`w-full`} placeholder="URL start with '/'" />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                            <label className="text-sm">Icon</label>
                            <TextInput className={`w-full`} placeholder="Icon Name" />
                            <label className="text-xs text-neutral">Icon name from tabler-icons</label>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}