import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setModal } from '../slices/modalSlice';
import { modalTypes } from '../slices/modalSlice';
import validator from 'validator';

export const ContactModal = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [text, setText] = useState('');
    const [sendError, setSendError] = useState({
        errorMessage: '',
        errorFlag: null,
    });
    const dispatch = useDispatch();

    const send = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            setSendError({
                errorMessage: 'Please enter your name.',
                errorFlag: Date.now(),
            });
        } else if (!validator.isEmail(mail.toLowerCase())) {
            setSendError({
                errorMessage: 'Please enter a valid e-mail address.',
                errorFlag: Date.now(),
            });
        } else if (text.trim() === '') {
            setSendError({
                errorMessage: 'Message is empty.',
                errorFlag: Date.now(),
            });
        } else {
            // Send message to email microservice
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

    return (
        <div className='flex flex-col max-w-400 min-w-300 m-auto mt-12 gradient-bg text-white'>
            <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                <div id='modal-header' className='flex justify-between'>
                    <h2 className='text-3xl'>Contact</h2>
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
                            value={mail}
                            onChange={(e) => {
                                setMail(e.target.value);
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
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            resetError();
                        }}
                        className='h-40 px-2 py-2 w-full bg-white bg-opacity-0 border border-darkTeal focus:outline-none'
                        placeholder='Message'
                        maxLength={5000}
                        spellCheck='false'
                    />
                    <button
                        type='submit'
                        className='self-center w-fit border border-white text-white px-7 py-1 hover:border-brightTeal hover:text-brightTeal'
                    >
                        Send
                    </button>
                </form>
                {sendError.errorFlag && <SendError />}
            </div>
        </div>
    );
};
