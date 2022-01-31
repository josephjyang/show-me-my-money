import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignUpForm.css'

const SignUpForm = () => {
    const [backErrors, setBackErrors] = useState([])
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSignUp = async e => {
        e.preventDefault();
        if (!username) errors.username = "Username is required"
        if (!email) errors.email = "Email is required"
        if (!firstName) errors.firstName = "First Name is required"
        if (!lastName) errors.firstName = "Last Name is required"
        if (!password) errors.password = "Password is required"
        if (!confirmPassword) errors.cpassword = "Confirm Password is required"
        setErrors({ ...errors })
        if (Object.keys(errors).length > 0) return
        if (password === confirmPassword) {
            const newUser = new FormData()
            newUser.append("image", image)
            newUser.append("username", username)
            newUser.append("email", email)
            newUser.append("password", password)
            newUser.append("first_name", firstName)
            newUser.append("last_name", lastName)
            newUser.append("balance", 1000)
            const data = await dispatch(signUp(newUser));
            if (data) {
                setBackErrors(data);
            } else history.push("/")
        } else return
    }

    const updateUsername = (e) => {
        setUsername(e.target.value);
        if (e.target.value.length > 40) errors.username = "Username must be 40 characters or fewer"
        else if (e.target.value.length < 5) errors.username = "Username must be at least five characters"
        else delete errors.username
    };

    const validateEmail = email => {
        const validRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (email.match(validRegex)) return true;
        else return false;
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length > 255) errors.email = "Email must be 255 characters or fewer"
        else if (e.target.value.length <= 6) errors.email = "Email must be at least six characters"
        else if (!validateEmail(e.target.value)) errors.email = "Please enter a valid email address"
        else delete errors.email
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length === 0) {
            errors.password = "Password is required"
        } else delete errors.password
    };

    const updateConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value.length === 0) errors.cpassword = "Confirm Password is required"
        else if (password !== e.target.value) errors.cpassword = "Password and Confirm Password must match"
        else delete errors.cpassword
    };

    const updateFirstName = e => {
        setFirstName(e.target.value);
        if (e.target.value.length > 100) errors.firstName = "First Name must be 100 characters or fewer"
        else if (e.target.value.length === 0) errors.firstName = "First Name is required"
        else delete errors.firstName
    };

    const updateLastName = (e) => {
        setLastName(e.target.value);
        if (e.target.value.length > 100) errors.lastName = "Last Name must be 100 characters or fewer"
        else if (e.target.value.length === 0) errors.lastName = "Last Name is required"
        else delete errors.lastName
    };

    const updateProfilePic = e => {
        const file = e.target.files[0];
        setImage(file);
    }

    if (user) return <Redirect to="/" />;

    return (
        <div id="sign-up-ctr">
            <form id="sign-up-form" onSubmit={onSignUp}>
                <h3>Create a Show Me My Money Account</h3>
                {backErrors.length > 0 && (<div id="backend-errors">
                    {backErrors.map((error, ind) => (
                        <div key={ind}>Error: {error.length > 1 ? error.split(":")[1] : error.split(":")[0]}</div>
                    ))}
                </div>)}
                <div className="signup-field-ctr">
                    {username &&
                        <label className="signup-label" htmlFor="username">Username</label>
                    }
                    <input
                        className={errors.username ? "error signup-field" : "signup-field"}
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                        required={true}
                    />
                    {errors.username && <p className="signup-error">{errors.username}</p>}
                </div>
                <div className="signup-field-ctr">
                    {email &&
                        <label className="signup-label" htmlFor="email">Email</label>
                    }
                    <input
                        className={errors.email ? "error signup-field" : "signup-field"}
                        type='text'
                        placeholder="Email"
                        name='email'
                        onChange={updateEmail}
                        value={email}
                        required={true}
                    />
                    {errors.email && <p className="signup-error">{errors.email}</p>}
                </div>
                <div className="signup-field-ctr">
                    {firstName &&
                        <label className="signup-label" htmlFor="firstName">First Name</label>
                    }
                    <input
                        className={errors.firstName ? "error signup-field" : "signup-field"}
                        placeholder="First Name"
                        type='text'
                        name='firstName'
                        onChange={updateFirstName}
                        value={firstName}
                        required={true}
                    />
                    {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
                </div>
                <div className="signup-field-ctr">
                    {lastName &&
                        <label className="signup-label" htmlFor="lastName">Last Name</label>
                    }
                    <input
                        className={errors.lastName ? "error signup-field" : "signup-field"}
                        type='text'
                        placeholder="Last Name"
                        name='lastName'
                        onChange={updateLastName}
                        value={lastName}
                        required={true}
                    />
                    {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
                </div>
                <div className="signup-field-ctr">
                    {password &&
                        <label className="signup-label" htmlFor="password">Password</label>
                    }
                    <input
                        className={errors.password ? "error signup-field" : "signup-field"}
                        type='password'
                        placeholder="Password"
                        name='password'
                        onChange={updatePassword}
                        value={password}
                        required={true}
                    />
                    {errors.password && <p className="signup-error">{errors.password}</p>}
                </div>
                <div className="signup-field-ctr">
                    {confirmPassword &&
                        <label className="signup-label" htmlFor="confirmPassword">Confirm Password</label>
                    }
                    <input
                        className={errors.cpassword ? "error signup-field" : "signup-field"}
                        type='password'
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        onChange={updateConfirmPassword}
                        value={confirmPassword}
                        required={true}
                    />
                    {errors.cpassword && <p className="signup-error">{errors.cpassword}</p>}
                </div>
                <div className="signup-field-ctr">
                    <label className="signup-label" htmlFor="image">Profile Picture</label>
                    <input
                        className="signup-field"
                        type='file'
                        accept="image/*"
                        placeholder="Profile Picture URL"
                        name='image'
                        onChange={updateProfilePic}
                    />
                </div>
                <button type="submit" id='sign-up-submit-button'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;