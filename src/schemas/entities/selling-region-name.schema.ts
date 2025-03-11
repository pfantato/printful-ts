import { z } from 'zod'

export const SellingRegionName = z.enum([
  'worldwide',
  'north_america',
  'canada',
  'europe',
  'spain',
  'latvia',
  'uk',
  'france',
  'germany',
  'australia',
  'japan',
  'new_zealand',
  'italy',
  'brazil',
  'southeast_asia',
  'republic_of_korea',
  'english_speaking_regions',
  'all',
])
export type SellingRegionName = z.infer<typeof SellingRegionName>
