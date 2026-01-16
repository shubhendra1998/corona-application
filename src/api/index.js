import axios from 'axios';

/**
 * Centralized API client.
 * You can change API endpoint by setting REACT_APP_COVID_API in .env
 */
const BASE_URL = process.env.REACT_APP_COVID_API || 'https://covid19.mathdro.id/api';
const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Fetch summary for global or a specific country.
 * Returns { confirmed, recovered, deaths, lastUpdate } or null on error.
 */
export async function fetchData(country = '') {
  try {
    const target =
      country && country.toLowerCase() !== 'global' && country !== ''
        ? `/countries/${country}`
        : '/';
    const { data } = await client.get(target);
    const { confirmed, recovered, deaths, lastUpdate } = data;
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    // Keep the error visible during development; return null as a safe fallback
    // Consider reporting to an error-tracking service in production
    // eslint-disable-next-line no-console
    console.error('[api][fetchData] error:', error.message || error);
    return null;
  }
}

/**
 * Fetch daily time-series data (global).
 * Returns array of { confirmed, deaths, date } or [] on error.
 */
export async function fetchDailyData() {
  try {
    const { data } = await client.get('/daily');
    const modifiedData = data.map((daily) => ({
      confirmed: daily.confirmed.total,
      deaths: daily.deaths.total,
      date: daily.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api][fetchDailyData] error:', error.message || error);
    return [];
  }
}

/**
 * Fetch list of country names.
 * Returns array of strings (country names) or [] on error.
 */
export async function fetchCountries() {
  try {
    const { data } = await client.get('/countries');
    if (data && Array.isArray(data.countries)) {
      return data.countries.map((c) => c.name);
    }
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api][fetchCountries] error:', error.message || error);
    return [];
  }
}