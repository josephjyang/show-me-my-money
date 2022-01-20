import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import DemoLoginButton from '../DemoLoginButton';

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async e => {
        e.preventDefault();
        const data = await dispatch(login(credential, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateCredential = e => setCredential(e.target.value);
    const updatePassword = e => setPassword(e.target.value);

    if (user) return <Redirect to='/home' />;

    return (
        <>
            <NavLink to='/' exact={true} activeClassName='active'>
                <img src="/smmm-logo.png" alt="smmm logo" id="smmm-logo" />
            </NavLink>
            <DemoLoginButton />
            <form onSubmit={onLogin}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor='credential'>Email/Username</label>
                    <input
                        name='credential'
                        type='text'
                        placeholder='Email or username'
                        value={credential}
                        onChange={updateCredential}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                    <button type='submit'>Login</button>
                </div>
            </form>
        </>
    );
};

export default LoginForm