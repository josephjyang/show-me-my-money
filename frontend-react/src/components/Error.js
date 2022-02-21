import React from 'react';
import { NavLink } from 'react-router-dom';
import smmm404 from './images/smmm404.jpeg'

function Error() {
    return (
        <div id="missing">
            <img src={smmm404} alt="Show Me My Money Error"/>
            <h2>This Page Isn't Available</h2>
            <span>
                Sorry, the link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.
            </span>
            <NavLink id="error-home" to="/">
                Back to Home
            </NavLink>
        </div>
    );
}

export default Error;
