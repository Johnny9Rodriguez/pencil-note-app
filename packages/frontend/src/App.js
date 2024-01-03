import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, setUser } from './slices/authSlice';
import { setCryptoKey } from './slices/noteDataSlice';
import { useNavigate } from 'react-router-dom';
import { checkAuthentication } from './api/userApi';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Dashboard } from './pages/Dashboard';

export const App = () => {
    const authenticated = useSelector((state) => state.auth.authenticated);

    const initialAuthentication = useRef(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Cookie authentication
    useEffect(() => {
        if (!initialAuthentication.current) {
            const authenticate = async () => {
                const data = await checkAuthentication();

                if (data && data.authenticated) {
                    dispatch(setAuth(true));
                    dispatch(
                        setUser({
                            userId: data.user.userId,
                            username: data.user.username,
                        })
                    );
                    dispatch(setCryptoKey(data.user.key));
                    navigate('/dashboard');
                }
            };

            authenticate();
            initialAuthentication.current = true;
        }
    }, [dispatch, navigate]);

    return (
        <Routes>
            <Route index element={<LoginPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignUpPage />}></Route>
            <Route
                path='/dashboard'
                element={
                    authenticated ? (
                        <Dashboard />
                    ) : (
                        <Navigate to='/login' replace />
                    )
                }
            />
        </Routes>
    );
};
