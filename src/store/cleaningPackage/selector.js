import { createSelector } from 'reselect'

const addressRouteDataSelect = state => state.cleanPackage.AddressRouteData;
const AddressRouteData = createSelector(addressRouteDataSelect, (value) => value );

export default {
    AddressRouteData
}
