/**
 * @description An object representing the location of the network endpoint for API requests.
 * @type {Object<string,string>}
 * @property {string} PROTOCOL - The protocol used to communicate with the network endpoint (e.g. http, https).
 * @property {string} HOSTNAME - The hostname of the network endpoint.
 * @constant
 */
const LOCATION = {
  PROTOCOL: 'https',
  HOSTNAME: 'parseapi.back4app.com',
};

/**
 * @description Performs a network request to a given path with specified options.
 * @param {string} path - The path to send the request to.
 * @param {object} options - The options for the request.
 * @returns {Promise} A promise that resolves to the response body or rejects with an error.
 * @throws {Error} If the response status is not ok, an error is thrown with the response error message.
 */
async function request(path, options) {
  const response = await fetch(`${LOCATION.PROTOCOL}://${LOCATION.HOSTNAME}${path}`, options);

  if (response.ok !== true) {
    const error = await response.json();
    throw new Error(error.error);
  }

  try {
    return await response.json();
  } catch (err) {
    return response;
  }
}

/**
 * @description Creates an options object for use in a network request with a specified method and data.
 * @param {string} method - The HTTP method for the request (e.g. GET, POST, PUT, DELETE).
 * @param {object} [data] - The data to send in the request body. Optional and can be undefined.
 * @returns {object} An object containing the request options with the specified method, headers, and body (if provided).
 */
function createOption(method, data) {
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': import.meta.env.VITE_APPLICATION_ID,
      'X-Parse-REST-API-Key': import.meta.env.VITE_REST_API_KEY,
    },
  };

  if (typeof data !== 'undefined') {
    Object.assign(options.headers, { 'Content-Type': 'application/json' });
    Object.assign(options, { body: JSON.stringify(data) });
  }

  return options;
}

/**
 * @description Sends a GET request to the specified path with default options.
 * @param {string} path - The path to send the GET request to.
 * @returns {Promise} A promise that resolves to the response body or rejects with an error.
 * @throws {Error} If the response status is not ok, an error is thrown with the response error message.
 */
export const GET = (path) => request(path, createOption('GET'));

/**
 * @description Sends a POST request to the specified path with the provided data and default headers.
 * @param {string} path - The path to send the POST request to.
 * @param {object} data - The data to send in the request body.
 * @returns {Promise} A promise that resolves to the response body or rejects with an error.
 * @throws {Error} If the response status is not ok, an error is thrown with the response error message.
 */
export const POST = (path, data) => request(path, createOption('POST', data));

/**
 * @description Sends a PUT request to the specified path with the provided data and default headers.
 * @param {string} path - The path to send the PUT request to.
 * @param {object} data - The data to send in the request body.
 * @returns {Promise} A promise that resolves to the response body or rejects with an error.
 * @throws {Error} If the response status is not ok, an error is thrown with the response error message.
 */
export const PUT = (path, data) => request(path, createOption('PUT', data));

/**
 * @description Sends a DELETE request to the specified path with default options.
 * @param {string} path - The path to send the DELETE request to.
 * @returns {Promise} A promise that resolves to the response body or rejects with an error.
 * @throws {Error} If the response status is not ok, an error is thrown with the response error message.
 */
export const DEL = (path) => request(path, createOption('DELETE'));