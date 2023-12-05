import React from 'react'
import { useSelector } from 'react-redux';
import { NoteCard } from './NoteCard';
import { Icon } from '@iconify/react';

export const NoteSelection = () => {
    const notes = useSelector((state) => state.noteData.notes);
    const selected = useSelector((state) => state.noteData.selectedNote);

    return (
        <div className='note-selection flex flex-col items-center gap-1 p-1 bg-black bg-opacity-20'>
            {notes.map((note) => (
                <NoteCard key={note.id} id={note.id} title={note.title} content={note.content} selected={note.id === selected.id}/>
            ))}
            <button
                className='border border-white text-white mx-auto my-3 px-3 py-1 hover:text-brightTeal hover:border-brightTeal'>
                <Icon icon="mdi:add-bold" />
            </button>
        </div>
    )
}
