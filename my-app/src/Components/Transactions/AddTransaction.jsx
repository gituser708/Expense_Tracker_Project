import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaDollarSign, FaRegCommentDots, FaWallet, } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import AlertMessage from '../AlertMessage/AlertMessage';
import { categotyListsQuery } from '../../React_Query/categoryQuery/categoryQuery'
import {addTransactionQuery} from '../../React_Query/transactionQuery/transactionQuery';
import '../../style/AddTransaction.css';
import { withAuthProtection } from "../Auth/withAuthProtection";

const validationSchema = Yup.object({
    type: Yup.string()
        .required('Transaction type is required!')
        .oneOf(["income", "expense"]),
    amout: Yup.number()
        .required('Amount is required!')
        .positive('Amount must be positive!'),
    category: Yup.string()
        .required('Category is required!'),
    description: Yup.string(),
});

 function AddTransaction() {
    const [alert, setAlert] = useState(null);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addTransactionQuery,
        mutationKey: ['add-transaction'],
        onMutate: () => {
            setAlert({ type: 'loading', message: 'Please hold on while loading...' });
        },
        onSuccess: () => {
            setTimeout(() => {
                setAlert({ type: 'success', message: 'Transaction Added' });
                setTimeout(() => {
                    setAlert(null);
                    queryClient.invalidateQueries('user');
                    navigate('/transaction-lists');
                }, 2000);
            }, 2000);
        },
        onError: (error) => {
            const message = error?.response?.data?.message || error?.message
                || 'Failed To Add Transaction!';

            setTimeout(() => {
                setAlert({ type: 'error', message });
                setTimeout(() => {
                    setAlert(null);
                }, 2000);
            }, 2000)
        },
    });

    const { data:categories, isLoading, isError, error, isFetched, refetch } = useQuery({
            queryFn: categotyListsQuery,
            queryKey: ['category-lists'],
    });
    
    const formik = useFormik({
        initialValues: {
            type: '',
            amount: '',
            category: '',
            description: '',
        },
        onSubmit: (values) => {
            mutation.mutateAsync(values);
        },
    });

    return (
        <React.Fragment>
            <div className="add-transaction-container">
                {alert && <AlertMessage type={alert.type} message={alert.message} />}

                <form onSubmit={formik.handleSubmit}
                    className="add-transaction-form">
                    
                     <h2>Add Your Transaction</h2>
                    
                    <label htmlFor="type">
                         <FaWallet />
                         <span style={{ marginLeft: '3px' }}>Select Type:</span>
                    </label>
                    <select 
                        name="type"
                        id="type"
                        {...formik.getFieldProps('type')}>
                        <option value=''>Type:</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    {formik.touched.type && formik.errors.type && (
                        <span className='transaction-input-err'>{formik.errors.type}</span>
                    )}

                    <label htmlFor="amount">
                        <FaDollarSign />
                        <span style={{ marginLeft: '3px' }}>Amount:</span>
                    </label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        {...formik.getFieldProps('amount')}
                        placeholder="add transaction amount"
                    />
                    {formik.touched.amount && formik.errors.amount && (
                        <span className='transaction-input-err'>{formik.errors.amount}</span>               
                    )}
                    
                    <label htmlFor="category">
                        <BiCategoryAlt />
                        <span style={{ marginLeft: '3px' }}>Category:</span>
                    </label>
                    <select 
                        name="category"
                        id="category"
                        {...formik.getFieldProps('category')}>
                        <option value=''>Select your category:</option>
                        {categories?.map((category) => {
                            return (
                                <option key={category?._id} value={category?.name}>
                                    {category?.name}
                               </option>
                           ) 
                        })}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                        <span className='transaction-input-err'>{formik.errors.category}</span>               
                    )}

                    <label htmlFor="description">
                        <FaRegCommentDots />
                        <span style={{ marginLeft: '3px' }}>Description:</span>
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        rows={3}
                        {...formik.getFieldProps('description')}
                        placeholder="Write description">
                    </textarea>
                    {formik.touched.description && formik.errors.description && (
                        <span className='transaction-input-err'>{formik.errors.description}</span>               
                    )}

                    <button type="submit" className="add-transaction-btn">
                        Add Transaction
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default withAuthProtection(AddTransaction);