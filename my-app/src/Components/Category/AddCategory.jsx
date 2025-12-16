import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {FaWallet} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect, useNavigate } from 'react-router-dom';
import AlerMessage from '../AlertMessage/AlertMessage';
import '../../style/AddCategory.css';
import { addCategoryQuery, categotyListsQuery, deleteCategoryQuery }
    from "../../React_Query/categoryQuery/categoryQuery";
import { withAuthProtection } from "../Auth/withAuthProtection";


const validationSchema = Yup.object({
    name: Yup.string()
        .required('Category name is required!'),
    type: Yup.string()
        .required('Category type is required!')
        .oneOf(["income", "expense"])
});

function AddCategory() {
    const [alert, setAlert] = useState(null);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: addCategoryQuery,
        mutationKey: ['add-category'],
        onMutate: () => {
            setAlert({ type: 'loading', message: 'Please hold on while loading...' });
        },
        onSuccess: () => {
            setTimeout(() => {
                setAlert({ type: 'success', message: 'Category Added' });
                setTimeout(() => {
                    setAlert(null);
                    queryClient.invalidateQueries('user');
                    navigate('/category-lists');
                }, 2000);
            }, 2000);
        },
        onError: (error) => {
            const message = error?.response?.data?.message || error?.message
                || 'Failed To Add Category!';

            setTimeout(() => {
                setAlert({ type: 'error', message });
                setTimeout(() => {
                    setAlert(null);
                }, 2000);
            }, 2000)
        },
    });

    

    const formik = useFormik({
        initialValues: {
            name: '',
            type: ''
        },
        validationSchema,
        onSubmit: (values) => {
            mutation.mutateAsync(values);
        },
    });

    return (
        <React.Fragment>
            <div className="add-category-container">
                {alert && <AlerMessage type={alert.type} message={alert.message} />}

                <form onSubmit={formik.handleSubmit}
                    className="add-category-form">
                    <h2>Add New Category</h2>

                    <label htmlFor="name">
                        <SiDatabricks />
                        <span style={{ marginLeft: '3px' }}>Name:</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...formik.getFieldProps('name')}
                        placeholder="Add your category name"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <span className="category-input-err">{formik.errors.name}</span>
                    )}

                    <label htmlFor="type">
                        <FaWallet />
                        <span style={{ marginLeft: '3px' }}>Type:</span>
                    </label>
                    <select
                        name="type"
                        id="type"
                        {...formik.getFieldProps('type')}>
                        <option value="">Selecet transaction type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    {formik.touched.type && formik.errors.type && (
                        <span className="category-input-err">{formik.errors.type}</span>
                    )}

                    <button type="submit" className="add-category-btn">
                        Add Category
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default withAuthProtection(AddCategory);