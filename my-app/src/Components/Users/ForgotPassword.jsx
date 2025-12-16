import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forgotPasswordQuery } from '../../React_Query/userQuery/userQuery';
import AlertMessage from '../AlertMessage/AlertMessage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../style/ForgotPassword.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email!')
    .required('Email is required!')
});

export default function ForgotPassword() {
  const [alert, setAlert] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: forgotPasswordQuery,
    mutationKey: ['forgotPassword'],

    onMutate: () => {
      console.log("🔄 onMutate fired");
      setAlert({ type: 'loading', message: 'Please hold while loading...' });
    },

    onSuccess: (data) => {
      console.log("✅ onSuccess fired:", data);
      setAlert({
        type: 'success',
        message: 'We sent a reset password email. Kindly check your inbox.'
      });

      setTimeout(() => {
        setAlert(null);
        queryClient.invalidateQueries('user');
        navigate('/login');
      }, 2500); // 👈 Show success for 2.5 seconds
    },

    onError: (error) => {
      const message = error?.response?.data?.message || error?.message || 'An error occurred!';
      console.error("❌ onError fired:", message);

      setAlert({ type: 'error', message });

      setTimeout(() => {
        setAlert(null);
        navigate('/login');
      }, 2500); // 👈 Show error for 2.5 seconds
    },

    onSettled: () => {
      console.log("🟡 Request settled (success or error)");
    }
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("📨 Submitting email:", values.email);
      mutation.mutate(values);
    },
  });

  return (
    <div className="forgot-password forgot-password-container">
      {alert && <AlertMessage type={alert.type} message={alert.message} />}

      <form onSubmit={formik.handleSubmit} className="forgot-password forgot-password-form">
        <h2>Please enter your registered email to reset your password.</h2>

        <input
          className="forgot-password forgot-password-input"
          type="email"
          id="email"
          name="email"
          {...formik.getFieldProps('email')}
          placeholder="Enter your registered email"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="forgotPassword-input-err">{formik.errors.email}</span>
        )}

        <button
          type="submit"
          style={{ cursor: 'pointer' }}
          className="forgot-password confirm-email-btn"
        >
          Confirm Email
        </button>
      </form>
    </div>
  );
}
