import { addCategoryAPI, categoryListsAPI, deleteCategoryAPI } from '../../utils/url';
import axios from 'axios';


export const addCategoryQuery = async ({ name, type }) => {
    const response = await axios.post(addCategoryAPI, {
        name, type
    }, {
        withCredentials: true
    });

    return response.data;
};

export const categotyListsQuery = async () => {
    const response = await axios.get(categoryListsAPI, {
        withCredentials: true
    });

    return response.data.categories;
};

export const deleteCategoryQuery = async (id) => {
    const response = await axios.delete(`${deleteCategoryAPI}/${id}`, {
        withCredentials: true
    });

    console.log(`${deleteCategoryAPI}/${id}`);

    return response.data;
};
