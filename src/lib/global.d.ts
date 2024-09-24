declare global {
  interface Global {
    prisma: PrismaClient | undefined;
  }
}
