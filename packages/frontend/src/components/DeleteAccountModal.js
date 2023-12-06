import React from 'react'
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const DeleteAccountModal = () => {
  const dispatch = useDispatch();

  return (
    <div className='relative flex flex-col justify-between w-96 h-48 m-auto mt-32 p-3 bg-white border-darkTeal border-4'>
      <button 
        className='absolute right-3 top-3 text-darkTeal text-xl hover:text-brightTeal'
        onClick={() => dispatch(setModal(modalTypes.None))}
      >
        <Icon icon="oi:x" />
      </button>
      <h2 className='text-2xl font-bold'>Delete Account?</h2>
      <p className='text-md mb-2'>
        Type <span className='text-brightCrimson'>delete</span> below to confirm. This action is irreversible and will erase all your data.
      </p>
      <form 
        action=""
        className='flex justify-center gap-1'
      >
        <input
          type="text"
          className='border border-darkTeal focus:outline-none p-1'
          placeholder={`Type delete`}
        />
        <button
          type='submit'
          className='flex justify-center items-center text-2xl p-1 text-white bg-darkTeal hover:text-black hover:bg-brightTeal'
          onClick={(e) => e.preventDefault()}
        >
          <Icon icon="material-symbols-light:send" />
        </button>
      </form>
    </div>
  )
}
