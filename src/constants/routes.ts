/**
 * Centralized Route Configuration
 * Manage all routes in one place (type-safe + scalable)
 */

// ============================================================================
// ROUTE CONSTANTS
// ============================================================================

export const ROUTES = {
  PUBLIC: {
    HOME: "/" as const,
    LOGIN: "/login" as const,
  },

  PROTECTED: {
    DASHBOARD: "/dashboard" as const,

    PROFILE: {
      BASE: "/profile" as const,
      VIEW: (userId: string) => `/profile/${userId}` as const,
      EDIT: "/profile/edit" as const,
    },
  },
} as const;

// ============================================================================
// TYPE-SAFE ROUTES
// ============================================================================

export type StaticRoute =
  | typeof ROUTES.PUBLIC.HOME
  | typeof ROUTES.PUBLIC.LOGIN
  | typeof ROUTES.PROTECTED.DASHBOARD
  | typeof ROUTES.PROTECTED.PROFILE.BASE;

export type DynamicRoute =
  | `/profile/${string}`;

export type AppRoute = StaticRoute | DynamicRoute;

// ============================================================================
// ROUTE HELPERS
// ============================================================================

/**
 * Check if route is public
 */
export const isPublicRoute = (pathname: string): boolean => {
  const publicPaths = [
    ROUTES.PUBLIC.HOME,
    ROUTES.PUBLIC.LOGIN,
  ];

  return publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
};

/**
 * Check if route is protected
 */
export const isProtectedRoute = (pathname: string): boolean => {
  return !isPublicRoute(pathname);
};

// ============================================================================
// OPTIONAL: GROUPED EXPORTS (nice DX)
// ============================================================================

export const PUBLIC_ROUTES = ROUTES.PUBLIC;
export const PROTECTED_ROUTES = ROUTES.PROTECTED;