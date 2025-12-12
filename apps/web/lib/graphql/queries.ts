/**
 * Shared GraphQL queries used by both client and server.
 */

export const GET_PLANS = `
  query GetPlans {
    plans {
      id
      code
      price
      createdAt
      updatedAt
    }
  }
`
