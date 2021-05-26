
export const customerWorkHistory = (user_car_id, date, startIndex) => `/customerlist/cleaner-schedules?_where[date_lte]=${date}&user_car_id=${user_car_id}`;
export const userCars = (user_id) => `/user/${user_id}/user-cars`;

