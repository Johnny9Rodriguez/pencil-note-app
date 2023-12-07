import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Dashboard } from './pages/Dashboard';
import store from './store';
import { Provider } from 'react-redux';


export const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/signup' element={<SignUpPage />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
            </Routes>

        </Provider>
    )
}
