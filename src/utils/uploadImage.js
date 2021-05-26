import API_ENDPOINT from '../config/api';
export const uploadImage = (formData) =>
{
  
    return new Promise(async (resolve, reject) => {
        try {
          let response = await fetch(`${API_ENDPOINT}/upload`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: formData,
          });
          let json = response.json();
          if (json) {
            resolve(json);
          }
        } catch (err) {
          reject(err);
        }
      });
}
