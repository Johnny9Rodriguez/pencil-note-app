import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../slices/noteDataSlice';
import { NoteCard } from './NoteCard';
import { Icon } from '@iconify/react';
import { createNote } from '../api/noteApi';

export const NoteSelection = () => {
    const notes = useSelector((state) => state.noteData.notes);
    const selected = useSelector((state) => state.noteData.selectedNote);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [hoverIndex, setHoverIndex] = useState(null);
    const [hoverDelete, setHoverDelete] = useState(null);

    const handleNoteCreation = async () => {
        const noteId = (await createNote(user.id)).noteId;

        if (noteId) {
            dispatch(add({ noteId }))
        }
    }

    useEffect(() => {
        if (notes.length === 0) {
            setHoverIndex(null);
            setHoverDelete(null);
        }
    }, [notes]);

    return (
        <div className='note-selection flex flex-col items-center gap-1 p-1 bg-black bg-opacity-20'>
            {notes.map((note, index) => (
                <NoteCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    selected={note.id === selected.id}
                    isHovered={index === hoverIndex}
                    isHoveredDelete={index === hoverDelete}
                    elementIndex={index}
                    setHoverIndex={setHoverIndex}
                    setHoverDelete={setHoverDelete}
                />))}
            <button
                className={`${notes.length > 20 ? 'hidden' : ''} border border-white text-white mx-auto my-3 px-3 py-1 hover:text-brightTeal hover:border-brightTeal`}
                onClick={handleNoteCreation}
            >
                <Icon icon="mdi:add-bold" />
            </button>
        </div>
    )
}
