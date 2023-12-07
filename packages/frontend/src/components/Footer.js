import React from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const Footer = () => {
    const dispatch = useDispatch();

    return (
        <div className='flex justify-end items-center gap-5 text-sm  w-full h-full px-12 text-white text-opacity-50'>
            <p>&copy;2023 Joe Pytlik</p>
            <a
                href="https://joepytlik.de"
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-brightTeal'
            >
                www.joepytlik.de
            </a>
            <button
                className='text-2xl hover:text-brightTeal'
                onClick={() => dispatch(setModal(modalTypes.Contact))}
            >
                <Icon icon="material-symbols:mail-sharp" />
            </button>
            <a
                href='https://github.com/Johnny9Rodriguez'
                target='_blank'
                rel='noopener noreferrer'
                className='text-2xl hover:text-brightTeal'
            >
                <Icon icon="mdi:github" />
            </a>
        </div>
    )
}
