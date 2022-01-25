import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './DemoLoginButton.css'

function DemoLoginButton() {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();
        const email = "rod.tidwell85"
        const password = "password"
        await dispatch(login(email, password));
        history.push("/")
    }

    return (
        <form onSubmit={onSubmit}>
            <button id="demo-login" type="submit">Demo Log In</button>
        </form>
    )
}

export default DemoLoginButton
