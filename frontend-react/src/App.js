import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashNavBar from './components/SplashNavBar';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import SplashPage from './components/SplashPage';
import About from './components/About';
import TransactionForm from './components/TransactionForm';
import Transaction from './components/Transaction';
import MainPage from './components/MainPage';
import UserProfile from './components/UserProfile';
import Friends from './components/Friends';
import Chats from './components/Chats';
import Error from './components/Error';
import PendingTransactions from './components/PendingTransactions';
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
            <div id="main-content">
                <NavBar loaded={loaded}/>
                {loaded && (
                    <Switch>
                        <ProtectedRoute path='/users' exact={true} >
                            <UsersList loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/friends' exact={true} >
                            <Friends loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/users/:userId' exact={true} >
                            <UserProfile loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/users/:userId/pay' exact={true}>
                            <TransactionForm loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/' exact={true} >
                            <MainPage loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/pay' >
                            <TransactionForm loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/transactions/:transactionId/edit' >
                            <TransactionForm loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/transactions/:transactionId' >
                            <Transaction loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/messages' >
                            <Chats loaded={loaded}/>
                        </ProtectedRoute>
                        <ProtectedRoute path='/notifications' >
                            <PendingTransactions loaded={loaded} />
                        </ProtectedRoute>
                        <ProtectedRoute path='/'>
                            <Error />
                        </ProtectedRoute>
                    </Switch>
                )}
            </div>
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
                            <About />
                        </Route>
                        <Route path='/login' exact={true}>
                            <LoginForm />
                        </Route>
                        <Route path='/sign-up' exact={true}>
                            <SignUpForm />
                        </Route>
                        <Route path='/'>
                            <Error />
                        </Route>
                    </Switch>
                )}
            </>
        )
    }
}

export default App;