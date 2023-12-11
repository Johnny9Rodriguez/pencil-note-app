import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { Modals } from '../components/Modals';
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const demoUsername = 'demo1234';
    const demoPassword = 'demo1234';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState({ errorMsg: null, errorFlag: null });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e, demo) => {
        e.preventDefault();

        setUsername('');
        setPassword('');

        try {
            const data = {
                username: demo ? demoUsername : username,
                password: demo ? demoPassword : password,
                rememberMe: demo ? false : rememberMe
            }

            const res = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!res.ok) {
                if (res.status === 401) {
                    setLoginError({ errorMsg: 'Incorrect username or password.', errorFlag: Date.now() });
                } else {
                    setLoginError({ errorMsg: 'Internal server error. Please try again.', errorFlag: Date.now() });
                }
                return;
            }

            const jsonData = await res.json();

            if (jsonData.success) {
                console.log(jsonData.message);
                dispatch(setAuth(true));
                dispatch(setUser({ id: jsonData.user.id, username: jsonData.user.username }))
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Error fetching login authentication', err);
        }
    }

    const LoginError = () => {
        return (
            <div className='flex justify-center items-center gap-3 p-2 text-brightCrimson border border-brightCrimson text-sm bg-brightCrimson bg-opacity-20'>
                <Icon icon="ic:baseline-warning" className='text-lg animate-error-shake' />
                <p className='animate-error-shake'>{loginError.errorMsg}</p>
            </div>
        )
    }

    const clearError = () => {
        setLoginError({ errorMsg: null, errorFlag: null });
    }

    return (
        <div className='relative flex flex-col justify-between mx-auto h-screen min-h-480'>
            <Modals />
            <section id='login' className='flex flex-col mx-auto mt-12 w-80'>
                <header className='flex justify-end items-center gap-x-1 pr-3 pb-1'>
                    <Icon icon="material-symbols-light:sticky-note-2-outline-sharp" className='text-brightTeal text-3xl' />
                    <h1 className='text-white text-4xl'>Pencil</h1>
                </header>
                <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                    <h2 className='text-white text-3xl'>Login</h2>
                    <form onSubmit={(e) => handleLogin(e, false)} className='flex flex-col gap-4'>
                        <div className='flex py-2 w-full border border-darkTeal'>
                            <Icon icon="material-symbols-light:person" className='self-center w-8 text-2xl text-brightTeal' />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    clearError();
                                }}
                                placeholder='Username'
                                className='w-full bg-white bg-opacity-0 text-white'
                                spellCheck='false' />
                        </div>
                        <div className='flex py-2 w-full border border-darkTeal'>
                            <Icon icon="material-symbols:lock-sharp" className='self-center w-8 text-lg text-brightTeal' />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearError();
                                }}
                                placeholder='Password'
                                className='w-full bg-white bg-opacity-0 text-white'
                                spellCheck='false' />
                        </div>
                        <div className='flex items-center gap-2 px-1'>
                            <input
                                type="checkbox"
                                id="remember-me"
                                value={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className='relative peer appearance-none w-3 h-3 bg-white bg-opacity-0 border border-darkTeal cursor-pointer checked:bg-brightTeal checked:text-white checked:border-brightTeal'
                            />
                            <label htmlFor="remember-me" className='text-white text-sm'>Remember me</label>
                            <Icon icon="mdi:check-bold" className='absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none' />
                        </div>
                        <button
                            type='submit'
                            className='self-center w-fit border border-white text-white px-7 py-1 hover:border-brightTeal hover:text-brightTeal'>
                            Login
                        </button>
                    </form>
                    {loginError.errorFlag && <LoginError />}
                </div>
                <div className='flex flex-col gap-2 px-1 py-2 mt-1 text-sm text-white text-opacity-50'>
                    <div className='flex gap-x-2'>
                        <p>Need an account?</p>
                        <Link to='/signup' className='text-brightTeal hover:text-white'>Sign Up</Link>
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-1'>Or login with</p>
                        <button
                            className='text-brightTeal hover:text-white'
                            onClick={(e) => handleLogin(e, true)}>
                            demo account
                        </button>
                        <p>.</p>
                    </div>

                </div>

            </section>
            <footer className='flex mt-6 bg-black'>
                <Footer />
            </footer>
        </div>
    )
}
