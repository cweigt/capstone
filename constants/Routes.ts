export const ROUTES = {
  HOME: '/',
  SETTINGS: '/settings',
  SIGNUP: '/signup',
  NOTIFICATIONS: '/notifs',
} as const;

// Type for the route values
export type Route = typeof ROUTES[keyof typeof ROUTES]; 