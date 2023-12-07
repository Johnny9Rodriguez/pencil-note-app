import React from 'react'
import { Icon } from '@iconify/react';
import { Modals } from '../components/Modals';
import { Footer } from '../components/Footer'

export const SignUpPage = () => {
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
                        Sign Up
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
                        <button
                            type='submit'
                            className='self-center w-fit border border-white text-white px-7 py-1 hover:border-brightTeal hover:text-brightTeal'>
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className='flex flex-col gap-2 px-1 py-2 mt-1 text-sm text-white text-opacity-50'>
                    <div className='flex gap-x-2'>
                        <p>Already have an account?</p>
                        <a href="localhost:3000/login" className='text-brightTeal hover:text-white'>Login</a>
                    </div>
                </div>
            </section>
            <footer className='flex mt-6 bg-black'>
                <Footer />
            </footer>
        </div>
    )
}
