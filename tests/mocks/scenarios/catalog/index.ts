import type { CatalogProductsService } from '@printful-ts/services'

import { BASE_URL } from 'tests/mocks/constants'
import type { ServiceScenarioMock } from 'tests/utils'

import { getCategoryScenarios } from './get-category.scenarios'
import { getProductBlankMockupsScenarios } from './get-product-blank-mockups.scenarios'
import { getProductMockupsScenarios } from './get-product-mockups.scenarios'
import { getProductMockupTemplatesScenarios } from './get-product-mockup-templates.scenarios'
import { getProductScenarios } from './get-product.scenarios'
import { getProductSizeGuideScenarios } from './get-product-size-guide.scenarios'
import { getProductStockAvailabilityScenarios } from './get-product-stock-availability.scenarios'
import { getProductVariantBlankMockupsScenarios } from './get-product-variant-blank-mockups.scenarios'
import { getProductVariantScenarios } from './get-product-variant.scenarios'
import { getProductVariantStockAvailabilityScenarios } from './get-product-variant-stock-availability.scenarios'
import { listCategoriesScenarios } from './list-categories.scenarios'
import { listProductCategoriesScenarios } from './list-product-categories.scenarios'
import { listProductPricesScenarios } from './list-product-prices.scenarios'
import { listProductsScenarios } from './list-products.scenarios'
import { listProductVariantPricesScenarios } from './list-product-variant-prices.scenarios'
import { listProductVariantsScenarios } from './list-product-variants.scenarios'

export const catalogScenarios = (
  baseUrl = BASE_URL,
): Partial<ServiceScenarioMock<CatalogProductsService>> => ({
  getCategory: getCategoryScenarios(baseUrl),
  getProduct: getProductScenarios(baseUrl),
  getProductBlankMockups: getProductBlankMockupsScenarios(baseUrl),
  getProductMockups: getProductMockupsScenarios(baseUrl),
  getProductMockupTemplates: getProductMockupTemplatesScenarios(baseUrl),
  getProductSizeGuide: getProductSizeGuideScenarios(baseUrl),
  getProductStockAvailability: getProductStockAvailabilityScenarios(baseUrl),
  getProductVariant: getProductVariantScenarios(baseUrl),
  getProductVariantBlankMockups:
    getProductVariantBlankMockupsScenarios(baseUrl),
  getProductVariantStockAvailability:
    getProductVariantStockAvailabilityScenarios(baseUrl),
  listCategories: listCategoriesScenarios(baseUrl),
  listProductCategories: listProductCategoriesScenarios(baseUrl),
  listProductPrices: listProductPricesScenarios(baseUrl),
  listProducts: listProductsScenarios(baseUrl),
  listProductVariantPrices: listProductVariantPricesScenarios(baseUrl),
  listProductVariants: listProductVariantsScenarios(baseUrl),
})

export * from './get-category.scenarios'
export * from './get-product-blank-mockups.scenarios'
export * from './get-product-mockup-templates.scenarios'
export * from './get-product-mockups.scenarios'
export * from './get-product-size-guide.scenarios'
export * from './get-product-stock-availability.scenarios'
export * from './get-product-variant-blank-mockups.scenarios'
export * from './get-product-variant-stock-availability.scenarios'
export * from './get-product-variant.scenarios'
export * from './get-product.scenarios'
export * from './list-categories.scenarios'
export * from './list-product-categories.scenarios'
export * from './list-product-prices.scenarios'
export * from './list-product-variant-prices.scenarios'
export * from './list-product-variants.scenarios'
export * from './list-products.scenarios'
