import axios from 'axios';
import FetchApi from './FetchApi';
import ENDPOINT_URL from './constants';

export default new FetchApi(axios, ENDPOINT_URL);
