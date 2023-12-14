import React from 'react'
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import { setAuth, setUser } from '../slices/authSlice';
import { init } from '../slices/noteDataSlice';
import { axeDebounce } from '../utils/debounceNoteUpdate';

export const Navigation = () => {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!res.ok) {
        console.error(res.text());
        return;
      }

      axeDebounce();
      dispatch(setAuth(false));
      dispatch(setUser({ id: null, username: null }));
      dispatch(init());
      navigate('/login');

    } catch (err) {
      console.error('Error on logout: ', err);
    }
  }

  return (
    <div className='pt-6 pb-3 flex items-center justify-between'>
      <div className='flex items-center gap-x-1'>
        <Icon icon="material-symbols-light:sticky-note-2-outline-sharp" className='text-brightTeal text-3xl' />
        <h1 className='text-white text-4xl'>Pencil</h1>
      </div>
      <div className='flex items-center gap-7'>
        <button
          className='flex items-center gap-1 text-white hover:text-brightTeal'
          onClick={() => dispatch(setModal(modalTypes.DelAcc))}
        >
          <Icon icon="material-symbols-light:person" className='text-2xl' />
          <p className='hidden md:block text-md'>{user.username}</p>
        </button>
        <button
          className='border border-white text-white px-3 py-1 hover:text-brightCrimson hover:border-brightCrimson'
          onClick={handleLogout} >
          Logout
        </button>
      </div>
    </div>
  )
}
