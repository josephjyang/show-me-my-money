const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';
const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';

const loadTransactions = (user, transactions) => ({
    type: LOAD_TRANSACTIONS,
    user,
    transactions
});

const addTransaction = transaction => {
    return {
        type: ADD_TRANSACTION,
        transaction
    }
}

const initialState = {};

export const getTransactions = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friends/transactions`)
    const transactions = await res.json();
    dispatch(loadTransactions(user, transactions));
    return transactions;
}

export const createTransaction = newTransaction => async dispatch => {
    console.log(newTransaction)
    const res = await fetch(`/api/transactions/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTransaction)
    });
    const transaction = await res.json();
    if (res.ok) {
        dispatch(addTransaction(transaction))
        return transaction
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_TRANSACTIONS:
            const transactions = {}
            action.transactions.transactions.forEach(transaction => {
                transactions[transaction.id] = transaction
            })
            return { ...state, ...transactions }
        default:
            return state;
    }
}