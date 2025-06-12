export const APP_CONFIG = {
  name: 'CamTourVisor',
  description: 'Your personal guide to exploring Cameroon',
  version: '0.1.0',
};

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  DESTINATIONS: '/destinations',
  AUTH: '/auth',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
};

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 30000,
};

export const SUPPORT = {
  whatsapp: '+237XXXXXXXXX',
  email: 'support@cameroon-tourism.com',
}; 