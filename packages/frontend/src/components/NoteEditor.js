import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../slices/noteDataSlice';

export const NoteEditor = () => {
    const selected = useSelector((state) => state.noteData.selectedNote);
    const dispatch = useDispatch();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        dispatch(update({ ...selected, [name]: value}));
    }

    return (
        <div className='noteEditor flex flex-col flex-grow bg-white bg-opacity-10'>
            <textarea
                name='title'
                className='px-2 pt-4 h-16 text-4xl font-semibold whitespace-nowrap'
                placeholder='Enter a title'
                value={selected.title}
                onChange={handleOnChange}
            />
            <hr></hr>
            <textarea
                name='content'
                className='flex-grow p-2 pl-3 text-xl'
                placeholder='Enter a note'
                value={selected.content}
                onChange={handleOnChange}
            />
        </div>
    )
}
