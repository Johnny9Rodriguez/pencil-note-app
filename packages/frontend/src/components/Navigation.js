import React from 'react'
import { Icon } from '@iconify/react';

export const Navigation = () => {
  return (
    <div className='pt-6 pb-3 flex items-center justify-between'>
      <div className='flex items-center gap-x-1'>
        <Icon icon="material-symbols-light:sticky-note-2-outline-sharp" className='text-brightTeal text-3xl' />
        <h1 className='text-white text-4xl'>Pencil</h1>
      </div>
      <div className='flex items-center gap-7'>
        <button className='flex items-center gap-1 text-white hover:text-brightTeal'>
          <Icon icon="mdi:account" className='text-2xl'/>
          <p className='hidden md:block text-md'>Johnny9Rodriguez</p>
        </button>
        <button className='border border-white text-white px-3 py-1 hover:text-brightCrimson hover:border-brightCrimson'>
          Logout
        </button>
      </div>
    </div>
  )
}
