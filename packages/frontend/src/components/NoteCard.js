import React from 'react'

export const NoteCard = (props) => {
  const { title, content, selected } = props;

  return (
    <button 
      className={`flex flex-col w-full p-2 bg-darkTeal text-white ${selected ? 'border border-brightTeal bg-opacity-100' : 'bg-opacity-50'} hover:bg-brightTeal hover:text-black`}>
        <p className='font-bold'>{title}</p>
        <p>{content}</p>
    </button>
  )
}
