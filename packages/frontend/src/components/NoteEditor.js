import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../slices/noteDataSlice';

const Editor = ({ selectedNote, handleOnChange }) => {
    return (
        <>
            <textarea
                name='title'
                className='px-2 pt-4 h-16 text-4xl font-semibold whitespace-nowrap'
                placeholder='Enter a title'
                value={selectedNote.title}
                onChange={handleOnChange}
                maxLength={128}
                spellCheck='false'
            />
            <hr></hr>
            <textarea
                name='content'
                className='flex-grow p-2 pl-3 text-xl'
                placeholder='Enter a note'
                value={selectedNote.content}
                onChange={handleOnChange}
                maxLength={10000}
                spellCheck='false'
            />
        </>
    )
}

const Empty = () => {
    return (
        <>
            <textarea
                className='px-2 pt-4 h-16 text-4xl font-semibold whitespace-nowrap'
                placeholder='Create your first note'
                disabled
            />
            <hr></hr>
            <div className='flex grow'></div>
        </>
    )
}

export const NoteEditor = () => {
    const userNotes = useSelector((state) => state.noteData.userNotes);
    const selectedNote = useSelector((state) => state.noteData.selectedNote);
    const dispatch = useDispatch();

    const handleOnChange = async (event) => {
        const { name, value } = event.target;
        dispatch(update({ ...selectedNote, [name]: value }));
    }

    return (
        <div className='note-editor truncate flex flex-col flex-grow bg-white'>
            {userNotes.length > 0 ? <Editor selectedNote={selectedNote} handleOnChange={handleOnChange} /> : <Empty />}
        </div>
    )
}
