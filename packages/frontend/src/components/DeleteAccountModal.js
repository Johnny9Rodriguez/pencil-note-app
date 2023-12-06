import React from 'react'
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const DeleteAccountModal = () => {
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col w-96 m-auto mt-32 bg-white'>
      <div id='modal-header' className='modal-header flex justify-between w-full px-5 py-2'>
        <h2 className='text-2xl text-white'>Delete Account?</h2>
        <button
          className='text-white text-2xl hover:text-brightTeal'
          onClick={() => dispatch(setModal(modalTypes.None))}
        >
          <Icon icon="material-symbols:close" />
        </button>
      </div>
      <div className='px-5 pt-1 pb-2 mt-3'>
        <p className='text-md mb-2'>
          Type <span className='text-brightCrimson'>delete</span> below to confirm. This action is irreversible and will erase all your data.
        </p>
      </div>
      <hr className='m-0 p-0' />
      <form action="" className='flex gap-1 px-5 py-3'>
        <input 
          type="text" 
          name="delete-account" 
          className='px-1 border border-darkTeal focus:outline-none' 
          placeholder='Type delete' />
        <button 
          type='submit' 
          onClick={(e) => e.preventDefault()} 
          className='text-2xl p-0.5 text-white bg-darkTeal hover:bg-brightTeal'>
          <Icon icon="material-symbols-light:send" />
        </button>
      </form>
    </div>
  )
}
