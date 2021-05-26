import request from '../../utils/fetch';

export const userData = (id) => request.get(`/users/${id}`);

export const updateProfileData = (id, payload) =>
  request.put(`/users/${id}`, payload);


  export const get_payment_history = (id) => request.get(`/payments?_where[customer]=${id}`);
// export const updateProfileData = (body) => request.put(`users`, body);
