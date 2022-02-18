import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DemoLoginButton from "../DemoLoginButton";
import LoginFormModal from "../auth/LoginFormModal";

function MobileDropdown() {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        return setShowMenu(true)
    }

    
    useEffect(() => {
        if (!showMenu) return;
        
        const closeMenu = (e) => {
            const protectedElement = document.getElementById('demo-login');
            const protect = protectedElement.contains(e.target);
            if (!protect) setShowMenu(false);
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    return (
        <>
            <div onClick={openMenu} id="mobile-icon" >
                <i className="fa-solid fa-bars"/>
            </div>
            {showMenu && (
                <div id="mobile-dropdown">
                    <div>
                        <DemoLoginButton />
                    </div>
                    <div>
                        <NavLink to='/login' exact={true} activeClassName='active'>
                            Login
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/sign-up' exact={true} activeClassName='active'>
                            Create an Account
                        </NavLink>
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileDropdown
