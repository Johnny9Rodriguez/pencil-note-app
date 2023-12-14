import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../slices/noteDataSlice';
import { NoteCard } from './NoteCard';
import { Icon } from '@iconify/react';

export const NoteSelection = () => {
    const notes = useSelector((state) => state.noteData.notes);
    const selected = useSelector((state) => state.noteData.selectedNote);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [hoverIndex, setHoverIndex] = useState(null);
    const [hoverDelete, setHoverDelete] = useState(null);

    const handleNoteCreation = async () => {
        try {
            const data = { userId: user.id };

            const res = await fetch('http://localhost:3001/api/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            if (res.status === 201) {
                const jsonData = await res.json();
                dispatch(add({ noteId: jsonData.noteId }));
            } else {
                console.error('Failed to create note, status:', res.status);
            }
        } catch (err) {
            console.error('Error creating a new note in database.', err);
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
                className='border border-white text-white mx-auto my-3 px-3 py-1 hover:text-brightTeal hover:border-brightTeal'
                onClick={handleNoteCreation}
            >
                <Icon icon="mdi:add-bold" />
            </button>
        </div>
    )
}
