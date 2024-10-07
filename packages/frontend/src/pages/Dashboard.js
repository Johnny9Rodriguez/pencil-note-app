import React, { useEffect, useRef } from 'react';
import { Modals } from '../components/Modals';
import { Navigation } from '../components/Navigation';
import { NoteSelection } from '../components/NoteSelection';
import { NoteEditor } from '../components/NoteEditor';
import { Footer } from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../slices/noteDataSlice';
import { fetchNotes } from '../api/noteApi';

export const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    let hasFetchedNotes = useRef(false);

    // Load stored notes for authenticated user.
    useEffect(() => {
        if (!hasFetchedNotes.current) {
            fetchNotes(user.userId).then((noteData) => {
                dispatch(setNotes(noteData.notes));
            });

            hasFetchedNotes.current = true;
        }
    }, [dispatch, user.userId]);

    return (
        <div className='relative flex flex-col mx-auto h-dvh min-h-480'>
            <Modals />
            <nav className='mx-auto px-6 w-full max-w-1024'>
                <Navigation />
            </nav>
            <div className='flex flex-grow mx-auto px-3 w-full max-w-1024 h-4/6 sm:flex-row-reverse md:flex-row'>
                <NoteSelection />
                <NoteEditor />
            </div>
            <div className='flex flex-grow'></div>
            <Footer />
        </div>
    );
};
