import { createSelector } from 'reselect'

const activeWashSelect = state => state.wash.active_wash;
const activeWash = createSelector(activeWashSelect, (value) => value );

const isActiveWashSelect = state => state.wash.is_wash_active;
const isActiveWash = createSelector(isActiveWashSelect, (value) => value );

const pastWashSelect = state => state.wash.past_wash;
const pastWash = createSelector(pastWashSelect, (value) => value );

export default {
    activeWash,
    pastWash,
    isActiveWash,
}
