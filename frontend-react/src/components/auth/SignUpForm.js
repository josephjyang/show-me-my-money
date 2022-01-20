import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async e => {
        e.preventDefault();
        if (password === confirmPassword) {
            const newUser = {
                username,
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                profile_pic: profilePic

            }
            const data = await dispatch(signUp(newUser));
            if (data) {
                setErrors(data);
            }
        }
    }

    const updateUsername = e => setUsername(e.target.value);
    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateConfirmPassword = e => setConfirmPassword(e.target.value);
    const updateFirstName = e => setFirstName(e.target.value);
    const updateLastName = e => setLastName(e.target.value);
    const updateProfilePic = e => setProfilePic(e.target.value);

    if (user) return <Redirect to="/" />;

    return (
        <form onSubmit={onSignUp}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>User Name</label>
                <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                    required={true}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type='text'
                    name='email'
                    onChange={updateEmail}
                    value={email}
                    required={true}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                    required={true}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type='password'
                    name='confirmPassword'
                    onChange={updateConfirmPassword}
                    value={confirmPassword}
                    required={true}
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;