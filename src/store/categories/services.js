import request from '../../utils/fetch';

export const categories = () => request.get(`/categories?_sort=display_order:asc`);

export const services = ( category_id ) => request.get( `/services?category_id=${ category_id }&locations.city=Bengaluru` );
export const search_services = (search_text) => request.get(`/services?title_contains=${search_text}&locations.city=Bengaluru`);

