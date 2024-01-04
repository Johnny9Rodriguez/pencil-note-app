import React from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const Footer = () => {
    const dispatch = useDispatch();

    return (
        <footer className='mt-6 bg-black'>
            <div
                className='grid grid-cols-2 grid-rows-2 place-items-center text-sm w-full h-full px-2 text-white text-opacity-50 
                sm:flex sm:justify-end sm:items-center sm:px-12 sm:py-2 sm:gap-5'
            >
                <p>&copy;2023 Joe Pytlik</p>
                <a
                    href='https://joepytlik.de'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-brightTeal'
                >
                    www.joepytlik.de
                </a>
                <button
                    className='text-2xl hover:text-brightTeal mb-4 sm:mb-0' 
                    onClick={() => dispatch(setModal(modalTypes.Contact))}
                >
                    <Icon icon='material-symbols:mail-sharp' />
                </button>
                <a
                    href='https://github.com/Johnny9Rodriguez'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-2xl hover:text-brightTeal mb-4 sm:mb-0'
                >
                    <Icon icon='mdi:github' />
                </a>
            </div>
        </footer>
    );
};
