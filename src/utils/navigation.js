import { navigationRef } from "../../App";

export default ({ path, params, isBack = false }) =>{

    isBack ? navigationRef.current?.goBack() : navigationRef.current?.navigate(path, params);

}
