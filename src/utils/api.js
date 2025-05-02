/**
 * Utility function to get the appropriate API base URL based on the environment
 */
export const getApiUrl = () => {
  // Check if we're in development or production
  const isDevelopment = import.meta.env.DEV;
  
  // In development, use relative path (which gets redirected via Vite proxy)
  // In production, use the full URL
  return isDevelopment ? '/api' : 'https://api.escuelajs.co/api/v1';
};