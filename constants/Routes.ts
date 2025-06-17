export const ROUTES = {
  FEEDS: '/',
  SETTINGS: '/settings',
  ACCOUNT: '/account',
  NOTIFICATIONS: '/notifs',
  EULA: '/eula',
  PRIVACY_POLICY: '/privacy-policy',
  SAVED: '/savedArticles',
  PROFILE: '/profile',
  //LEGAL: '/legal',
} as const;

// Type for the route values
export type Route = typeof ROUTES[keyof typeof ROUTES]; 