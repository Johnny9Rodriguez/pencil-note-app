import React from 'react'
import { Navigation } from '../components/Navigation';
import { NoteSelection } from '../components/NoteSelection';
import { NoteEditor } from '../components/NoteEditor';

export const Dashboard = () => {
    return (
        <div className='flex flex-col mx-auto h-screen'>
            <nav className='mx-auto px-6 w-full max-w-1024'>
                <Navigation />
            </nav>
            <div className='flex flex-grow mx-auto px-3 w-full max-w-1024 h-4/6'>
                <NoteSelection />
                <NoteEditor />
            </div>
            <div className='flex flex-grow'></div>
            <footer className='flex mt-6 text-white bg-black h-12'>
                <p>Joe Pytlik</p>
                <p>Links + Social</p>
            </footer>
        </div>
    )
}
