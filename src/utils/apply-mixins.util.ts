export type Constructor = new (...args: unknown[]) => unknown

export function applyMixins(
  derivedCtor: Constructor,
  baseCtors: Array<Constructor>,
) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor?.prototype).forEach(name => {
      if (name !== 'constructor') {
        derivedCtor.prototype[name] = baseCtor.prototype[name]
      }
    })
  })
}
