import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../style/Login.css';
import SignUpImg from '../../assets/case-study-picfy.webp';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { loginQuery } from '../../React_Query/userQuery/userQuery';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../Reudx/Slices/authSlice';
import AlerMessage from '../AlertMessage/AlertMessage';


const validationSchema = Yup.object({
  email: Yup.string().email('Enter a valid email!').required('Email is required'),
  password: Yup.string().required('Password is required!'),
});

export default function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [tone, setTone] = useState('tone-b');
  const [alert, setAlert] = useState(null);

  const queryClicnt = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: loginQuery,
    mutationKey: ['login'],
    onMutate: () => {
      setAlert({ type: 'loading', message: 'Plase hold on while loading...' });
    },
    onSuccess: () => {
      setTimeout(() => {
        setAlert({ type: 'success', message: 'You have successfully logged in' });

        setTimeout(() => {
          setAlert(null);
          queryClicnt.invalidateQueries('user');
          navigate('/dashboard');
        }, 3000);
      }, 3000);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message || 'Login Faild!';

      setTimeout(() => {
        setAlert({ type: 'error', message });

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }, 3000);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutateAsync(values).then((data) => {
        dispatch(loginAction(data));
      }).catch((err) => console.log(err));
    },
  });

  return (
    <div className={`login-container ${tone}`}>
      {/* Left Side: Branding & Theme Toggle */}
      <aside className="login-left-container">
        <h1>
          <i className="fas fa-login-alt"></i> Login To Your Account
        </h1>
        <div className="login-puppy">
            <img
            src={SignUpImg}          
            alt="Login Illustration"
          />
        </div>
        <button
          className="login-tone-toggle"
          onClick={() => setTone(tone === 'tone-a' ? 'tone-b' : 'tone-a')}
        >
          Switch Theme
        </button>
      </aside>

      {/* Right Side: Login Form */}
      <main className="login-right-container">
          {alert && <AlerMessage type={alert.type} message={alert.message} />}
        <form className='login-form' onSubmit={formik.handleSubmit}>
          {/* Email */}
          <section className="login-form-row">
            <div className="login-form-group full-width">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                name='email'
                {...formik.getFieldProps('email')}
                placeholder="you@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <span className='login-input-error'>{formik.errors.email}</span>
              )}
            </div>
          </section>

          {/* Password */}
          <section className="login-form-row">
            <div className="login-form-group login-password-group full-width">
              <label htmlFor="password">Enter Password</label>
              <div className="login-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  {...formik.getFieldProps('password')}
                  placeholder="Enter your password"
                />

                 {formik.touched.password && formik.errors.password && (
                <span className='login-input-error'>{formik.errors.password}</span>
              )}
                <span
                  className="login-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                </div>

                <div className='forgot-password'>
                    <Link to='/forgot-password'>Forgot Password</Link>
            </div>              
            </div>
          </section>
                <button className='user-login-btn' type='submit'>
                    Login
         </button>
        </form>
      </main>
    </div>
  );
};

