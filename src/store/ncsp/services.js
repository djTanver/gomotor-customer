import request from '../../utils/fetch';
export const getOneServiceData = (id,service_id) => request.get(`/sp-svc-details?ncsp_id.user_id=${id}&service_id=${service_id}`);
