import React from 'react'
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const ContactModal = () => {
    const dispatch = useDispatch();

    return (
        // <div className='relative flex flex-col justify-between gap-3 w-96 h-80 m-auto mt-32 p-3 bg-white border-darkTeal border-4'>
        //     <button
        //         className='absolute right-3 top-3 text-darkTeal text-xl hover:text-brightTeal'
        //         onClick={() => dispatch(setModal(modalTypes.None))}
        //     >
        //         <Icon icon="oi:x" />
        //     </button>
        //     <h2 className='text-2xl font-bold'>Contact Me</h2>
        //     <form
        //         action=""
        //         className='flex flex-col justify-center gap-1 h-full'
        //     >
        //         <textarea 
        //             name="contact-text"
        //             className='h-full p-1 border border-darkTeal'
        //             maxLength={10000}
        //             spellCheck='false'
        //             placeholder='Enter a message'
        //         />
        //         <button
        //             type='submit'
        //             className='flex justify-center items-center text-2xl p-1 text-white bg-darkTeal hover:text-black hover:bg-brightTeal'
        //             onClick={(e) => e.preventDefault()}
        //         >
        //             <Icon icon="material-symbols-light:send" />
        //         </button>
        //     </form>
        // </div>
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
            {/* <div className='px-5 pt-1 pb-2 mt-3'>
                <p className='text-md mb-2'>
                    Type <span className='text-brightCrimson'>delete</span> below to confirm. This action is irreversible and will erase all your data.
                </p>
            </div>
            <hr className='m-0 p-0' /> */}
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
