import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppProvider from './context/AppContext';
import { ModalProvider } from './context/Modal';
import App from './App'
import configureStore from './store';
import './index.css'
import Div100vh from 'react-div-100vh';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <Provider store={store}>
                <ModalProvider>
                    <BrowserRouter>
                        <Div100vh>
                            <App />
                        </Div100vh>
                    </BrowserRouter>
                </ModalProvider>
            </Provider>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
)