import React from 'react'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { remove, select } from '../slices/noteDataSlice'

export const NoteCard = ({ id, title, content, selected }) => {
  const [elementMouseOver, setElementMouseOver] = useState(false);
  const [deleteMouseOver, setDeleteMouseOver] = useState(false);
  const dispatch = useDispatch();

  let noteCardStyle;
  if (elementMouseOver) {
    noteCardStyle = 'text-black bg-brightTeal bg-opacity-100'
  } else if (selected) {
    noteCardStyle = 'text-white bg-darkTeal bg-opacity-100 border border-brightTeal'
  } else {
    noteCardStyle = 'text-white bg-darkTeal bg-opacity-50'
  }

  return (
    <div
      className={'relative w-full'}
      onMouseEnter={() => setElementMouseOver(true)}
      onMouseLeave={() => setElementMouseOver(false)}
    >
      <button
        className={`${elementMouseOver ? '' : 'hidden'} absolute z-10 right-1 top-1/4 text-3xl text-white hover:text-brightCrimson`}
        onMouseEnter={() => setDeleteMouseOver(true)}
        onMouseLeave={() => setDeleteMouseOver(false)}
        onClick={() => dispatch(remove(id))}
      >
        {deleteMouseOver ? (<Icon icon="material-symbols:delete-sharp" />) : (<Icon icon="material-symbols-light:delete-outline-sharp" />)}
      </button>
      <button
        className={`flex flex-col w-full p-2 ${noteCardStyle}`}
        onClick={() => { dispatch(select({ id: id, title: title, content: content })) }}
      >
        <p className={`${elementMouseOver ? 'w-5/6' : 'w-full'} note-card font-bold`}>{title === '' ? 'New Note' : title}</p>
        <p className={`${elementMouseOver ? 'w-5/6' : 'w-full'} note-card`}>{content === '' ? '...' : content}</p>
      </button>
    </div>
  )
}
