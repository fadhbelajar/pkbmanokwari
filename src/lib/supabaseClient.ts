import { apiClient, isApiConfigured } from '../lib/apiClient';

export const getApi = () => apiClient;
export const isConfigured = isApiConfigured;
export const isSupabaseConfigured = isApiConfigured;
export { apiClient, isApiConfigured };
