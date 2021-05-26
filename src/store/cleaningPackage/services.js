import request from '../../utils/fetch';

export const all_apartments = () =>
  request.get(`/apartments?approval=approved`);

export const single_apartment = (apartment_id) =>
  request.get(`/apartments/${apartment_id}/cleaners`);

export const user_cars = (user_id) => request.get(`/user/${user_id}/user-cars`);

export const cleaning_packages = () => request.get(`/plans?plan_type=Cleaning`);

export const cleaning_order = (body) => request.post(`/orders`, body);

export const add_apartment = (body) => request.post(`/apartments`, body);

export const offers_plan = (ids) => request.post(`/offers/plans`, {ids: ids});

export const search_nearby_cleaners = (user_id, lat, lang,addressComponent, service_id) =>
  request.get(
    `/user/${user_id}/nearestservice?service_id=${service_id}&latitude=${lat}&longitude=${lang}&address=${addressComponent}`,
  );

export const workhistory = (user_car_id, date, startIndex) =>
  request.get(
    `/customerlist/cleaner-schedules?_where[date_lte]=${date}&user_car_id=${user_car_id}&status=completed&_start=${startIndex}&_limit=10`,
  );

export const check_active_plans = (user_id) =>
  request.get(`/orders?_where[customer_id]=${user_id}`);

export const active_clean_plans = (user_id) =>
  request.get(`/orders?_where[customer_id]=${user_id}`);

export const get_user_car_packages = (user_id, start_date, car_id) =>
  request.get(`/customer-cleaners/${user_id}/subscription_details/${car_id}`);

// export const get_user_car_packages = (user_id, start_date, car_id) =>
//   request.get(`/customer-cleaners/389/subscription_details/280`);

export const get_service = (keyword) => request.get(`/services?_q=${keyword}`);

export const get_offer_for_service = (service_id) =>
  request.get(`/service-has-offers?service.id=${service_id}`);

export const get_user_orders = (user_id, date) =>
  request.get(
    `/orders/count?customer_id=${user_id}&from_date_lte=${date}&to_date_gt=${date}`,
  );

export const update_user_address = (body) => request.post(`/addresses/`, body);

export const qrCodeAvaibleSeries = (appartment_id) => request.get(`/qr-codes?qr_code_series_id.apartment_id=${appartment_id}&active=false`);


export const cleaning_time = (id, body) =>
  request.put(`/cleaner-schedules/${id}/re/schedule/cleaningtime`, body);

export const cleaning_renew = (body) => request.post(`/orders/re-order`, body);
export const pushLeads = (body) => request.post(`/search-histories`, body);
