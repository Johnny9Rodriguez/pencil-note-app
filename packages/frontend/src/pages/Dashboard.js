import React from 'react'
import { Modals } from '../components/Modals'
import { Navigation } from '../components/Navigation';
import { NoteSelection } from '../components/NoteSelection';
import { NoteEditor } from '../components/NoteEditor';
import { Footer } from '../components/Footer';

export const Dashboard = () => {
    return (
        <div className='relative flex flex-col mx-auto h-screen min-h-480'>
            <Modals />
            <nav className='mx-auto px-6 w-full max-w-1024'>
                <Navigation />
            </nav>
            <div className='flex flex-grow mx-auto px-3 w-full max-w-1024 h-4/6'>
                <NoteSelection />
                <NoteEditor />
            </div>
            <div className='flex flex-grow'></div>
            <footer className='flex mt-6 text-white bg-black h-12'>
                <Footer />
            </footer>
        </div>
    )
}
