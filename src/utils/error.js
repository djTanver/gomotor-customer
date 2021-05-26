import Toast from 'react-native-simple-toast';

export default (error) => {
    Toast.show(JSON.stringify(error.message));
}

export const showtoast = (message) =>{
    Toast.showWithGravity(message, Toast.LONG, Toast.TOP);
}
