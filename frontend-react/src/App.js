import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashNavBar from './components/SplashNavBar';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/UserPage/User';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import Newsfeed from './components/Newsfeed';
import TransactionForm from './components/TransactionForm';
import Transaction from './components/Transaction';
import { authenticate } from './store/session';

function App() {
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true)
        })();
    }, [dispatch])

    if (!loaded) {
        return null;
    }

    if (user) {
        return (
            <>
                <NavBar />
                {loaded && (
                    <Switch>
                        <ProtectedRoute path='/users' exact={true}>
                            <UsersList />
                        </ProtectedRoute>
                        <ProtectedRoute path='/users/:userId' exact={true}>
                            <User />
                        </ProtectedRoute>
                        <ProtectedRoute path='/' exact={true}>
                            <Newsfeed />
                        </ProtectedRoute>
                        <ProtectedRoute path='/pay'>
                            <TransactionForm />
                        </ProtectedRoute>
                        <ProtectedRoute path='/transactions/:transactionId/edit'>
                            <TransactionForm />
                        </ProtectedRoute>
                        <ProtectedRoute path='/transactions/:transactionId'>
                            <Transaction />
                        </ProtectedRoute>
                    </Switch>
                )}
            </>
        );
    } else {
        return (
            <>
                <SplashNavBar />
                {loaded && (
                    <Switch>
                        <Route path='/' exact={true}>
                            <SplashPage />
                        </Route>
                        <Route path='/about' exact={true}>

                        </Route>
                        <Route path='/login' exact={true}>
                            <LoginForm />
                        </Route>
                        <Route path='/sign-up' exact={true}>
                            <SignUpForm />
                        </Route>
                    </Switch>
                )}
            </>
        )
    }
}

export default App;