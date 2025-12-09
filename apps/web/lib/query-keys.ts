/**
 * Centralized query keys factory (Cosmo pattern).
 * Provides type-safe, consistent query keys across the app.
 *
 * Use these keys for both SSR prefetch and client hooks.
 */
export const queryKeys = {
  plans: {
    all: ['plans'] as const,
    list: () => [...queryKeys.plans.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.plans.all, 'detail', id] as const,
  },
  users: {
    all: ['users'] as const,
    list: () => [...queryKeys.users.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
    current: () => [...queryKeys.users.all, 'current'] as const,
  },
} as const
export type QueryKeys = typeof queryKeys
