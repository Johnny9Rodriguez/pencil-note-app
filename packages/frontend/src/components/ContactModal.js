import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';
import validator from 'validator';
import { sendMessage } from '../api/contactApi';

export function ContactModal() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [hasSent, setHasSent] = useState(false);
    const [sendError, setSendError] = useState({
        errorMessage: '',
        errorFlag: null,
    });
    const [timer, setTimer] = useState(5);

    const dispatch = useDispatch();

    useEffect(() => {
        let interval;

        if (hasSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        // Redirect when timer reaches 0
        if (hasSent && timer === 0) {
            setHasSent(false);
            setTimer(5);
            dispatch(setModal(modalTypes.None));
        }

        // Cleanup interval
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [hasSent, timer, dispatch]);

    const validateInputs = () => {
        if (validator.isEmpty(name)) {
            setSendError({
                errorMessage: 'Name is required.',
                errorFlag: Date.now(),
            });
            return false;
        }
        if (!validator.isEmail(address)) {
            setSendError({
                errorMessage: 'Invalid email address.',
                errorFlag: Date.now(),
            });
            return false;
        }
        if (validator.isEmpty(message)) {
            setSendError({
                errorMessage: 'Message is required.',
                errorFlag: Date.now(),
            });
            return false;
        }
        return true;
    };

    const send = async (e) => {
        e.preventDefault();
        if (isSending) return;

        if (!validateInputs()) {
            setIsSending(false);
            return;
        }

        setIsSending(true);
        const response = await sendMessage(
            { name, address, message },
            setSendError
        );
        setIsSending(false);

        if (response.status === 200) {
            setHasSent(true);
            setTimer(5);
        }
    };

    const resetError = () => {
        setSendError({ errorMessage: '', errorFlag: null });
    };

    const SendError = () => {
        return (
            <div className='flex justify-center items-center gap-3 p-2 text-brightCrimson border border-brightCrimson text-sm bg-brightCrimson bg-opacity-10'>
                <Icon
                    icon='ic:baseline-warning'
                    className='text-lg animate-error-shake'
                />
                <p className='animate-error-shake'>{sendError.errorMessage}</p>
            </div>
        );
    };

    const renderSuccessMessage = () => {
        return (
            <>
                <div className='text-lg'>Message sent successfully!</div>
                <div className='text-sm font-thin opacity-50'>
                    Closing window in {timer} seconds.
                </div>
            </>
        );
    };

    const renderContactForm = () => {
        return (
            <>
                <form className='flex flex-col gap-4' onSubmit={(e) => send(e)}>
                    <div className='flex py-2 w-full border border-darkTeal'>
                        <Icon
                            icon='material-symbols-light:person'
                            className='self-center w-8 text-2xl text-brightTeal'
                        />
                        <input
                            type='text'
                            name='contact-name'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                resetError();
                            }}
                            placeholder='Name'
                            className='w-full bg-white bg-opacity-0'
                            spellCheck='false'
                            maxLength={256}
                        />
                    </div>
                    <div className='flex py-2 w-full border border-darkTeal'>
                        <Icon
                            icon='material-symbols:mail-sharp'
                            className='self-center w-8 text-lg text-brightTeal'
                        />
                        <input
                            type='text'
                            name='contact-mail'
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                                resetError();
                            }}
                            placeholder='E-Mail'
                            className='w-full bg-white bg-opacity-0'
                            spellCheck='false'
                            maxLength={320}
                        />
                    </div>
                    <textarea
                        name='contact-msg'
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            resetError();
                        }}
                        className='h-40 px-2 py-2 w-full bg-white bg-opacity-0 border border-darkTeal focus:outline-none'
                        placeholder='Message'
                        maxLength={5000}
                        spellCheck='false'
                    />
                    <button
                        type='submit'
                        className='flex self-center justify-center items-center w-24 h-8 border border-white text-white hover:border-brightTeal hover:text-brightTeal'
                    >
                        {isSending && (
                            <Icon
                                icon='tdesign:load'
                                className='animate-spin'
                            />
                        )}
                        {!isSending && 'Send'}
                    </button>
                </form>
                {sendError.errorFlag && <SendError />}
            </>
        );
    };

    return (
        <div className='flex flex-col max-w-400 min-w-300 m-auto mt-12 gradient-bg text-white'>
            <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                <div id='modal-header' className='flex justify-between'>
                    <h2 className='text-3xl'>Contact</h2>
                    <button
                        className='text-2xl hover:text-brightTeal'
                        onClick={() => {
                            setHasSent(false);
                            setTimer(5);
                            dispatch(setModal(modalTypes.None));
                            resetError();
                        }}
                    >
                        <Icon icon='material-symbols:close' />
                    </button>
                </div>
                {hasSent && renderSuccessMessage()}
                {!hasSent && renderContactForm()}
            </div>
        </div>
    );
}
