// File: aibproj/packages/backend/services/pleskService.js
import axios from 'axios';
import { env } from '../config/env.js';

const pleskApi = axios.create({
  baseURL: env.PLESK_API_URL,
});

export async function createWordPressSite(domain) {
  try {
    console.log(`[Backend]: Calling Plesk API to provision domain: ${domain}`);
    const response = await pleskApi.post('/provision/wordpress', { domain });
    return response.data;
  } catch (error) {
    console.error('[Backend]: Error calling Plesk API:', error.message);
    throw new Error('Failed to communicate with Plesk provisioning service.');
  }
}