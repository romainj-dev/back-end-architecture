import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, type ValueNode } from 'graphql'

type JsonRecord = Record<string, unknown>

@Scalar('JSONObject')
export class JsonObjectScalar implements CustomScalar<JsonRecord, JsonRecord> {
  private readonly descriptionText =
    'Represents a simple JSON object (no arrays).'

  description = this.descriptionText

  parseValue(value: unknown): JsonRecord {
    return this.ensureRecord(value)
  }

  serialize(value: unknown): JsonRecord {
    return this.ensureRecord(value)
  }

  parseLiteral(ast: ValueNode): JsonRecord {
    if (ast.kind !== Kind.OBJECT) {
      throw new TypeError('JSONObject literal must be an object')
    }

    const parsed: JsonRecord = {}
    for (const field of ast.fields) {
      parsed[field.name.value] = this.literalToValue(field.value)
    }

    return parsed
  }

  private literalToValue(node: ValueNode): unknown {
    switch (node.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return node.value
      case Kind.INT:
        return Number.parseInt(node.value, 10)
      case Kind.FLOAT:
        return Number.parseFloat(node.value)
      case Kind.NULL:
        return null
      case Kind.OBJECT: {
        const nested: JsonRecord = {}
        for (const field of node.fields) {
          nested[field.name.value] = this.literalToValue(field.value)
        }
        return nested
      }
      default:
        throw new TypeError(`Unsupported literal ${node.kind}`)
    }
  }

  private ensureRecord(value: unknown): JsonRecord {
    if (value === null) {
      return {}
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return value as JsonRecord
    }

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        return this.ensureRecord(parsed)
      } catch {
        throw new TypeError('JSONObject string value must be valid JSON')
      }
    }

    throw new TypeError('JSONObject value must be a JSON object')
  }
}
