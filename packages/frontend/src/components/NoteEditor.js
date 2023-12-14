import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../slices/noteDataSlice';
import { debounce, axeDebounce } from '../utils/debounceNoteUpdate';

const Editor = ({ selected, handleOnChange }) => {
    return (
        <>
            <textarea
                name='title'
                className='px-2 pt-4 h-16 text-4xl font-semibold whitespace-nowrap'
                placeholder='Enter a title'
                value={selected.title}
                onChange={handleOnChange}
                maxLength={128}
                spellCheck='false'
            />
            <hr></hr>
            <textarea
                name='content'
                className='flex-grow p-2 pl-3 text-xl'
                placeholder='Enter a note'
                value={selected.content}
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
    const notes = useSelector((state) => state.noteData.notes);
    const selected = useSelector((state) => state.noteData.selectedNote);
    const dispatch = useDispatch();

    const handleOnChange = async (event) => {
        const { name, value } = event.target;
        dispatch(update({ ...selected, [name]: value }));

        const data = {
            ...selected,
            [name]: value
        }

        debounce(data);
    }

    useEffect(() => {
        axeDebounce();
    }, [selected.id]);

    return (
        <div className='note-editor truncate flex flex-col flex-grow bg-white'>
            {notes.length !== 0 ? <Editor selected={selected} handleOnChange={handleOnChange} /> : <Empty />}
        </div>
    )
}
