import request from '../../utils/fetch';


export const user_address = (userId) => request.get(`/user/${userId}/addresses`);

export const add_address = (user_id,type,body) => request.put(`/user/${user_id}/addresses/${type}`,body);

export const add_new_address = (body) => request.post(`/addresses`,body);

export const add_apartment = (body) => request.post(`/apartment`, body)