import React from 'react'
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const ContactModal = () => {
    const dispatch = useDispatch();

    return (
        <div className='flex flex-col w-96 m-auto mt-32 bg-white'>
            <div id='modal-header' className='modal-header flex justify-between w-full px-5 py-2'>
                <h2 className='text-2xl text-white'>Contact</h2>
                <button
                    className='text-white text-2xl hover:text-brightTeal'
                    onClick={() => dispatch(setModal(modalTypes.None))}
                >
                    <Icon icon="material-symbols:close" />
                </button>
            </div>
            <form action="" className='contact flex flex-col gap-3 px-5 py-3'>
                <input
                    type="text"
                    name="contact-name"
                    className='px-1 w-full border border-darkTeal focus:outline-none'
                    placeholder='Name'
                    spellCheck='false' />
                <input
                    type="email"
                    name="contact-mail"
                    className='px-1 w-full border border-darkTeal focus:outline-none'
                    placeholder='E-Mail'
                    spellCheck='false' />
                <textarea 
                    name="contact-msg"
                    className='h-40 px-1 w-full border border-darkTeal focus:outline-none'
                    placeholder='Message'
                    maxLength={5000}
                    spellCheck='false' />
                <button
                    type='submit'
                    onClick={(e) => e.preventDefault()}
                    className='flex justify-center items-center text-2xl p-0.5 text-white bg-darkTeal hover:bg-brightTeal'>
                    <Icon icon="material-symbols-light:send" />
                </button>
            </form>
        </div>
    )
}
