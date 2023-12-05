import React from 'react'
import { useDispatch } from 'react-redux'
import { select } from '../slices/noteDataSlice'

export const NoteCard = ({ id, title, content, selected }) => {
  const dispatch = useDispatch();

  return (
    <button 
      className={`flex flex-col w-full p-2 bg-darkTeal text-white 
      ${selected ? 'border border-brightTeal bg-opacity-100' : 'bg-opacity-50'} 
      hover:bg-brightTeal hover:text-black`}
      onClick={() => {dispatch(select({ id: id, title: title, content: content}))}}
      >
        <p className='note-card font-bold'>{title === '' ? 'New Note' : title}</p>
        <p className='note-card'>{content === '' ? '...' : content}</p>
    </button>
  )
}
