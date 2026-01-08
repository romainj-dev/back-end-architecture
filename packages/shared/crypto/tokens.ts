import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16

/**
 * Encrypts a token using AES-256-GCM
 * @param plaintext - The token to encrypt
 * @param key - 32-byte encryption key
 * @returns Encrypted token in format: iv:authTag:ciphertext (all base64)
 */
export function encryptToken(plaintext: string, key: Buffer): string {
  if (key.length !== 32) {
    throw new Error('Encryption key must be 32 bytes')
  }

  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()

  // Format: iv:authTag:ciphertext (all base64)
  return `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted.toString('base64')}`
}

/**
 * Decrypts a token using AES-256-GCM
 * @param encrypted - Encrypted token in format: iv:authTag:ciphertext
 * @param key - 32-byte encryption key
 * @returns Decrypted token
 */
export function decryptToken(encrypted: string, key: Buffer): string {
  if (key.length !== 32) {
    throw new Error('Encryption key must be 32 bytes')
  }

  const parts = encrypted.split(':')
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted token format')
  }

  const [ivB64, tagB64, dataB64] = parts
  const iv = Buffer.from(ivB64, 'base64')
  const authTag = Buffer.from(tagB64, 'base64')
  const data = Buffer.from(dataB64, 'base64')

  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  return decipher.update(data, undefined, 'utf8') + decipher.final('utf8')
}

/**
 * Converts a base64-encoded key string to a Buffer
 * @param keyBase64 - Base64-encoded 32-byte key
 * @returns Buffer containing the key
 */
export function keyFromBase64(keyBase64: string): Buffer {
  const key = Buffer.from(keyBase64, 'base64')
  if (key.length !== 32) {
    throw new Error('Key must be 32 bytes when decoded from base64')
  }
  return key
}
