import pino from 'pino'

export const logger = pino({
  name: '@pfantato/printful-ts',
  level: process.env.PRINTFUL_LOG_LEVEL ?? 'info',
  transport: {
    target: 'pino-pretty', // for development
    options: { colorize: true },
  },
})
