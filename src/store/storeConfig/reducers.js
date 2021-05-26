import { combineReducers } from 'redux';
import washSlice from '../wash/slice';
import authSlice from './../auth/slice';
import cleanPackageSlice from './../cleaningPackage/slice';

const rootReducer = combineReducers({
    wash:washSlice.reducer,
    auth:authSlice.reducer,
    cleanPackage:cleanPackageSlice.reducer,
});

export default rootReducer;