import React, { useState, useEffect, useRef } from 'react';
import '../../style/Register.css';
import SignUpImg from '../../assets/case-study-picfy.webp';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import AlertMessage from '../AlertMessage/AlertMessage';
import { registerTempUserQuery, registerQuery,resendOtpQuery } from '../../React_Query/userQuery/userQuery';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be 3 characters!')
    .max(15, 'Maximum 15 characters allowed!')
    .required('Username is required!'),
  email: Yup.string()
    .email('Enter a valid email!')
    .required('Email is required!'),
  age: Yup.number()
    .min(18, 'User must be 18 years old!')
    .max(60, 'Above 60 years not allowed!')
    .required('Age is required!'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid selection!')
    .required('Gender is required!'),
  password: Yup.string()
    .min(5, 'Min 5 characters!')
    .max(10, 'Max 10 characters!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], 'Passwords must match!')
    .required('Confirm password is required!'),
  profilePic: Yup.mixed()
    .required('Profile pic is required!')
    .test("fileType", "Only image files allowed!", (value) => value && value.type && value.type.startsWith("image/")),
  otp: Yup.string()
    .when('$step', (step, schema) => step === 2
      ? schema.length(6).required('OTP is required!')
      : schema
    ),
});

const UserRegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tone, setTone] = useState('tone-a');
  const [alert, setAlert] = useState(null);
  const [step, setStep] = useState(1);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredUsername, setRegisteredUsername] = useState('');
  const [timer, setTimer] = useState(60);
  const otpRefs = useRef([]);
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const registerMutation = useMutation({
    mutationFn: registerTempUserQuery,
    onMutate: () => setAlert({ type: 'loading', message: 'Sending OTP...' }),
    onSuccess: (_, variables) => {
      setAlert({ type: 'success', message: 'OTP sent to your email' });
      setRegisteredEmail(variables.get('email'));
      setRegisteredUsername(variables.get('username'));
      setStep(2);
      setTimer(60);
      setTimeout(() => {
        if (otpRefs.current[0]) otpRefs.current[0].focus();
      }, 200);
    },
    onError: (error) => setAlert({ type: 'error', message: error?.response?.data?.message || 'Registration failed!' })
  });

  const otpMutation = useMutation({
    mutationFn: registerQuery,
    onMutate: () => setAlert({ type: 'loading', message: 'Verifying OTP...' }),
    onSuccess: () => {
      setAlert({ type: 'success', message: 'Account created. Redirecting...' });
      setTimeout(() => navigate('/login'), 2500);
    },
    onError: (error) => setAlert({
      type: 'error',
      message: error?.response?.data?.message || 'Invalid OTP'
    })
  });

  const resendMutation = useMutation({
    mutationFn: resendOtpQuery,
    onMutate: () => {
      setAlert({ type: 'loading', message: 'Resending...Please hold' });
    },
    onSuccess: () => {
      setAlert({ type: 'success', message: 'OTP resent to your email' });
      setTimer(60);
    },
    onError: (error) => setAlert({
      type: 'error',
      message: error?.response?.data?.message || 'Failed to resend OTP',
    })
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      age: '',
      gender: '',
      password: '',
      confirmPassword: '',
      profilePic: '',
      otp: ''
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    context: { step },
    onSubmit: (values) => {
      if (step === 1) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, val]) => {
          if (key === 'profilePic') formData.append(key, val);
          else if (key !== 'otp') formData.append(key, val);
        });
        registerMutation.mutate(formData);
      } else {
        otpMutation.mutate({ email: registeredEmail, otp: values.otp });
      }
    }
  });

  const otpHandleChange = (index, event) => {
  const value = event.target.value;
  if (!/^\d?$/.test(value)) return; // Only allow digits 0-9

  const updatedOtp = [...otpDigits];
  updatedOtp[index] = value;
  setOtpDigits(updatedOtp);
  formik.setFieldValue('otp', updatedOtp.join(''));

  if (value && index < 5) {
    otpRefs.current[index + 1]?.focus();
  }
};

const otpHandleKeyPress = (index, event) => {
  if (event.key === 'Backspace' && otpDigits[index] === '' && index > 0) {
    otpRefs.current[index - 1]?.focus();
  }
};

  
  return (
    <div className={`signup-container ${tone}`}>
      <aside className="left-container">
        <h1><i className="fas fa-user-plus"></i> CREATE YOUR ACCOUNT</h1>
        <div className="puppy">
          <img src={SignUpImg} alt="User Illustration" />
        </div>
        <button className="tone-toggle" onClick={() => setTone(tone === 'tone-a' ? 'tone-b' : 'tone-a')}>Switch Theme</button>
      </aside>

      <main className="right-container">
        {alert && <AlertMessage type={alert.type} message={alert.message} />}
        <form onSubmit={formik.handleSubmit}>
          {step === 1 && (
            <>
              {/* Name & Email */}
              <section className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name='username'
                    {...formik.getFieldProps('username')}
                    placeholder="Your name"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <span className='register-input-err'>{formik.errors.username}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    name='email'
                    {...formik.getFieldProps('email')}
                    placeholder="you@example.com"
                  />
                   {formik.touched.email && formik.errors.email && (
                    <span className='register-input-err'>{formik.errors.email}</span>
                  )}
                </div>
              </section>

              {/* Age & Gender */}
              <section className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Your Age</label>
                  <input
                    id="age"
                    type="number"
                    name='age'
                    {...formik.getFieldProps('age')}
                    placeholder="Your age"
                  />
                   {formik.touched.age && formik.errors.age && (
                    <span className='register-input-err'>{formik.errors.age}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor='gender'>Your Gender</label>
                  <select
                    id='gender'
                    name='gender'
                    {...formik.getFieldProps('gender')}>
                    <option value="" label='Select Gender' />
                    <option value="male" label='Male' />
                    <option value="female" label='Female' />
                    <option value="other" label='Other' />
                  </select>
                  
                  {formik.touched.gender && formik.errors.gender && (
                    <span className="register-input-err">{formik.errors.gender}</span>
                  )}
                </div>
              </section>

              {/* Password & Confirm Password */}
              <section className="form-row">
                <div className="form-group password-group">
                  <label htmlFor="password">Set a Password</label>
                  <div className="input-wrapper">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      {...formik.getFieldProps('password')}
                      placeholder="Set a password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <span className='register-input-err'>{formik.errors.password}</span>
                    )}
                    <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="form-group password-group">
                  <label htmlFor="confirm">Confirm Password</label>
                  <div className="input-wrapper">
                    <input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      name='confirmPassword'
                      {...formik.getFieldProps('confirmPassword')}
                      placeholder="Confirm password"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <span className='register-input-err'>{formik.errors.confirmPassword}</span>
                    )}
                    <span className="toggle" onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </section>

              {/* Profile Picture Upload */}
              <section className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="profile-pic">Upload Profile Picture</label>
                  <input
                    id="profile-pic"
                    type="file"
                    name='profilePic'
                    accept="image/*"
                    onChange={(event) => {
                      formik.setFieldValue("profilePic", event.currentTarget.files[0]);
                    }}
                  />
                   {formik.touched.profilePic && formik.errors.profilePic && (
                    <span className='register-input-err'>{formik.errors.profilePic}</span>
                  )}
                </div>
              </section>
            </>
          )}

       {step === 2 && (
            <>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Hi {registeredUsername}, check your email
        </p>
        <label>Enter 6-digit OTP sent to {registeredEmail}</label>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
          {Array(6).fill().map((_, index) => (
            <input
              key={index}
              style={{ width: '40px', fontSize: '18px', textAlign: 'center' }}
              type='text'
              maxLength={1}
              value={otpDigits[index]}
              ref={(e) => (otpRefs.current[index] = e)}
              onChange={(e) => otpHandleChange(index, e)}
              onKeyDown={(e) => otpHandleKeyPress(index, e)}
            />
          ))}
        </div>

        {/* OTP error message from Formik */}
        {formik.touched.otp && formik.errors.otp && (
          <span className="register-input-err" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
            {formik.errors.otp}
          </span>
        )}

        {timer > 0 ? (
          <p className="otp-timer">Resend available in {timer}s</p>
        ) : (
                  <button type="button" className='resend-otp-btn'
                    onClick={() => resendMutation.mutate({ email: registeredEmail })}
                  >
            Resend OTP
          </button>
        )}
      </>
    )}

          <button type='submit' className='user-register-btn'>
            {step === 1 ? 'Register' : 'Verify OTP'}</button>
        </form>
      </main>
    </div>
  );
};

export default UserRegistrationForm;
