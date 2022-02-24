import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppProvider from './context/AppContext';
import { ModalProvider } from './context/Modal';
import App from './App'
import configureStore from './store';
import './index.css'

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <Provider store={store}>
                <ModalProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ModalProvider>
            </Provider>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
)