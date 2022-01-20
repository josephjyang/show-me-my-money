const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';

const loadTransactions = (user, transactions) => ({
    type: LOAD_TRANSACTIONS,
    user,
    transactions
});

const initialState = {};

export const getTransactions = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friends/transactions`)
    const transactions = await res.json();
    dispatch(loadTransactions(user, transactions));
    return transactions;
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_TRANSACTIONS:
            const transactions = {}
            console.log(action.transactions.transactions)
            action.transactions.transactions.forEach(transaction => {
                transactions[transaction.id] = transaction
            })
            console.log(transactions, "TESTING")
            return { ...state, ...transactions }
        default:
            return state;
    }
}