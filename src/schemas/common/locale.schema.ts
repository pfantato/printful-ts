import { z } from 'zod'

export const Locale = z
  .string()
  .regex(/^[a-zA-Z]{2}_[a-zA-Z]{2}$/, {
    message:
      "Language must be in the format 'xx_XX', e.g., en_US, es_ES, pt_BR.",
  })
  .transform(val => {
    const [language, country] = val.split('_')
    return `${language.toLowerCase()}_${country.toUpperCase()}`
  })

export type Locale = z.infer<typeof Locale>

export const Localized = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  schema.extend({
    locale: Locale.optional(),
  })

export type Localized<T extends z.ZodRawShape> = z.infer<
  ReturnType<typeof Localized<T>> & { locale: Locale }
>
