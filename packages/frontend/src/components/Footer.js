import React from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const Footer = () => {
    const dispatch = useDispatch();

    return (
        <div className='flex justify-center items-center w-full h-full'>
            <div className='flex justify-between items-center p-12 w-full max-w-1024 h-full'>
                <a 
                    href="https://joepytlik.de"
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white text-opacity-50 text-md hover:text-brightTeal'
                >
                    www.joepytlik.de
                </a>
                <div className='flex gap-4'>
                    <button
                        className='text-white text-opacity-50 text-2xl hover:text-brightTeal'
                        onClick={() => dispatch(setModal(modalTypes.Contact))}
                    >
                        <Icon icon="material-symbols:mail-sharp" />
                    </button>
                    <a
                        href='https://github.com/Johnny9Rodriguez'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-white text-opacity-50 text-2xl hover:text-brightTeal'
                    >
                        <Icon icon="mdi:github" />
                    </a>
                </div>
            </div>
        </div>
    )
}
