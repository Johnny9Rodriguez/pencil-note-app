import React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Modals } from '../components/Modals';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState({ errorMsg: '', errorFlag: null });
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [timer, setTimer] = useState(5);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        setPassword('');

        try {
            if (username.length < 8 || username.length > 20) {
                setSignupError({ errorMsg: 'Username must be between 8-20 characters and can only contain letters and numbers.', errorFlag: Date.now() });
                return;
            }

            if (password.length < 8 || password.length > 20) {
                setSignupError({ errorMsg: 'Password must be between 8-20 characters and include uppercase, lowercase, numbers, and special characters.', errorFlag: Date.now() });
                return;
            }

            const data = {
                username: username.toLowerCase(),
                password: password
            }

            console.log(username + " : " + password)

            const res = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                if (res.status === 409) {
                    setSignupError({ errorMsg: 'Username already taken.', errorFlag: Date.now() });
                } else {
                    console.error('Error: ', res.text());
                }
                return;
            }

            setSignupSuccess(true);
        } catch (err) {
            console.error('Error: ', err);
        }
    }

    // Redirect timer counts from 5 to 0 and redirects to login page
    useEffect(() => {
        let interval;

        if (signupSuccess && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        // Redirect when timer reaches 0
        if (signupSuccess && timer === 0) {
            navigate('/login');
        }

        // Cleanup interval
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [signupSuccess, timer, navigate]);

    const handleUsernameChange = (e) => {
        clearError();
        const value = e.target.value;
        if (value === '' || isValidUsername(value)) {
            setUsername(value);
        } else {
            setSignupError({ errorMsg: 'Username must be between 8-20 characters and can only contain letters and numbers.', errorFlag: Date.now() });
        }
    }

    const isValidUsername = (username) => {
        return /^[A-Za-z0-9]+$/.test(username);
    };

    const handlePasswordChange = (e) => {
        clearError();
        const value = e.target.value;
        if (value === '' || isValidPassword(value)) {
            setPassword(value);
        } else {
            setSignupError({ errorMsg: 'Password must be between 8-20 characters and include uppercase, lowercase, numbers, and special characters.', errorFlag: Date.now() });
        }
    }

    const isValidPassword = (password) => {
        return /^[A-Za-z0-9!?@#$%^&*()-+=§"]+$/.test(password);
    };

    const SignupError = () => {
        return (
            <div className='flex justify-center items-center gap-3 p-2 text-brightCrimson border border-brightCrimson text-sm bg-brightCrimson bg-opacity-10'>
                <Icon icon="ic:baseline-warning" className='w-12 text-lg animate-error-shake' />
                <p className='animate-error-shake'>{signupError.errorMsg}</p>
            </div>
        )
    }

    const clearError = () => {
        setSignupError({ errorMsg: '', errorFlag: null });
    }

    return (
        <div className='relative flex flex-col justify-between mx-auto h-screen min-h-480'>
            <Modals />
            <section id='signup' className='flex flex-col mx-auto mt-12 w-80'>
                <header className='flex justify-end items-center gap-x-1 pr-3 pb-1'>
                    <Icon icon="material-symbols-light:sticky-note-2-outline-sharp" className='text-brightTeal text-3xl' />
                    <h1 className='text-white text-4xl'>Pencil</h1>
                </header>
                <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                    <h2 className='text-white text-3xl'>
                        {signupSuccess ? 'Welcome!' : 'Sign Up'}
                    </h2>
                    {signupSuccess ?
                        <div className='text-white text-opacity-50'>
                            <p>
                                You will be redirected to the
                                <Link to='/login' className='text-brightTeal hover:text-white'> Login</Link>{' '}
                                page in {timer} seconds.
                            </p>
                        </div>
                        :
                        <form onSubmit={handleSignup} className='flex flex-col gap-4'>
                            <div className='flex py-2 w-full border border-darkTeal'>
                                <Icon icon="material-symbols-light:person" className='self-center w-8 text-2xl text-brightTeal' />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder='Username'
                                    className='w-full bg-white bg-opacity-0 text-white'
                                    spellCheck='false' />
                            </div>
                            <div className='flex py-2 w-full border border-darkTeal'>
                                <Icon icon="material-symbols:lock-sharp" className='self-center w-8 text-lg text-brightTeal' />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder='Password'
                                    className='w-full bg-white bg-opacity-0 text-white'
                                    spellCheck='false' />
                            </div>
                            <button
                                type='submit'
                                className='self-center w-fit border border-white text-white px-7 py-1 hover:border-brightTeal hover:text-brightTeal'>
                                Sign Up
                            </button>
                        </form>}
                    {signupError.errorFlag && <SignupError />}
                </div>
                {!signupSuccess &&
                    <div className='flex flex-col gap-2 px-1 py-2 mt-1 text-sm text-white text-opacity-50'>
                        <div className='flex gap-x-2'>
                            <p>Already have an account?</p>
                            <Link to='/login' className='text-brightTeal hover:text-white'>Login</Link>
                        </div>
                    </div>
                }
            </section>
            <footer className='flex mt-6 bg-black'>
                <Footer />
            </footer>
        </div>
    )
}
