import { ListPlansResponse, Plan } from '@rpc/plan/v1/plan_pb'
import { graphqlRequest, GET_PLANS } from '@/lib/graphql/client'
import { getConnectContext } from '@/lib/connect/context'
import { wrapError } from '@/lib/connect/errors'
import {
  createServiceLogger,
  logRequestStart,
  logRequestSuccess,
  logRequestError,
} from '@/lib/connect/server-logger'

const SERVICE_NAME = 'PlanService'

interface GraphQLPlan {
  id: string
  code: string
  price: number
  createdAt: string
  updatedAt: string
}

interface GetPlansData {
  plans: GraphQLPlan[]
}

/**
 * Fetches all plans from GraphQL MS and returns them.
 * This maintains the chain: Connect → GraphQL MS → Supabase
 *
 * Automatically forwards auth and tracing headers from the Connect context
 * to enable RLS and auditing in downstream services.
 *
 * @throws ConnectError with appropriate code on failure
 */
export async function listPlans(): Promise<ListPlansResponse> {
  const ctx = getConnectContext()
  const logger = createServiceLogger(SERVICE_NAME, 'listPlans', ctx)
  const requestLog = logRequestStart(SERVICE_NAME, 'listPlans', ctx)

  try {
    logger.debug('Fetching plans from GraphQL MS', {
      hasAuthHeader: Boolean(ctx?.headers?.authorization),
      requestId: ctx?.requestId,
    })

    const data = await graphqlRequest<GetPlansData>(GET_PLANS, undefined, {
      headers: ctx?.headers,
    })

    const plans = data.plans.map(
      (plan) =>
        new Plan({
          id: plan.id,
          code: plan.code,
          price: plan.price,
          createdAt: plan.createdAt,
          updatedAt: plan.updatedAt,
        })
    )

    logger.debug('Plans fetched successfully', { count: plans.length })
    logRequestSuccess(requestLog)

    return new ListPlansResponse({ plans })
  } catch (error) {
    logRequestError(requestLog, error as Error, {
      operation: 'listPlans',
    })

    // Wrap and re-throw as ConnectError
    throw wrapError(error, 'Failed to fetch plans', SERVICE_NAME)
  }
}
