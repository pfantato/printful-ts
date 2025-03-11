import { z } from 'zod'

export const HateoasLink = z.object({
  href: z.string().url(),
})
export type HateoasLink = z.infer<typeof HateoasLink>

export const PagingHateoasLinks = z.object({
  self: HateoasLink,
  first: HateoasLink,
  last: HateoasLink,
  next: HateoasLink.optional(),
  previous: HateoasLink.optional(),
})
export type PagingHateoasLinks = z.infer<typeof PagingHateoasLinks>
