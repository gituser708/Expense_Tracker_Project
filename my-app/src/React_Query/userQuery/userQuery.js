import axios from 'axios';
import {
  registerTempUserAPI, registerAPI, loginAPI, profileAPI, 
  resendOTPAPI, validateResetTokenAPI, resetPasswordAPI, forgotPasswordAPI,
  logoutAPI
} from '../../utils/url';


export const registerTempUserQuery = async (formData) => {
  const response = await axios.post(registerTempUserAPI, formData, {
    headers: {
      "Content-Type": 'multipart/formData'
    }
  });
  return response.data;
};

export const registerQuery = async ({ email, otp }) => {
  const response = await axios.post(registerAPI, { email, otp });
  return response.data;
};


export const resendOtpQuery = async ({ email }) => {
  const response = await axios.post(resendOTPAPI, { email });
  return response.data;
};


export const loginQuery = async ({ email, password }) => {
  const response = await axios.post(loginAPI, { email, password }, {
    withCredentials: true
  });
  return response.data;
};

export const logoutQuery = async () => {
  const response = await axios.post(logoutAPI, {}, {
    withCredentials: true
  });
  return response.data;
};


export const profileQuery = async () => {
  const response = await axios.get(profileAPI, {
    withCredentials: true
  });
  return response.data;
};

export const forgotPasswordQuery = async ({ email }) => {
  const response = await axios.post(forgotPasswordAPI, { email });
  return response.data;
};


export const validateResetTokenQuery = async (token) => {
  const response = await axios.get(`${validateResetTokenAPI}/${token}`);
  return response.data;
};


export const resetPasswordQuery = async ({ token, password }) => {
  const response = await axios.put(`${resetPasswordAPI}/${token}`, { password });
  return response.data;
};
