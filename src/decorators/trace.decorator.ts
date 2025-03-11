import { logger } from '@printful-ts/utils'

export function trace(
  originalMethod: (...args: unknown[]) => unknown,
  context: ClassMethodDecoratorContext,
) {
  const methodName = String(context.name)

  const log = logger.child({
    method: methodName,
  })

  function replacementMethod(this: unknown, ...args: unknown[]) {
    log.trace(`Entering method '${methodName}'.`)
    const result = originalMethod.call(this, ...args)
    log.trace(`Exiting method '${methodName}'.`)
    return result
  }

  return replacementMethod
}
