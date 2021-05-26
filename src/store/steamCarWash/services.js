import request from '../../utils/fetch';

export const bookSteamCarWsah = (payload) =>
  request.post(`/service-schedules/`,payload);

  export const planData = (model_type) => request.get(`/plans?plan_type=Service&model_type=${model_type}`);
