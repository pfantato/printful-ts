import { PrintfulError, PrintfulErrorCode } from '@printful-ts/errors'

export function bound(
  _originalMethod: unknown,
  context: ClassMethodDecoratorContext,
) {
  const methodName = context.name
  if (context.private) {
    throw new PrintfulError(
      `'bound' cannot decorate private properties like ${methodName as string}.`,
      PrintfulErrorCode.Enum.PRECONDITION_FAILED,
    )
  }
  context.addInitializer(function () {
    this[methodName] = this[methodName].bind(this)
  })
}
