import { createPromiseClient } from '@connectrpc/connect'
import { createGrpcTransport } from '@connectrpc/connect-node'
import { UploadService } from '@shared/connect/gen/v1/upload_connect.ts'
import type { UploadStatus as RpcUploadStatus } from '@shared/connect/gen/v1/upload_pb.ts'
import { parseEnv } from '@shared/env/env-schema.ts'

// Validated by Zod in `.meshrc.ts` during build/start
const env = parseEnv()

interface UploadStatus {
  uploadId: string
  status: string
  progress?: number
  message?: string
}

export const meshResolvers = {
  Subscription: {
    uploadStatus: {
      subscribe: async function* (
        _parent: unknown,
        args: { uploadId: string }
      ) {
        const transport = createGrpcTransport({
          baseUrl: `http://localhost:${env.UPLOAD_MS_PORT}`,
          httpVersion: '2',
        })
        const client = createPromiseClient(UploadService, transport)
        const stream = client.watchUpload({ uploadId: args.uploadId })
        for await (const status of stream) {
          yield {
            uploadStatus: mapStatus(status),
          }
        }
      },
      resolve: (payload: { uploadStatus: UploadStatus }) =>
        payload.uploadStatus,
    },
  },
} satisfies Record<'Subscription', Record<string, unknown>>

export default meshResolvers

function mapStatus(status: RpcUploadStatus): UploadStatus {
  return {
    uploadId: status.uploadId,
    status: status.status,
    progress: status.progress,
    message: status.message,
  }
}
