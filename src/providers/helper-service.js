export default function Helper() { }

import {store} from '../../App'
import API_ENDPOINT from '../config/api';
Helper.getCarCompanies = function (  )
{
    return new Promise(async (resolve, reject) => {
      try {
        let res = await fetch(
          `${API_ENDPOINT}/car-companies`,
          {
              method: "GET",
              headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        let json = await res.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
};
Helper.getCompanyModels = function (id)
{
    return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(
            `${API_ENDPOINT}/comany/${id}/car-makes`,
            {
              method: "GET",
                headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
          let json = await res.json();
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
}
Helper.getFuelTypes = function ()
{
    return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(
            `${API_ENDPOINT}/fuel-types`,
            {
              method: "GET",
                headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
          let json = await res.json();
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
}
Helper.getCarTypes = function ()
{
    return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(
            `${API_ENDPOINT}/car-types`,
            {
              method: "GET",
                headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
          let json = await res.json();
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
}
Helper.addCarModelFuel = function ( body )
{
    var bearer = 'Bearer ' + store.getState().auth.token;
    return new Promise(async (resolve, reject) => {
      try {
        let res = await fetch(API_ENDPOINT + "/user-cars", {
          method: "POST",
          body: JSON.stringify(body),
            headers: {
                'Authorization': bearer,
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        let json = await res.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
};
Helper.getUserAllCars = function (id)
{
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(
         `${API_ENDPOINT}/user/${id}/user-cars`,
        {
          method: "GET",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      let json = await res.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}
Helper.updateCarDetails = function (user_id,car_id,data)
{
  return new Promise(async (resolve, reject) => {
    try
    {
    var bearer = 'Bearer ' + store.getState().auth.token;
    console.log(`bearer ========>${bearer}`);
      let res = await fetch(`${API_ENDPOINT}/user/${user_id}/user-cars/${car_id}`, {
        method: "PUT",
        body: JSON.stringify(data),
          headers: {
              'Authorization': bearer,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let json = await res.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}
Helper.updateUserDetails = function (user_id,data)
{
  return new Promise(async (resolve, reject) => {
    try
    {
      let bearer = 'Bearer ' + store.getState().auth.token;
      let res = await fetch(`${API_ENDPOINT}/users/${user_id}`, {
        method: "PUT",
        body: JSON.stringify(data),
          headers: {
              'Authorization': bearer,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let json = await res.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}
Helper.getUserDetails = function (id)
{
  let bearer = 'Bearer ' + store.getState().auth.token;
  
  return new Promise(async (resolve, reject) => {
    try {
      
      let res = await fetch(
         `${API_ENDPOINT}/users/${id}`,
        {
          method: "GET",
          headers: {
            'Authorization':bearer
          }
        }
      );
      let json = await res.json();
      resolve(json);
    } catch (error) {
      
      reject(error);
    }
  });
}
Helper.getActivePlan = function (id)
{
  let bearer = 'Bearer ' + store.getState().auth.token;
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(
         `${API_ENDPOINT}/customer-cleaners?_where[customer_id]=${id}&[status]=in_progress`,
        {
          method: "GET",
          headers: {
            'Authorization':bearer,
            "Content-type": "application/json; charset=UTF-8",
            Accept: 'application/json',

          },
        }
      );
      let json = await res.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}
Helper.getPlanDetails = function (id)
{
  let bearer = 'Bearer ' + store.getState().auth.token;
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(
         `${API_ENDPOINT}/cleaner-schedules/subscription-plan/stats?_where[id]=${id}`,
        {
          method: "GET",
          headers: {
            'Authorization':bearer,
            "Content-type": "application/json; charset=UTF-8",
            Accept: 'application/json',

          },
        }
      );
      let json = await res.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}