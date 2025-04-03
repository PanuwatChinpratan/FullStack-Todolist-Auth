import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const SECRET_KEY = Buffer.from(process.env.SECRET_KEY!, 'hex') // ต้องเป็น 32 byte
const IV_LENGTH = 16 // AES ใช้ IV ขนาด 16 byte

export function encrypt(text: string): string {
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv('aes-256-cbc', SECRET_KEY, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = createDecipheriv('aes-256-cbc', SECRET_KEY, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
