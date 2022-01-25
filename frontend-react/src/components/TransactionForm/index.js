import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import { createTransaction, updateTransaction } from "../../store/transactions";
import SearchBar from "../Search";
import './TransactionForm.css';

const TransactionForm = () => {
    const user = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const transactions = useSelector(state => state.transactions)
    const { transactionId, userId } = useParams();
    let transaction
    if (transactionId) transaction = transactions[transactionId]
    const [backErrors, setBackErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [friend, setFriend] = useState(userId ? users[userId] : transactionId ? transaction.creator_id === transaction.payer_id ? transaction.payee : transaction.payer : '');
    const [amount, setAmount] = useState(transactionId ? transaction.amount : '');
    const [details, setDetails] = useState(transactionId ? transaction.details : '');
    const dispatch = useDispatch();
    const history = useHistory()

    const submitPayment = async () => {
        if (amount <= 0 || typeof parseInt(amount, 10) !== "number") errors.amount = "Enter a value greater than $0!"
        if (!friend) errors.friend = "Enter a recipient"
        if (!details) errors.details = "Enter some details regarding the payment"
        setErrors({ ...errors })
        if (Object.keys(errors).length > 0) return;
        let payer_id = user.id;
        let payee_id = friend.id;
        if (transaction) {
            transaction.payer_id = payer_id;
            transaction.payee_id = payee_id;
            transaction.amount = amount;
            transaction.details = details;
            transaction.paid = true
            const data = await dispatch(updateTransaction(transaction));
            if (data.errors) setBackErrors(data.errors)
            else {
                history.push("/")
                return
            }
        }

        const newTransaction = {
            payer_id,
            payee_id,
            creator_id: user.id,
            amount,
            details,
            paid: true
        }
        const data = await dispatch(createTransaction(newTransaction));
        if (data.errors) setBackErrors(data.errors)
        else history.push("/")
    }

    const submitRequest = async () => {
        if (amount <= 0 || typeof parseInt(amount, 10) !== "number") errors.amount = "Enter a value greater than $0!"
        if (!friend) errors.friend = "Enter a recipient"
        if (!details) errors.details = "Enter some details regarding the payment"
        setErrors({ ...errors })
        if (Object.keys(errors).length > 0) return;
        let payer_id = friend.id;
        let payee_id = user.id;

        if (transaction) {
            transaction.payer_id = payer_id;
            transaction.payee_id = payee_id;
            transaction.amount = amount;
            transaction.details = details;
            transaction.paid = false;
            const data = await dispatch(updateTransaction(transaction));
            if (data.errors) setBackErrors(data.errors)
            else {
                history.push("/")
                return
            }
        }

        const newTransaction = {
            payer_id,
            payee_id,
            creator_id: user.id,
            amount,
            details,
            paid: false
        }
        const data = await dispatch(createTransaction(newTransaction));
        if (data.errors) setBackErrors(data.errors)
        else history.push("/")
    }

    const updateAmount = (e) => {
        setAmount(e.target.value);
        if (isNaN(parseInt(e.target.value)) || e.target.value <= 0) errors.amount = "Enter a value greater than 0!"
        else delete errors.amount
    };

    const updateDetails = (e) => {
        setDetails(e.target.value);
        if (e.target.value.length <= 0) errors.details = "Enter some details regarding the payment"
        else delete errors.details
    };


    return (
        <div id="transaction-form-container">
            <div id="transaction-form">
                <div>
                    {backErrors?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div id="amount-container">
                    <div id="transaction-amount">
                        <span>$</span>
                        <input
                            className={errors.amount ? "error transaction-field" : "transaction-field"}
                            id="transaction-amount-field"
                            type='text'
                            placeholder='0'
                            name='amount'
                            onChange={updateAmount}
                            value={amount}
                            required={true}
                        />
                    </div>
                    {errors.amount && <p className="transaction-error">{errors.amount}</p>}
                </div>
                <div id="recipient-container">
                    <div id="transaction-recipient">
                        <label htmlFor="friend">To</label>
                        {!friend && <SearchBar friend={friend} setFriend={setFriend} errors={errors} />}
                        {friend && <div className="recipient-container"><div className="recipient-name">{friend.first_name} {friend.last_name}</div>
                            <i onClick={() => {
                                setFriend('');
                                errors.friend = "Enter a recipient"
                            }} className="fas fa-times" /></div>}
                    </div>
                    {errors.friend && <p className="transaction-error">{errors.friend}</p>}
                </div>
                <div id="details-container">
                    <div id="transaction-details-container">
                        <label htmlFor="details">Note</label>
                        <textarea
                            className={errors.details ? "error transaction-field" : "transaction-field"}
                            id="transaction-details"
                            type='text'
                            name='details'
                            onChange={updateDetails}
                            value={details}
                            required={true}
                        />
                    </div>
                    {errors.details && <p className="transaction-error">{errors.details}</p>}
                </div>
                <div id="transaction-buttons">
                    <button id="payment-button" type="button" onClick={submitPayment}>Pay</button>
                    <button id="request-button" type="button" onClick={submitRequest}>Request</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;