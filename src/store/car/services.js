import request from '../../utils/fetch';

export const car_companies = () => request.get(`/car-companies`);

export const car_models = (model_id) => request.get(`/comany/${model_id}/car-makes`);

export const fuel_types = () => request.get(`/fuel-types`);

export const car_types = () => request.get(`/car-types`);

export const add_car = (body) => request.post(`/user-cars`,body);

