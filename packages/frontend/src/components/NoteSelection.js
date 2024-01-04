import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../slices/noteDataSlice';
import { NoteCard } from './NoteCard';
import { Icon } from '@iconify/react';

export const NoteSelection = () => {
    const userNotes = useSelector((state) => state.noteData.userNotes);
    const selectedNote = useSelector((state) => state.noteData.selectedNote);
    const showSelection = useSelector((state) => state.selection.showSelection);
    const dispatch = useDispatch();

    const [hoverIndex, setHoverIndex] = useState(null);
    const [hoverDelete, setHoverDelete] = useState(null);

    const handleNoteCreation = () => {
        dispatch(add());
    };

    useEffect(() => {
        if (userNotes.length === 0) {
            setHoverIndex(null);
            setHoverDelete(null);
        }
    }, [userNotes]);

    return (
        <div
            className={`note-selection ${showSelection ? 'flex' : 'hidden'} flex-col w-full hide-scrollbar items-center gap-1 p-1 bg-black bg-opacity-20
            md:w-256 sm:min-w-256
            md:flex`}
        >
            {userNotes.map((note, index) => (
                <NoteCard
                    key={note.noteId}
                    noteId={note.noteId}
                    title={note.title}
                    content={note.content}
                    selected={note.noteId === selectedNote.noteId}
                    isHovered={index === hoverIndex}
                    isHoveredDelete={index === hoverDelete}
                    elementIndex={index}
                    setHoverIndex={setHoverIndex}
                    setHoverDelete={setHoverDelete}
                />
            ))}
            <button
                className={`${
                    userNotes.length > 20 ? 'hidden' : ''
                } border border-white text-white mx-auto my-3 px-3 py-1 hover:text-brightTeal hover:border-brightTeal`}
                onClick={handleNoteCreation}
            >
                <Icon icon='mdi:add-bold' />
            </button>
        </div>
    );
};
