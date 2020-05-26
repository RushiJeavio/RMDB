import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = '7d6c19747fdd80c36e8a64bcc7212b6d';
export const API_DEFAULT_PARAMS = {
    language: "en-US",
    api_key: `${ACCESS_TOKEN}`
};
export const TMDB_BASE_AXIOS_INSTANCE = axios.create({
    baseURL: BASE_URL, 
});
 








































