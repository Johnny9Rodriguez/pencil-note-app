import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Modals } from '../components/Modals';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userApi';

export const LoginPage = () => {
    const DEMO_USERNAME = 'demo1234';
    const DEMO_PASSWORD = 'VNewymiP7IjFC75';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState({
        errorMessage: '',
        errorFlag: null,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e, demo) => {
        e.preventDefault();

        setPassword(''); // Reset password input field on login attempt

        const loginData = {
            username: demo ? DEMO_USERNAME : username.toLowerCase(),
            password: demo ? DEMO_PASSWORD : password,
            rememberMe: demo ? false : rememberMe,
        };

        const data = await login(loginData, setLoginError);

        console.log(data);

        if (data && data.authenticated) {
            dispatch(setAuth(true));
            dispatch(
                setUser({ userId: data.user.userId, username: data.user.username })
            );
            navigate('/dashboard');
        }
    };

    const LoginError = () => {
        return (
            <div className='flex justify-center items-center gap-3 p-2 text-brightCrimson border border-brightCrimson text-sm bg-brightCrimson bg-opacity-10'>
                <Icon
                    icon='ic:baseline-warning'
                    className='text-lg animate-error-shake'
                />
                <p className='animate-error-shake'>{loginError.errorMessage}</p>
            </div>
        );
    };

    const clearError = () => {
        setLoginError({ errorMessage: '', errorFlag: null });
    };

    return (
        <div className='relative flex flex-col justify-between mx-auto h-screen min-h-480'>
            <Modals />
            <section id='login' className='flex flex-col mx-auto mt-12 w-80'>
                <header className='flex justify-end items-center gap-x-1 pr-3 pb-1'>
                    <Icon
                        icon='material-symbols-light:sticky-note-2-outline-sharp'
                        className='text-brightTeal text-3xl'
                    />
                    <h1 className='text-white text-4xl'>Pencil</h1>
                </header>
                <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                    <h2 className='text-white text-3xl'>Login</h2>
                    <form
                        onSubmit={(e) => handleLogin(e, false)}
                        className='flex flex-col gap-4'
                    >
                        <div className='flex py-2 w-full border border-darkTeal'>
                            <Icon
                                icon='material-symbols-light:person'
                                className='self-center w-8 text-2xl text-brightTeal'
                            />
                            <input
                                type='text'
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    clearError();
                                }}
                                placeholder='Username'
                                className='w-full bg-white bg-opacity-0 text-white'
                                spellCheck='false'
                            />
                        </div>
                        <div className='flex py-2 w-full border border-darkTeal'>
                            <Icon
                                icon='material-symbols:lock-sharp'
                                className='self-center w-8 text-lg text-brightTeal'
                            />
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearError();
                                }}
                                placeholder='Password'
                                className='w-full bg-white bg-opacity-0 text-white'
                                spellCheck='false'
                            />
                        </div>
                        <div className='flex items-center gap-2 px-1'>
                            <input
                                type='checkbox'
                                id='remember-me'
                                value={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                                className='relative peer appearance-none w-3 h-3 bg-white bg-opacity-0 border border-darkTeal cursor-pointer checked:bg-brightTeal checked:text-white checked:border-brightTeal'
                            />
                            <label
                                htmlFor='remember-me'
                                className='text-white text-sm remember'
                            >
                                Remember me
                            </label>
                            <Icon
                                icon='mdi:check-bold'
                                className='absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none'
                            />
                        </div>
                        <button
                            type='submit'
                            className='self-center w-fit border border-white text-white px-7 py-1 hover:border-brightTeal hover:text-brightTeal'
                        >
                            Login
                        </button>
                    </form>
                    {loginError.errorFlag && <LoginError />}
                </div>
                <div className='flex flex-col gap-2 px-1 py-2 mt-1 text-sm text-white text-opacity-50'>
                    <div className='flex gap-x-2'>
                        <p>Need an account?</p>
                        <Link
                            to='/signup'
                            className='text-brightTeal hover:text-white'
                        >
                            Sign Up
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-1'>Or login with</p>
                        <button
                            className='text-brightTeal hover:text-white'
                            onClick={(e) => handleLogin(e, true)}
                        >
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
    );
};
