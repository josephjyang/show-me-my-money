import React from 'react';
import Newsfeed from '../Newsfeed';
import PendingTransactions from '../PendingTransactions';


function MainPage({ loaded }) {
    if (!loaded) {
        return null;
    }

    return (
        <div id="home-content">
            <Newsfeed loaded={loaded} />
            <PendingTransactions loaded={loaded} />
        </div>

    );
}
export default MainPage;
