import React from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { remove, select } from '../slices/noteDataSlice';

export const NoteCard = ({
    noteId,
    title,
    content,
    selected,
    isHovered,
    isHoveredDelete,
    elementIndex,
    setHoverIndex,
    setHoverDelete,
}) => {
    const dispatch = useDispatch();

    let noteCardStyle = 'text-white bg-darkTeal bg-opacity-50';
    if (isHovered) {
        noteCardStyle = 'text-black bg-brightTeal bg-opacity-100';
    } else if (selected) {
        noteCardStyle =
            'text-white bg-darkTeal bg-opacity-100 border border-brightTeal';
    }

    const handleSelect = () => {
        dispatch(select({ noteId, title: title, content: content }));
    };

    const handleDelete = () => {
        dispatch(remove(noteId));
    };

    return (
        <div
            className={'relative w-full'}
            onMouseEnter={() => setHoverIndex(elementIndex)}
            onMouseLeave={() => setHoverIndex(null)}
        >
            <button
                className={`${
                    isHovered ? '' : 'hidden'
                } absolute z-10 right-1 top-1/4 text-3xl ${
                    isHoveredDelete ? 'text-brightCrimson' : 'text-white'
                }`}
                onMouseEnter={() => setHoverDelete(elementIndex)}
                onMouseLeave={() => setHoverDelete(null)}
                onClick={handleDelete}
            >
                {isHoveredDelete ? (
                    <Icon icon='material-symbols:delete-sharp' />
                ) : (
                    <Icon icon='material-symbols-light:delete-outline-sharp' />
                )}
            </button>
            <button
                className={`flex flex-col w-full p-2 ${noteCardStyle}`}
                onClick={handleSelect}
            >
                <p
                    className={`${
                        isHovered ? 'w-5/6' : 'w-full'
                    } note-card font-bold`}
                >
                    {title === '' ? 'New Note' : title}
                </p>
                <p className={`${isHovered ? 'w-5/6' : 'w-full'} note-card`}>
                    {content === '' ? '...' : content}
                </p>
            </button>
        </div>
    );
};
