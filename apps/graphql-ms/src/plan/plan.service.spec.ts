import { PlanService } from './plan.service'
import type { PlanRepository } from './plan.repository'
import type { Plan } from '@shared/schemas/plan'

function createRepositoryMock(): jest.Mocked<PlanRepository> {
  return {
    findAll: jest.fn(),
  }
}

describe('PlanService', () => {
  let service: PlanService
  let repository: jest.Mocked<PlanRepository>

  const mockPlan: Plan = {
    id: 'plan-free',
    code: 'FREE',
    price: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(() => {
    repository = createRepositoryMock()
    service = new PlanService(repository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('returns plans from repository', async () => {
    repository.findAll.mockResolvedValue([mockPlan])

    const result = await service.findAll()

    expect(result).toEqual([mockPlan])
    expect(repository.findAll).toHaveBeenCalledTimes(1)
  })
})
