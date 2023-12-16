import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, setUser } from './slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { checkAuthentication } from './api/userApi';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Dashboard } from './pages/Dashboard';

export const App = () => {
    const token = useSelector((state) => state.auth.authenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Cookie authentication
    useEffect(() => {
        const authenticate = async () => {
            const data = await checkAuthentication();

            if (data && data.authenticated) {
                dispatch(setAuth(true));
                dispatch(
                    setUser({ id: data.user.id, username: data.user.username })
                );
                navigate('/dashboard');
            }
        };

        authenticate();
    }, [dispatch, navigate]);

    return (
        <Routes>
            <Route index element={<LoginPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignUpPage />}></Route>
            <Route
                path='/dashboard'
                element={
                    token ? <Dashboard /> : <Navigate to='/login' replace />
                }
            />
        </Routes>
    );
};
