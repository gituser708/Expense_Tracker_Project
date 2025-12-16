import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutQuery, profileQuery } from '../../React_Query/userQuery/userQuery';
import {  useDispatch } from 'react-redux';
import { logoutAction } from '../../Reudx/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../AlertMessage/AlertMessage';
import '../../style/Profile.css';
import { withAuthProtection } from "../Auth/withAuthProtection";

 function Profile() {
    const [logoutLoading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: profileQuery,
        queryKey: ['profile']
    });

    const {mutate: logoutMutate} = useMutation({
        mutationFn: logoutQuery,
        mutationKey: ['logout'],
        onSuccess: () => {
            setLoading(true);
            setTimeout(() => {
                queryClient.removeQueries(['me']);
                queryClient.removeQueries(['profile']);
                dispatch(logoutAction());
                navigate('/');
            }, 2000);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const logoutHandler = async () => {
        if (confirm('Are you really want to logut?')) {
            logoutMutate();
        };
    };

    return (
        <React.Fragment>
            {logoutLoading && (
                <p className="logout-loading">logging out...</p>
            )}

            {isLoading && (
                <AlertMessage type='loading' message='fetching data...' />
            )}

            {isError && (
                <AlertMessage type='error' message={error?.response?.data?.message ||
                    'Error to fetch data!'} />
            )}

            <div className="profile">
                <img
                    className="profile-picture" 
                    src={data?.user?.profilePic}
                    alt="img"
                />
                <div className="user-details">
                    <h3 className="username">{data?.user?.username}</h3>
                    <h3>Email: <span>{data?.user?.email}</span></h3>
                    <h3>Age: <span>{data?.user?.age}</span></h3>
                    <h3>Gender: <span>{data?.user?.gender}</span></h3>
                    <h3>Created On:
                        <span> {new Date(data?.user?.createdAt).toLocaleString()}</span>
                    </h3>
                </div>
                <button onClick={logoutHandler} className="logout-btn">
                    Logout
                </button>
            </div>
        </React.Fragment>
    );
};

export default withAuthProtection(Profile);