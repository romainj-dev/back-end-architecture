'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { cacheTags } from './cached-server'

/**
 * Revalidation helpers for admin flows.
 * These server actions allow cache invalidation from client components.
 */

/**
 * Revalidates all plans-related cached data.
 * Call after creating, updating, or deleting plans.
 */
export async function revalidatePlans(): Promise<void> {
  revalidateTag(cacheTags.plans.list, 'max')
}

/**
 * Revalidates all cached data for plans.
 * Use for broader invalidation when plan structure changes.
 */
export async function revalidateAllPlans(): Promise<void> {
  revalidateTag(cacheTags.plans.all, 'max')
}

/**
 * Revalidates the home page specifically.
 * Use when you need to refresh the landing page cache.
 */
export async function revalidateHomePage(): Promise<void> {
  revalidatePath('/')
}

/**
 * Revalidates a specific user's cached data.
 */
export async function revalidateUser(userId: string): Promise<void> {
  revalidateTag(cacheTags.users.detail(userId), 'max')
}

/**
 * Revalidates all users-related cached data.
 */
export async function revalidateAllUsers(): Promise<void> {
  revalidateTag(cacheTags.users.all, 'max')
}
