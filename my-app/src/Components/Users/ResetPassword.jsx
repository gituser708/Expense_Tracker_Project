import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { resetPasswordQuery } from '../../React_Query/userQuery/userQuery';
import { validateResetTokenAPI } from "../../utils/url";
import AlertMessage from "../AlertMessage/AlertMessage";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import '../../style/ResetPassword.css';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, 'Set password at least 5 characters!')
    .max(10, 'Above 10 characters not allowed!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match!')
    .required('Confirm password is required!')
});

export default function ResetPassword() {
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Validate token on load
  useEffect(() => {
    axios.get(`${validateResetTokenAPI}/${token}`)
      .then(() => {
        console.log("✅ Token valid");
      })
      .catch((err) => {
        console.error("❌ Invalid token", err?.response?.data);
        setAlert({ type: 'error', message: 'Reset link expired or invalid!' });
        setTimeout(() => navigate('/'), 2000);
      });
  }, [token]);

  // ✅ Handle mutation (reset password)
  const mutation = useMutation({
    mutationFn: resetPasswordQuery,
    mutationKey: ['resetPassword'],
    onMutate: () => {
      setAlert({ type: 'loading', message: 'Resetting password...' });
    },
    onSuccess: () => {
      setAlert({ type: 'success', message: 'Password reset successful!' });
      setTimeout(() => {
        setAlert(null);
        queryClient.invalidateQueries('user');
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Something went wrong!';
      setAlert({ type: 'error', message });
      setTimeout(() => setAlert(null), 2000);
    }
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({ token, password: values.password });
    }
  });

  return (
    <div className="reset-password reset-password-container">
      {alert && <AlertMessage type={alert.type} message={alert.message} />}

      <form onSubmit={formik.handleSubmit} className="reset-password reset-password-form">
        <h2>Reset Your Password</h2>

        {/* Password Field */}
        <div className="reset-password reset-password-form-group">
          <label htmlFor="password">New Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="reset-password reset-password-input"
              id="password"
              {...formik.getFieldProps('password')}
              placeholder="Set new password"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="reset-password-input-err">{formik.errors.password}</span>
            )}
            <span className="reset-password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="reset-password reset-password-form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="reset-password reset-password-input"
              id="confirmPassword"
              {...formik.getFieldProps('confirmPassword')}
              placeholder="Confirm password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <span className="reset-password-input-err">{formik.errors.confirmPassword}</span>
            )}
            <span className="reset-password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <button type="submit" className="reset-password-form reset-password-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};
