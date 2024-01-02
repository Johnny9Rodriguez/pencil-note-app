import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { resetIsModifiedSinceLastSync } from '../slices/noteDataSlice';

// animate-sync-spin

function SyncButton() {
    const isModifiedSinceLastSync = useSelector(
        (state) => state.noteData.isModifiedSinceLastSync
    );
    const [isSyncing, setIsSyncing] = useState(false);

    const dispatch = useDispatch();

    const syncNotesWithServer = () => {
        if (!isSyncing && isModifiedSinceLastSync) {
            setIsSyncing(true);

            // ... fetch implementation
            setTimeout(() => {
                dispatch(resetIsModifiedSinceLastSync());
                setIsSyncing(false);
            }, 2000);
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
                icon='ic:baseline-sync' className={`text-xl ${syncIconStyle()}`}
            />
            <p>Sync</p>
        </button>
    );
}

export default SyncButton;
