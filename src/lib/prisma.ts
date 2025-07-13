import { PrismaClient } from '@/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof PrismaClient.prototype.$extends> | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma