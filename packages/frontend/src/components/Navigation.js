import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import { setAuth, setUser } from '../slices/authSlice';
import { init } from '../slices/noteDataSlice';
import { logout } from '../api/userApi';
import SyncButton from './SyncButton';

export const Navigation = () => {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const data = await logout();

        if (data.userLogout) {
            dispatch(setAuth(false));
            dispatch(setUser({ userId: null, username: null }));
            dispatch(init());
            navigate('/login');
        }
    };

    return (
        <div className='pt-6 pb-3 flex items-center justify-between'>
            <div className='flex items-center gap-x-1'>
                <Icon
                    icon='material-symbols-light:sticky-note-2-outline-sharp'
                    className='text-brightTeal text-3xl'
                />
                <h1 className='text-white text-4xl'>Pencil</h1>
            </div>
            <div className='flex items-center gap-7'>
                <SyncButton />
                <button
                    className='flex items-center gap-1 text-white hover:text-brightTeal'
                    onClick={() => dispatch(setModal(modalTypes.DelAcc))}
                >
                    <Icon
                        icon='material-symbols-light:person'
                        className='text-2xl'
                    />
                    <p className='hidden md:block text-md'>{user.username}</p>
                </button>
                <button
                    className='border border-white text-white px-3 py-1 hover:text-brightCrimson hover:border-brightCrimson'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
