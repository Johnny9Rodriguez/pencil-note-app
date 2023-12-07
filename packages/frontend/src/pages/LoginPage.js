import React from 'react'
import { Icon } from '@iconify/react';
import { Modals } from '../components/Modals';
import { Footer } from '../components/Footer'

export const LoginPage = () => {
    return (
        <div className='relative flex flex-col justify-between mx-auto h-screen min-h-480'>
            <Modals />
            <section id='login' className='flex flex-col mx-auto mt-12 w-80'>
                <header className='flex justify-end items-center gap-x-1 pr-3 pb-1'>
                    <Icon icon="material-symbols-light:sticky-note-2-outline-sharp" className='text-brightTeal text-3xl' />
                    <h1 className='text-white text-4xl'>Pencil</h1>
                </header>
                <div className='flex flex-col gap-4 p-4 bg-black bg-opacity-20 border border-darkTeal'>
                    <h2 className='text-white text-3xl'>
                        Login
                    </h2>
                    <form action="" className='flex flex-col gap-4'>
                        <div className='flex py-2 w-full border border-darkTeal'>
                            <Icon icon="material-symbols-light:person" className='self-center w-8 text-2xl text-brightTeal' />
                            <input
                                type="text"
                                name='username'
                                placeholder='Username'
                                className='w-full bg-white bg-opacity-0 text-white'
                                spellCheck='false' />
                        </div>
                        <div className='flex py-2 w-full border border-darkTeal'>
                            <Icon icon="material-symbols:lock-sharp" className='self-center w-8 text-lg text-brightTeal' />
                            <input
                                type="password"
                                name='password'
                                placeholder='Password'
                                className='w-full bg-white bg-opacity-0 text-white'
                                spellCheck='false' />
                        </div>
                        <div className='flex items-center gap-2 px-1'>
                            <input
                                type="checkbox"
                                name='remember-me'
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
                </div>
                <div className='flex flex-col gap-2 px-1 py-2 mt-1 text-sm text-white text-opacity-50'>
                    <div className='flex gap-x-2'>
                        <p>Need an account?</p>
                        <a href="localhost:3000/login" className='text-brightTeal hover:text-white'>Sign up</a>
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-1'>Or login with</p>
                        <button className='text-brightTeal hover:text-white'>demo account</button>
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
