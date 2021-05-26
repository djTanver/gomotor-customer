import request from '../../utils/fetch';

export const create_report = ( body ) => request.post( `/complaints`, body );

export const create_reviews = ( body ) => request.post( `/reviews-ratings`, body );
export const get_issues = (id) => request.get(`/complaints/filters/user?customer_id=${id}&_start=0&_limit=30&_sort=created_at:desc`);



