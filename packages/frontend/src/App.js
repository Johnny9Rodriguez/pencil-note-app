import React from 'react'
import { Dashboard } from './pages/Dashboard'
import store from './store';
import { Provider } from 'react-redux';


export const App = () => {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    )
}
