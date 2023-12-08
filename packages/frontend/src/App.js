import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Dashboard } from './pages/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from './slices/authSlice'; 

const fakeAuth = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve('2342f2f1d131rf12'), 250);
        // setTimeout(() => resolve(null), 250);
    });

export const App = () => {
    const token = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const token = await fakeAuth();
        dispatch(setAuth(token));
        navigate('/dashboard');
    }

    const handleLogout = () => {
        dispatch(setAuth(null));
        navigate('/login');
    }

    const ProtectedRoute = ({ children }) => {
        if (!token) {
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    return (
            <Routes>
                <Route index element={<LoginPage onLogin={handleLogin} />}></Route>
                <Route path='/login' element={<LoginPage onLogin={handleLogin} />}></Route>
                <Route path='/signup' element={<SignUpPage />}></Route>
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <Dashboard onLogout={handleLogout} />
                        </ProtectedRoute>
                    }>    
                </Route>
            </Routes>
    )
}
