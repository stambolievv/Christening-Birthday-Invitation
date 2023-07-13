import * as api from './api';

/**
 * @typedef EndPoints
 * @property {string} CREATE_RECIPIENT - The endpoint for creating a new recipient in the database.
 * @property {function(string):string} RECIPIENT_BY_ID - A function that returns the endpoint for retrieving a recipient by ID.
 */
/**
 * @typedef Recipient
 * @property {string} objectId - The ID of the recipient.
 */
/**
 * @typedef RecipientContent
 * @property {string} objectId - The ID of the recipient.
 * @property {string} name - The name of the recipient.
 */

/**
 * @description A constant representing the path to the Recipient table in the database.
 * @type {string}
 * @constant
 */
const RECIPIENT_TABLE_DB = '/classes/Recipient';

/**
 * @description An object representing the endpoints for making API requests.
 * @type {EndPoints}
 * @constant
 */
const endpoints = {
  CREATE_RECIPIENT: `${RECIPIENT_TABLE_DB}`,
  RECIPIENT_BY_ID: id => `${RECIPIENT_TABLE_DB}/${id}`,
};

/**
 * @description Creates a new recipient with the specified name.
 * @param {string} name - The name of the new recipient.
 * @returns {Promise<Recipient>} A Promise that resolves to an object representing the new recipient.
 * @throws {Error} If the API request fails or returns an error.
 */
export function createRecipient(name) {
  return api.POST(endpoints.CREATE_RECIPIENT, { name });
}

/**
 * @description Retrieves the recipient with the specified ID.
 * @param {string} id - The ID of the recipient to retrieve.
 * @returns {Promise<RecipientContent>} A Promise that resolves to an object representing the recipient.
 * @throws {Error} If the API request fails or returns an error.
 */
export function getRecipient(id) {
  return api.GET(endpoints.RECIPIENT_BY_ID(id));
}