import React from 'react';
import { Icon } from '@iconify/react';

// animate-sync-spin

function SyncButton() {
    return (
        <button className='flex items-center gap-1 text-white hover:text-brightTeal'>
            <Icon icon="ic:baseline-sync" className='text-xl'/>
            <p>Sync</p>
        </button>
    );
}

export default SyncButton;