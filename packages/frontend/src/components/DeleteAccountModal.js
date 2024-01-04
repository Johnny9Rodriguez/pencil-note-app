import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';

export const DeleteAccountModal = () => {
    const [inputValue, setInputValue] = useState('');
    const [deleteError, setDeleteError] = useState({
        errorMessage: '',
        errorFlag: null,
    });
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();

        if (inputValue.toLowerCase() === 'delete') {
            console.log('Deleting Account');
        } else {
            setDeleteError({
                errorMessage: 'Wrong input.',
                errorFlag: Date.now(),
            });
        }
    };

    const resetError = () => {
        setDeleteError({ errorMessage: '', errorFlag: null });
    };

    const DeleteError = () => {
        return (
            <div className='flex justify-center items-center gap-3 p-2 text-brightCrimson border border-brightCrimson text-sm bg-brightCrimson bg-opacity-10'>
                <Icon
                    icon='ic:baseline-warning'
                    className='text-lg animate-error-shake'
                />
                <p className='animate-error-shake'>
                    {deleteError.errorMessage}
                </p>
            </div>
        );
    };

    return (
        <div className='flex flex-col max-w-400 min-w-300 m-auto mt-12 gradient-bg text-white'>
            <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                <div id='modal-header' className='flex justify-between'>
                    <h2 className='text-3xl'>Delete Account?</h2>
                    <button
                        className='text-2xl hover:text-brightTeal'
                        onClick={() => {
                            dispatch(setModal(modalTypes.None));
                            resetError();
                        }}
                    >
                        <Icon icon='material-symbols:close' />
                    </button>
                </div>
                <p className='text-md text-gray-400'>
                    Type <span className='text-brightCrimson'>delete</span>{' '}
                    below to confirm. This action is irreversible and will erase
                    all your data.
                </p>
                <form
                    className='flex flex-col gap-4'
                    onSubmit={(e) => handleDelete(e)}
                >
                    <div className='flex py-2 w-full border border-darkTeal'>
                        <Icon
                            icon='material-symbols-light:delete-outline-sharp'
                            className='self-center w-8 text-2xl text-brightTeal'
                        />
                        <input
                            type='text'
                            name='delete-account'
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                resetError();
                            }}
                            placeholder='Type delete'
                            className='w-full bg-white bg-opacity-0'
                            spellCheck='false'
                        />
                    </div>
                    <button
                        type='submit'
                        className='self-center w-fit border border-white text-white px-7 py-1 hover:border-brightCrimson hover:text-brightCrimson'
                    >
                        Delete
                    </button>
                </form>
                {deleteError.errorFlag && <DeleteError />}
            </div>
        </div>
    );
};
