import request from '../../utils/fetch';

export const send_login_otp = (data) =>
  request.post(`/auth/local/login/sendOtp`, data);

export const verify_login_otp = (data) => request.post(`/auth/local`, data);

export const send_register_otp = (data) =>
  request.post(`/auth/local/register/sendOtp`, data);

export const verify_register_otp = (data) =>
  request.post(`/auth/local/register`, data);

export const updateProfileData = (id, data) =>
  request.put(`/users/${id}`, data);

export const subscribeTopic = (body) =>
  request.post(`/auth/user/subscribe`, body);
export const unSubscribeTopic = (body) =>
  request.post(`/auth/user/un-subscribe`, body);

  export const resend_otp = (body) =>
  request.post(`/auth/local/login/resendOtp`, body);
