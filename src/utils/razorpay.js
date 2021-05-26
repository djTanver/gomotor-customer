import RazorpayCheckout from 'react-native-razorpay';
import { razorCreds } from '../config/razorpay';

export const razorPay = async(amount) =>{

    let options = {
        description: 'Car wash',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: razorCreds.key_id,
        amount: amount,
        name: 'Test user',
        prefill: {
          email: 'test@example.com',
          contact: '7259670246',
          name: 'nandeesh gowda'
        },
        theme: {color: '#53a20e'}
      }
    
    const result = await RazorpayCheckout.open(options);
    return result;
}
