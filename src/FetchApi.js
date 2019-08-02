/**
 * This class contains the methods responsible of the communication between
 * the client and the server via the API
 *
 * @class FetchApi
 */
export default class FetchApi {
  /**
    * This constructor creates an object of the Fetch Api class
    *
    * @throws {NoEndpointError}
    *
    * @throws {NoAxiosError}
    *
    * @constructor
    * @param {object} axios - The HTTP client (must be Axios or its derivative)
    * @param {string} endpoint - The Fetch API endpoint
    *
    * @example new FetchApi({...axios}, "https://www.example.com/v1")
    */
  constructor(axios, endpoint) {
    if (!axios) {
      throw new Error('NoAxiosError! Please provide Axios.');
    } else if (!endpoint) {
      throw new Error('NoEndpointError! Please provide an endpoint.');
    } else {
      this.axios = axios;
      this.endpoint = endpoint;
    }
  }

  // Posts
  /**
     * This function returns a promise of all the posts
     * @function
     *
     * @returns {Promise<Array<Object>>}
     *
     * @example getPosts()
     */
  getPosts() { return this.axios.get(`${this.endpoint}/posts`); }

  /**
     * This function returns a promise of the post having the specified ID
     * @function
     *
     * @param {Object} params Params
     * @param {String} params.id The post id
     *
     * @returns {Promise<Object>}
     *
     * @example getPostById({ id: 123 })
     */
  getPostById(params) {
    const { id } = params || {};
    if (!id) {
      return Promise.reject(new Error('MissingIdError! You must pass an ID.'));
    }

    return this.axios.get(`${this.endpoint}/posts/${id}`);
  }

  // Users
  /**
     * This function returns a promise of all the users
     * @function
     *
     * @returns {Promise<Array<Object>>}
     *
     * @example getUsers()
     */
  getUsers() {
    return this.axios.get(`${this.endpoint}/users`);
  }

  /**
     * This function returns a promise of the user having the specified ID
     * @function
     *
     * @param {Object} params Params
     * @param {String} params.id The user id
     *
     * @returns {Promise<Object>}
     *
     * @example getUserById({ id: 123 })
     */
  getUserById(params) {
    const { id } = params || {};
    if (!id) {
      return Promise.reject(new Error('MissingIdError! You must pass an ID.'));
    }

    return this.axios.get(`${this.endpoint}/users/${id}`);
  }
}
