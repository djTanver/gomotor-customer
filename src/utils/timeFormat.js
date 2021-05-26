import moment from 'moment';

export default (date_time) => moment(new Date(date_time)).format("Do MMM YYYY, h:mm A")