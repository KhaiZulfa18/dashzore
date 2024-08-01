import { forwardRef, useEffect, useRef } from 'react';
import InputError from './InputError';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, errors, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <>
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 text-gray-700 focus:border-violet-500 focus:ring-violet-200 rounded-xl shadow-sm ' +
                className
            }
            ref={input}
        />
        {errors && <InputError message={errors} className='mt-2'/>}
        </>
    );
});
