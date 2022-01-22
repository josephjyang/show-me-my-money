import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import LogoutButton from "../auth/LogoutButton";

function ProfileButton() {
    const user = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return;
        return setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    return (
        <>
            <div onClick={openMenu} id="profile-icon" >
                <i className="fas fa-bars"/>
            </div>
            {showMenu && (
            <ul className="profile-dropdown">
                <li id="user-info">
                    <img id="user-picture" src={user.profile_pic} alt="user" />
                    <div id="user-name">
                        <span>{user.first_name} {user.last_name}</span>
                            <span>Balance: ${Intl.NumberFormat('en-US').format(user.balance)}</span>
                        <span id="email">@{user.username}</span>
                    </div>
                </li>
                <LogoutButton />
            </ul>
            )}
        </>
    )
}

export default ProfileButton
