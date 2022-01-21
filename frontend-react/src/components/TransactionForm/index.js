import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { createTransaction } from "../../store/transactions";
import SearchBar from "../Search";

const TransactionForm = () => {
    const [backErrors, setBackErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [friend, setFriend] = useState('');
    const [amount, setAmount] = useState('');
    const [details, setDetails] = useState('');
    const [isPayment, setIsPayment] = useState(true);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()

    const submitPayment = async e => {
        e.preventDefault();
        if (amount <= 0 || typeof parseInt(amount, 10) !== "number") errors.amount = "Enter a value greater than $0!"
        if (!friend) errors.friend = "Enter a recipient"
        if (!details) errors.details = "Enter some details regarding the payment"
        setErrors({ ...errors })
        if (Object.keys(errors).length > 0) return;
        let payer_id = user.id;
        let payee_id = friend.id;

        const newTransaction = {
            payer_id,
            payee_id,
            creator_id: user.id,
            amount,
            details,
            paid: isPayment
        }
        const data = await dispatch(createTransaction(newTransaction));
        if (data.errors) setBackErrors(data.errors)
        else history.push("/home")
    }

    const submitRequest = async e => {
        e.preventDefault();
        if (amount <= 0 || typeof parseInt(amount, 10) !== "number") errors.amount = "Enter a value greater than $0!"
        if (!friend) errors.friend = "Enter a recipient"
        if (!details) errors.details = "Enter some details regarding the payment"
        setErrors({ ...errors })
        if (Object.keys(errors).length > 0) return;
        let payer_id = friend.id;
        let payee_id = user.id;
        const newTransaction = {
            payer_id,
            payee_id,
            creator_id: user.id,
            amount,
            details,
            paid: isPayment
        }
        const data = await dispatch(createTransaction(newTransaction));
        if (data.errors) setBackErrors(data.errors)
        else history.push("/home")
    }

    const updateAmount = (e) => {
        setAmount(e.target.value);
        if (typeof parseInt(e.target.value) !== "number" || e.target.value <= 0) errors.amount = "Enter a value greater than $0!"
        else delete errors.amount
    };

    const updateDetails = (e) => {
        setDetails(e.target.value);
        if (e.target.value.length <= 0) errors.details = "Enter some details regarding the payment"
        else delete errors.email
    };

    
    return (
        <div>
            <div>
                {backErrors?.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                {errors.amount && <p className="transaction-error">{errors.amount}</p>}
                <input
                    className={errors.amount ? "error transaction-field" : "transaction-field"}
                    type='text'
                    placeholder='0'
                    name='amount'
                    onChange={updateAmount}
                    value={amount}
                    required={true}
                />
            </div>
            <div>
                <label htmlFor="friend">To</label>
                {!friend && <SearchBar friend={friend} setFriend={setFriend}/>}
                {friend && <div>{friend.first_name} {friend.last_name}<i onClick={() => setFriend('')}className="fas fa-times"/></div>}
            </div>
            <div>
                {errors.details && <p className="transaction-error">{errors.details}</p>}
                <label htmlFor="details">Note</label>
                <input
                    className={errors.details ? "error transaction-field" : "transaction-field"}
                    type='text'
                    name='details'
                    onChange={updateDetails}
                    value={details}
                    required={true}
                />
            </div>
            <button type="button" onClick={async (e) => {
                await setIsPayment(true);
                submitPayment(e)
                }}>Pay</button>
            <button type="button" onClick={async (e) => {
                await setIsPayment(false);
                submitRequest(e)
            }}>Request</button>
        </div>
    );
};

export default TransactionForm;