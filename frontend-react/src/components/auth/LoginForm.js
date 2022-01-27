import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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

    if (user) return <Redirect to='/' />;

    return (
        <>
            <form id="log-in-form" onSubmit={onLogin}>
                <h3 id="log-in-header">Sign in to Show Me My Money!</h3>
                <div id="error-container">
                    <div id="login-errors">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                </div>
                <div className="login-field">
                    {credential && <label htmlFor='credential'>Email or Username</label>}
                    <input
                        name='credential'
                        type='text'
                        placeholder='Email or username'
                        value={credential}
                        onChange={updateCredential}
                    />
                </div>
                <div className="login-field">
                    {password && <label htmlFor='password'>Password</label>}
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                <button id="login-submit" type='submit'>Sign in</button>
            </form>
        </>
    );
};

export default LoginForm