import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Dashboard } from './pages/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, setUser } from './slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const App = () => {
    const token = useSelector((state) => state.auth.authenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Cookie authentication
    useEffect(() => {
        fetch('http://localhost:3001/api/auth-check', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(jsonData => {
                if (jsonData.success) {
                    dispatch(setAuth(true));
                    dispatch(setUser({ id: jsonData.user.id, username: jsonData.user.username }))
                    navigate('/dashboard');
                }
            })
            .catch(err => console.error('Error: ', err));
    }, [dispatch, navigate]);

    // This implementation causes the useEffect in Dashboard.js to load multiple times.
    // const ProtectedRoute = ({ children }) => {
    //     if (!token) {
    //         return <Navigate to="/login" replace />;
    //     }

    //     return children;
    // };

    return (
        <Routes>
            <Route index element={<LoginPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignUpPage />}></Route>
            <Route
                path="/dashboard"
                element={
                    token ? (
                        <Dashboard />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        </Routes>
    )
}
