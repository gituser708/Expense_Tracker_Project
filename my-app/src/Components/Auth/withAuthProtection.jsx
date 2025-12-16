import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../Reudx/Slices/authSlice";
import { useMeQuery } from "../../utils/useMeQuery";

export function withAuthProtection(WrappedComponent) {
  return function ProtectedComponent(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const { data: meUser, isSuccess, isLoading } = useMeQuery();

    useEffect(() => {
      if (isSuccess && meUser && !user) {
        dispatch(loginAction(meUser));
      } else if (!user && !isLoading) {
        navigate('/login');
      }
    }, [isSuccess, meUser, user, isLoading, dispatch, navigate]);

    if (!user && isLoading) return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };
};
