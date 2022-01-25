import React from 'react';
import Newsfeed from '../Newsfeed';
import PendingTransactions from '../PendingTransactions';


function MainPage() {
    return (
        <div id="content">
            <Newsfeed />
            <PendingTransactions />
        </div>
    );
}
export default MainPage;
