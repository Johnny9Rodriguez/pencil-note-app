import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import { setAuth, setUser } from '../slices/authSlice';
import { toggleShowSelection } from '../slices/selectionSlice';
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
            navigate('/');
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
            <div className='flex items-center gap-5 md:gap-7'>
                <button
                    className='text-white text-xl hover:text-brightTeal md:hidden'
                    onClick={() => dispatch(toggleShowSelection())}
                >
                    <Icon icon='grommet-icons:menu' />
                </button>
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
                    className='hidden border border-white text-white mx-1 px-3 py-1 hover:text-brightCrimson hover:border-brightCrimson
                    md:block'
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <button className='md:hidden' onClick={handleLogout}>
                    <Icon
                        icon='material-symbols:logout-sharp'
                        className='text-xl text-white hover:text-brightCrimson'
                    />
                </button>
            </div>
        </div>
    );
};
