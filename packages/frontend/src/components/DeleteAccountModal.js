import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteUser } from '../api/userApi';

export const DeleteAccountModal = () => {
    const [inputValue, setInputValue] = useState('');
    const [deleteError, setDeleteError] = useState({
        errorMessage: '',
        errorFlag: null,
    });
    const user = useSelector((state) => state.auth.user);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [timer, setTimer] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();

        if (inputValue.toLowerCase() === 'delete') {
            if (user.username === 'demo1234') {
                setDeleteError({
                    errorMessage: 'Cannot delete demo account.',
                    errorFlag: Date.now(),
                });
            } else {
                console.log(user.userId)
                const data = await deleteUser(user.userId, setDeleteError);

                if (data && data.deleted) {
                    setDeleteSuccess(true);
                }
            }
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

    useEffect(() => {
        let interval;

        if (deleteSuccess && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        // Redirect when timer reaches 0
        if (deleteSuccess && timer === 0) {
            dispatch(setModal(modalTypes.None));
            navigate('/login');
        }

        // Cleanup interval
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [deleteSuccess, timer, navigate, dispatch]);

    return (
        <div className='flex flex-col max-w-400 min-w-300 m-auto mt-12 gradient-bg text-white'>
            <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                <div id='modal-header' className='flex justify-between'>
                    <h2 className='text-3xl'>
                        {deleteSuccess ? 'Goodbye!' : 'Delete Account?'}
                    </h2>
                    {!deleteSuccess && (
                        <button
                            className='text-2xl hover:text-brightTeal'
                            onClick={() => {
                                dispatch(setModal(modalTypes.None));
                                resetError();
                            }}
                        >
                            <Icon icon='material-symbols:close' />
                        </button>
                    )}
                </div>
                {deleteSuccess ? (
                    <div className='text-white text-opacity-50'>
                        <p>
                            Account deleted. You will be redirected to the
                            <Link
                                to='/login'
                                className='text-brightTeal hover:text-white'
                            >
                                {' '}
                                Login
                            </Link>{' '}
                            page in {timer} seconds.
                        </p>
                    </div>
                ) : (
                    <>
                        <p className='text-md text-gray-400'>
                            Type{' '}
                            <span className='text-brightCrimson'>delete</span>{' '}
                            below to confirm. This action is irreversible and
                            will erase all your data.
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
                                    autoComplete='off'
                                />
                            </div>
                            <button
                                type='submit'
                                className='self-center w-fit border border-white text-white px-7 py-1 hover:border-brightCrimson hover:text-brightCrimson'
                            >
                                Delete
                            </button>
                        </form>
                    </>
                )}
                {deleteError.errorFlag && <DeleteError />}
            </div>
        </div>
    );
};
