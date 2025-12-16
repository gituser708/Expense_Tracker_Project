import React, { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import AlertMessage from '../AlertMessage/AlertMessage';
import '../../style/CategoryList.css';
import {
    categotyListsQuery,
    deleteCategoryQuery
} from "../../React_Query/categoryQuery/categoryQuery";
import { withAuthProtection } from "../Auth/withAuthProtection";

function CategoryList() {
    const [deletingId, setDeletingId] = useState(null);

    const {
        data: categories,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryFn: categotyListsQuery,
        queryKey: ['category-lists'],
    });

    const {
        mutateAsync,
        isPending,
        error: categoryDelError,
        isSuccess
    } = useMutation({
        mutationFn: deleteCategoryQuery,
        mutationKey: ['delete-category']
    });

    const handleCategoryDelete = (id) => {
        if (confirm('Are you sure? Transactions under this category will also be deleted.')) {
            setDeletingId(id);
            mutateAsync(id)
                .then(() => refetch())
                .catch(console.log)
                .finally(() => setDeletingId(null));
        }
    };

    return (
        <React.Fragment>
            <div className="categoty-lists-container">
                {isLoading && <AlertMessage type='loading' message='Hold on! Fetching...' />}
                {isError && <AlertMessage type='error' message={error?.response?.data?.message || 'Error fetching categories'} />}

                {/* Global delete status alert */}
                {isPending && <AlertMessage type="loading" message="Deleting category..." />}
                {isSuccess && <AlertMessage type="success" message="Category deleted!" />}
                {categoryDelError && <AlertMessage type="error" message={categoryDelError?.response?.data?.message || 'Error deleting category'} />}

                <h2>Your Categories</h2>
                <ul className="categoty-lists">
                    {categories?.map((category) => (
                        <li key={category?._id} className="category-items">
                            <span>{category?.name}</span>
                            <span style={
                                category?.type === 'income'
                                    ? { backgroundColor: 'lightgreen', color: 'black' }
                                    : { backgroundColor: 'red', color: 'white' }
                            }>
                                {category?.type?.charAt(0).toUpperCase() + category?.type?.slice(1)}
                            </span>
                            <span>{new Date(category?.createdAt).toDateString()}</span>
                            <button className="category-delete-btn" onClick={() => handleCategoryDelete(category?._id)}>
                                <FaTrash size={22} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
};

export default withAuthProtection(CategoryList);
