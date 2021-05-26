import API_ENDPOINT from '../config/api';
// import configureStore from '../Modules/StoreConfig/Store';
import handleError from './error';
import { store } from '../../App';
import { showtoast } from './error';
/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 * 
 * 
 */
const get = (url, options = {}) => {
    return new Promise( async(resolve, reject) => {
            let baseURL = API_ENDPOINT + url;
            console.log("---------------------");
            console.log(baseURL);
            console.log("---------------------");
            try {
                const headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                };
                if(store.getState().auth.isUser){
                    headers.Authorization = `Bearer ${store.getState().auth.token}`;
                }
                let response = await fetch(baseURL, {
                    ...options,
                    method: 'GET',
                    headers,
                });
                let result = await response.json();
                if(response.ok){
                    resolve(result);
                    if ( result.message )
                    {
                       
                        //showtoast(result.error )
                        // handleError(result)
                    }
                }
                else{
                    
                    
                    reject(result)
                    handleError(result);
                }
            } catch (error) {
                
                
                reject(error);
                handleError(error);
            }
        },
    );
};


const getWithAuth = (url, options = {}, authToken = '') => {
    return new Promise( async(resolve, reject) => {

            let baseURL = API_ENDPOINT + url;

            console.log("---------------------");
            console.log(baseURL);
            console.log("---------------------");

            try {

                let response = await fetch(baseURL, {
                    ...options,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                let result = await response.json();

                if(response.ok){
                    
                    resolve(result);

                    if(result.message && result.statusCode !== 200){
                        
                        handleError(result)
                    }
                }
                else{

                    console.log(result);

                    reject(result)

                    handleError(result);
                }

            } catch (error) {
                console.log("Fetch get wth auth =======>"+error);
                reject(error);

                handleError(error);
            }

        },
    );
};


/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */
const post = (url, data, method = 'POST') => {
    return new Promise(async(resolve, reject) => {
        let baseURL = API_ENDPOINT + url;
        console.log("---------------------");
        console.log("url",baseURL);
        console.log("data",data);
        console.log("---------------------");
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };
            if(store.getState().auth.isUser){
                headers.Authorization = `Bearer ${store.getState().auth.token}`;
            }
            const response = await fetch(baseURL, {
                method: method,
                headers,
                body:JSON.stringify(data)
            })
            const result = await response.json();
            if(response.ok){
                resolve(result);
                
                if(result.message && result.statusCode !== 200){
                    handleError(result)
                }
            }
            else{
                console.log(result);
                reject(result);
                handleError(result);
            }
        }
        catch (error) {
            reject(error);
            handleError(error);
        }
    });
};
/**
 * Put method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */
const put = (url, data, method = 'PUT') => {
    return new Promise(async(resolve, reject) => {
        let baseURL = API_ENDPOINT + url;
        console.log("---------------------");
        console.log("url",baseURL);
        console.log("data",data);
        console.log("---------------------");
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };
            if(store.getState().auth.isUser){
                headers.Authorization = `Bearer ${store.getState().auth.token}`;
            }
            const response = await fetch(baseURL, {
                method: method,
                headers,
                body:JSON.stringify(data)
            })
            const result = await response.json();
            if(response.ok){
                resolve(result);
                
                if(result.message && result.statusCode !== 200){
                    console.log("PUT error =====>");
                    handleError(result)
                }
            }
            else{
                console.log(result);
                console.log("PUT error =====>");
                reject(result);
                handleError(result);
            }
        }
        catch (error) {
            console.log("PUT error =====>"+error.message);
            reject(error);
            handleError(error);
        }
    });
};
export default request = {
    get,
    getWithAuth,
    post,
    put,
};