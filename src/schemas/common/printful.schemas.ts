import { z } from 'zod'
// import { z, type AnyZodObject, type ZodRawShape, type ZodTypeAny } from 'zod'
// import { Paging } from './paging.schema'

export const PrintfulVersion = z.enum(['v1', 'v2'])
export type PrintfulVersion = z.infer<typeof PrintfulVersion>

export const PrintfulConfig = z
  .object({
    privateToken: z.string(),
    baseUrl: z.string().url().optional().default('https://api.printful.com'),
    version: PrintfulVersion.optional().default(PrintfulVersion.enum.v2),
  })
  .required({
    privateToken: true,
  })
export type PrintfulConfig = z.infer<typeof PrintfulConfig>

// type ResponseOptions<
//   Data extends ZodTypeAny,
//   Hateoas extends AnyZodObject,
//   ExtraAttrs extends AnyZodObject,
// > = {
//   data: Data
//   paging?: boolean
//   hateoas?: Hateoas
//   extraAttributes?: ExtraAttrs
// }
// export const PrintfulResponse = <
//   Data extends ZodTypeAny,
//   Hateoas extends AnyZodObject,
//   ExtraAttrs extends AnyZodObject,
// >({
//   data,
//   hateoas,
//   paging = false,
//   extraAttributes,
// }: ResponseOptions<Data, Hateoas, ExtraAttrs>) => {
//   const shape: ZodRawShape = {
//     data: data,
//   }

//   if (hateoas) {
//     shape._links = hateoas
//   }
//   if (paging) {
//     shape.paging = Paging
//   }

//   if (extraAttributes) {
//     return z.object(shape).merge(extraAttributes)
//   }
//   return z.object(shape)
// }
// export type PrintfulResponse<
//   T extends ZodTypeAny,
//   L extends AnyZodObject = AnyZodObject,
//   E extends AnyZodObject = AnyZodObject,
// > = z.infer<ReturnType<typeof PrintfulResponse<T, L, E>>>
