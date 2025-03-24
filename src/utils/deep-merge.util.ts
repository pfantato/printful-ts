import _ from 'lodash'

// const isArray = <T = unknown>(obj: unknown): obj is Array<T> => _.isArray(obj)
// const customizer = (objValue: unknown, srcValue: unknown) => {
//   if (isArray(objValue)) {
//     return objValue.concat(srcValue)
//   }
// }
// export const deepMerge = (target: unknown, source: unknown) =>
//   _.mergeWith(source, target, customizer)

export const deepMerge = (target: unknown, source: unknown) =>
  _.merge(target, source) //_.mergeWith(source, target, customizer)
