import React, { useEffect, useCallback } from 'react';
import { Modals } from '../components/Modals';
import { Navigation } from '../components/Navigation';
import { NoteSelection } from '../components/NoteSelection';
import { NoteEditor } from '../components/NoteEditor';
import { Footer } from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../slices/noteDataSlice';

export const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const memoizedDispatch = useCallback(dispatch, [dispatch]);

    // Load stored notes for user.
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/notes/${user.id}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.status === 200) {
                    const jsonData = await response.json();
                    console.log(jsonData);
                    dispatch(setNotes(jsonData));
                } else {
                    console.error('Failed to fetch notes, status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        }

        fetchNotes();
    }, [memoizedDispatch, user.id, dispatch])

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
            <footer className='flex mt-6 bg-black'>
                <Footer />
            </footer>
        </div>
    )
}
