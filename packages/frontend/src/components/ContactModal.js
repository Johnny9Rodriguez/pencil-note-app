import React from 'react'
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const ContactModal = () => {
    const dispatch = useDispatch();

    return (
        <div className='relative flex flex-col justify-between gap-3 w-96 h-80 m-auto mt-32 p-3 bg-white border-darkTeal border-4'>
            <button
                className='absolute right-3 top-3 text-darkTeal text-xl hover:text-brightTeal'
                onClick={() => dispatch(setModal(modalTypes.None))}
            >
                <Icon icon="oi:x" />
            </button>
            <h2 className='text-2xl font-bold'>Contact Me</h2>
            <form
                action=""
                className='flex flex-col justify-center gap-1 h-full'
            >
                <textarea 
                    name="contact-text"
                    className='h-full p-1 border border-darkTeal'
                    maxLength={10000}
                    spellCheck='false'
                    placeholder='Enter a message'
                />
                <button
                    type='submit'
                    className='flex justify-center items-center text-2xl p-1 text-white bg-darkTeal hover:text-black hover:bg-brightTeal'
                    onClick={(e) => e.preventDefault()}
                >
                    <Icon icon="material-symbols-light:send" />
                </button>
            </form>
        </div>
    )
}
