import { createPromiseClient } from '@connectrpc/connect'
import { createGrpcTransport } from '@connectrpc/connect-node'
import {
  UploadService,
  type UploadStatus as RpcUploadStatus,
} from '../../packages/shared/connect/gen/upload/v1/upload_connect'

interface UploadStatus {
  uploadId: string
  status: string
  progress?: number
  message?: string
}

const uploadAddress = process.env.MESH_UPLOAD_ADDRESS ?? 'localhost:50052'

export default {
  Subscription: {
    uploadStatus: {
      subscribe: async function* (
        _parent: unknown,
        args: { uploadId: string }
      ) {
        const transport = createGrpcTransport({
          baseUrl: `http://${uploadAddress}`,
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
} satisfies Record<string, unknown>

function mapStatus(status: RpcUploadStatus): UploadStatus {
  return {
    uploadId: status.uploadId,
    status: status.status,
    progress: status.progress,
    message: status.message,
  }
}
