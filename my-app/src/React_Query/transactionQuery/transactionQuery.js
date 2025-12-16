import axios from 'axios';
import {
    addTransactionAPI,
    transactionListsAPI,
    updateTransactionAPI,
    deleteTransactionAPI
} from '../../utils/url';


export const addTransactionQuery = async ({ type, amount, category, description }) => {
    const response = await axios.post(`${addTransactionAPI}`, {
        type, amount, category, description
    }, {
        withCredentials: true
    });

    return response.data;
};


export const listTransactionQuery = async ({category,type,startDate,endDate}) => {
    const response = await axios.get(transactionListsAPI, {
        params: { category, type, startDate, endDate },
        withCredentials: true
    });
    return response.data;
};

export const deleteTransactionQuery = async (id) => {
    const response = await axios.delete(`${deleteTransactionAPI}/${id}`, {
        withCredentials: true
    });
    console.log(`${deleteTransactionAPI}/${id}`);
    return response.data;
};
