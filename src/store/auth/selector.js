import { createSelector } from 'reselect'

const userSelect = state => state.auth.user;
const user = createSelector(userSelect, (value) => value );

const userIdSelect = state => state.auth.isUser ? state.auth.user.id : null;
const userId = createSelector(userIdSelect, (value) => value );

const isUserSelect = state => state.auth.isUser;
const isUser = createSelector(isUserSelect, (value) => value );

const tokenSelect = state => state.auth.token;
const token = createSelector( tokenSelect, ( value ) => value );


const fcmTokenSelect = state => state.auth.fcmToken;
const fcmToken = createSelector(fcmTokenSelect, (value) => value );

const user_role = state => state.auth.isUser ? state.auth.user.role : null;
const role = createSelector(user_role, (value) => value)

export default {
    user,
    isUser,
    token,
    userId,
    role,
    fcmToken
}
