import React from 'react'
import { Icon } from '@iconify/react';
import { NoteCard } from './NoteCard';

export const NoteSelection = () => {
    return (
        <div className='noteSelection flex flex-col items-center gap-1 p-1 bg-black bg-opacity-20'>
            <NoteCard title={'Great Idea!'} content={'Make a million dollars.'} selected={false} />
            <NoteCard title={'Another note'} content={'I have no idea.'} selected={true} />
            <NoteCard title={'Hala Madrid!'} content={'Best club in the world!'} selected={false} />
            <button
                className='border border-white text-white mx-auto my-3 px-3 py-1 hover:text-brightTeal hover:border-brightTeal'>
                <Icon icon="mdi:add-bold" />
            </button>
        </div>
    )
}
