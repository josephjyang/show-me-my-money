const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';
const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';
const REMOVE_TRANSACTION = 'transactions/REMOVE_TRANSACTION';

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

const removeTransaction = transaction => {
    return {
        type: REMOVE_TRANSACTION,
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

export const deleteTransaction = transaction => async dispatch => {
    const res = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(removeTransaction(transaction))
        return data
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
        case REMOVE_TRANSACTION:
            delete newState[action.transaction.id]
            return newState;
        default:
            return state;
    }
}