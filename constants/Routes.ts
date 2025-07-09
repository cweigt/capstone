import { useAuth } from '@/context/AuthContext';

export const ROUTES = {
  FEEDS: '/',
  SETTINGS: '/settings',
  ACCOUNT: '/account',
  NOTIFICATIONS: '/notifs',
  EULA: '/eula',
  PRIVACY_POLICY: '/privacy-policy',
  SAVED: '/savedArticles',
} as const;

// Type for the route values
export type Route = typeof ROUTES[keyof typeof ROUTES]; 

//for the default route if user is logged in or not
export function getDefaultRoute(user: any) {
  return (
    user ? ROUTES.FEEDS : ROUTES.ACCOUNT
  );
};