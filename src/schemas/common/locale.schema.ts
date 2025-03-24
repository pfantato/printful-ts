import { z } from 'zod'

export const SupportedLocales = z.enum([
  'en_US',
  'en_GB',
  'en_CA',
  'es_ES',
  'fr_FR',
  'de_DE',
  'it_IT',
  'ja_JP',
])
export type SupportedLocales = z.infer<typeof SupportedLocales>

export const Locale = z
  .custom<`${Lowercase<string>}_${Uppercase<string>}`>(
    value =>
      z
        .string()
        .pipe(z.coerce.string())
        .refine(locale => /^[a-z]{2}_[A-Z]{2}$/.test(locale))
        .parse(value),
    {
      message:
        "Locale must be in the format 'xx_XX', e.g., en_US, es_ES, fr_FR.",
    },
  )
  .superRefine((locale, ctx) => {
    if (!SupportedLocales.safeParse(locale).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Locale is not supported by Printful API v2.',
      })
    }
    return
  })
  .default(SupportedLocales.Enum.en_US)
export type Locale = z.infer<typeof Locale>

export const WithLocale = z.object({
  locale: Locale.optional(),
})
export type WithLocale = z.infer<typeof WithLocale>
