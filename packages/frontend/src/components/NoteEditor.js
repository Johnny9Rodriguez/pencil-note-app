import React from 'react'

export const NoteEditor = () => {
    return (
        <div className='noteEditor flex flex-col flex-grow bg-white bg-opacity-10'>
            <textarea
                className='px-2 pt-4 h-16 text-4xl font-bold whitespace-nowrap'
                placeholder='Enter a title'
            />
            <hr></hr>
            <textarea
                className='flex-grow p-2 pl-3 text-xl'
                placeholder='Enter a note'
            />
        </div>
    )
}
