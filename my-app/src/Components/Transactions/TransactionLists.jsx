import React, { useState } from "react";
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import { listTransactionQuery, deleteTransactionQuery } from "../../React_Query/transactionQuery/transactionQuery";
import { categotyListsQuery } from '../../React_Query/categoryQuery/categoryQuery';
import AlertMessage from "../AlertMessage/AlertMessage";
import '../../style/TransactionLists.css';
import { withAuthProtection } from "../Auth/withAuthProtection";

function TransactionLists() {
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        type: '',
        category: ''
    });

    const [deletingId, setDeletingId] = useState(null);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const { data: categories } = useQuery({
        queryFn: categotyListsQuery,
        queryKey: ['category-lists']
    });

    const {
        data: transactions,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryFn: () => listTransactionQuery(filters),
        queryKey: ['transactions-lists', filters],
    });

    const {
        mutateAsync,
        isPending,
        error: transactionDelErr,
        isSuccess
    } = useMutation({
        mutationFn: deleteTransactionQuery,
        mutationKey: ['delete-transaction']
    });

    const handleTransactionDelete = (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            setDeletingId(id);
            mutateAsync(id)
                .then(() => refetch())
                .catch(console.log)
                .finally(() => setDeletingId(null));
        }
    };

    return (
        <React.Fragment>
            <div className="transactions-container">
                <h2>Your Transactions</h2>

                {/* Global Alert for Deletion */}
                {isPending && <AlertMessage type="loading" message="Deleting transaction..." />}
                {isSuccess && <AlertMessage type="success" message="Transaction deleted!" />}
                {transactionDelErr && <AlertMessage type="error" message={transactionDelErr?.response?.data?.message || 'Error deleting transaction'} />}

                <div className="transaction-filters">
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />

                    <label htmlFor="endDate">End Date</label>
                    <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />

                    <label htmlFor="type">Type</label>
                    <select name="type" value={filters.type} onChange={handleFilterChange}>
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <label htmlFor="category">Category</label>
                    <select name="category" value={filters.category} onChange={handleFilterChange}>
                        <option value="">All Categories</option>
                        <option value="Uncategorized">Uncategorized</option>
                        {categories?.map((cat) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="transaction-lists-container">
                    <h3>Filtered Transactions</h3>
                    <ul className="transaction-lists">
                        {Array.isArray(transactions) && transactions.length === 0 ? (
                            <div className="no-transactions">No transactions found!</div>
                        ) : (
                            transactions?.map((transaction) => (
                                <li key={transaction._id}>
                                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                                    <span className="transaction-type-badge"
                                        style={{
                                            color: transaction.type === 'income' ? 'green' : 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                    </span>
                                    <span>{transaction.category?.name || transaction.category}</span>
                                    <span>${transaction.amount.toLocaleString()}</span>
                                    <span>{transaction.description}</span>

                                    <span className="transaction-delete-icon"
                                        onClick={() => handleTransactionDelete(transaction._id)}>
                                        <FaTrash color="red" cursor="pointer" size={20} />
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withAuthProtection(TransactionLists);