import { verify_login_otp, verify_register_otp } from "./services";
import { setUser } from "./slice";
import {showtoast} from '../../utils/error';

export const loginUser = (data,cb) => async dispatch => {
    try {
        const response = await verify_login_otp(data);
        if(response){
            const { jwt, user } = response;
            if(user.role.type !== "customer"){
                showtoast("No user found with this number.");
                cb();
                return;
            }
            console.log(`JWT ===========>${jwt}`);
            dispatch(setUser({ user, token:jwt }));
        }
        cb();
    } catch (error) {
        cb();
        console.log("error",error);
    }
  }

export const registerUser = (data,cb) => async dispatch => {
    try {
        const response = await verify_register_otp(data);
        if(response){
            const { jwt, user } = response;
            dispatch(setUser({ user, token:jwt }));
        }
        cb();
    } catch (error) {
        cb();
        console.log("error",error); 
    }
  }
