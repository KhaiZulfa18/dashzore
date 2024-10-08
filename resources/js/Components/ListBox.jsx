import React from 'react'
import { Listbox } from '@headlessui/react'
import { IconCheck, IconChevronDown, IconCircleDashedCheck, IconCircleDashedPlus, IconPlus } from '@tabler/icons-react';
export default function ListBox({selected, data, setSelected, label, previewText = 'chooses', errors}) {

    const preview = selected.length ?
        selected.length >= 4 ? `${selected.length} ${previewText}` :
        selected.map((item) => item.name).join(', ')
        :
        label;

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-600 text-sm'>{label}</label>
            <Listbox value={selected} onChange={setSelected} multiple by="id">
                <Listbox.Button className={'w-full px-3 py-1.5 border text-sm rounded-md focus:outline-none focus:ring-0 flex justify-between items-center gap-8 bg-white text-gray-700 focus:border-gray-200 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-gray-700 dark:border-gray-800'}>
                    {preview}
                    <IconChevronDown size={16}/>
                </Listbox.Button>
                <Listbox.Options className={' p-4 border rounded-lg flex flex-wrap gap-2 bg-gray-100 dark:border-gray-900 dark:bg-gray-950'}>
                    {data.map((item) => (
                        <Listbox.Option key={item.id} value={item}>
                            {({ selected }) => (
                                <div
                                    className='text-md cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-200 border dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 '>
                                    {selected ? <IconCircleDashedCheck className='text-green-500' size={16} /> : <IconCircleDashedPlus size={16}/>}
                                    {item.name}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}
