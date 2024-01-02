import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { resetIsModifiedSinceLastSync } from '../slices/noteDataSlice';
import { storeNotes } from '../api/noteApi';

// animate-sync-spin

function SyncButton() {
    const isModifiedSinceLastSync = useSelector(
        (state) => state.noteData.isModifiedSinceLastSync
    );
    const userId = useSelector((state) => state.auth.user.userId);
    const userNotes = useSelector((state) => state.noteData.userNotes);
    const [isSyncing, setIsSyncing] = useState(false);

    const dispatch = useDispatch();

    const syncNotesWithServer = () => {
        if (!isSyncing && isModifiedSinceLastSync) {
            setIsSyncing(true);
            console.log('Syncing notes with server.');

            storeNotes({ userId, userNotes }).then(
                setTimeout(() => {
                    dispatch(resetIsModifiedSinceLastSync());
                    setIsSyncing(false);
                    console.log('Synchronization finished.');
                }, 2000)
            );
        }
    };

    const syncButtonStyle = () => {
        return isModifiedSinceLastSync ? 'hover:text-brightTeal' : 'opacity-50';
    };

    const syncIconStyle = () => {
        return isSyncing ? 'animate-sync-spin text-brightTeal' : '';
    };

    return (
        <button
            className={`flex items-center gap-1 text-white ${syncButtonStyle()}`}
            onClick={syncNotesWithServer}
        >
            <Icon
                icon='ic:baseline-sync'
                className={`text-xl ${syncIconStyle()}`}
            />
            <p>Sync</p>
        </button>
    );
}

export default SyncButton;
