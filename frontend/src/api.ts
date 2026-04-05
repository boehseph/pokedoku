import axios from 'axios';

/** Base URL for the Express API (keep in one place for local dev). */
export const API_BASE_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
