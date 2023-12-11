import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Dashboard } from './pages/Dashboard';
import { useSelector } from 'react-redux';

export const App = () => {
    const token = useSelector((state) => state.auth.authenticated);

    const ProtectedRoute = ({ children }) => {
        if (!token) {
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    return (
            <Routes>
                <Route index element={<LoginPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/signup' element={<SignUpPage />}></Route>
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }>    
                </Route>
            </Routes>
    )
}
