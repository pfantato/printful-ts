import type { Options } from 'ky'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  GetCatalogCategoryResponse,
  GetProductBlankMockupsResponse,
  GetProductBlankMockupsSearchInput,
  GetProductMockupsResponse,
  GetProductMockupsSearchInput,
  GetProductMockupTemplatesResponse,
  GetProductMockupTemplatesSearchInput,
  GetProductResponse,
  GetProductSearchInput,
  GetProductSizeGuideResponse,
  GetProductSizeGuideSearchInput,
  GetProductStockAvailabilityResponse,
  GetProductStockAvailabilitySearchInput,
  GetProductVariantResponse,
  GetVariantBlankMockupsResponse,
  GetVariantBlankMockupsSearchInput,
  GetVariantStockAvailabilityResponse,
  GetVariantStockAvailabilitySearchInput,
  InternalId,
  ListCatalogCategoriesResponse,
  ListProductCategoriesResponse,
  ListProductCategoriesSearchParams,
  ListProductPricesResponse,
  ListProductPricesSearchParams,
  ListProductsResponse,
  ListProductsSearchInput,
  ListProductVariantPricesResponse,
  ListProductVariantPricesSearchParams,
  ListProductVariantsResponse,
  Locale,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class CatalogProductsService extends PrintfulApiService {
  async listProducts(
    params: ListProductsSearchInput = {},
    options: Options = {},
  ) {
    const { locale, ...searchParams } = ListProductsSearchInput.parse(params)

    return await this.makeRequest(
      PrintfulApiResources.CATALOG_PRODUCTS,
      {
        ...options,
        locale,
        searchParams,
      },
      ListProductsResponse,
    )
  }

  async getProduct(
    productId: number,
    params: GetProductSearchInput = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)
    const { locale, ...searchParams } = GetProductSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductResponse,
    )
  }

  async listProductVariants(
    productId: number,
    locale?: Locale,
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/${PrintfulApiResources.CATALOG_VARIANTS}`,
      {
        ...options,
        locale,
      },
      ListProductVariantsResponse,
    )
  }

  async getProductVariant(
    variantId: number,
    locale?: Locale,
    options: Options = {},
  ) {
    const variant_id = InternalId.parse(variantId)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}`,
      {
        ...options,
        locale,
      },
      GetProductVariantResponse,
    )
  }

  async listProductCategories(
    productId: number,
    params: ListProductCategoriesSearchParams = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)

    const searchParams = ListProductCategoriesSearchParams.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/${PrintfulApiResources.CATALOG_CATEGORIES}`,
      {
        ...options,
        searchParams,
      },
      ListProductCategoriesResponse,
    )
  }

  async listCategories(options: Options = {}) {
    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_CATEGORIES}`,
      options,
      ListCatalogCategoriesResponse,
    )
  }

  async getCategory(categoryId: number, options: Options = {}) {
    const category_id = InternalId.parse(categoryId)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_CATEGORIES}/${category_id}`,
      options,
      GetCatalogCategoryResponse,
    )
  }

  async getProductSizeGuide(
    productId: number,
    params: GetProductSizeGuideSearchInput = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)

    const { locale, ...searchParams } =
      GetProductSizeGuideSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/sizes`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductSizeGuideResponse,
    )
  }

  async listProductPrices(
    productId: number,
    params: ListProductPricesSearchParams = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)
    const { locale, ...searchParams } =
      ListProductPricesSearchParams.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/prices`,
      {
        ...options,
        locale,
        searchParams,
      },
      ListProductPricesResponse,
    )
  }

  async listProductVariantPrices(
    variantId: number,
    params: ListProductVariantPricesSearchParams = {},
    options: Options = {},
  ) {
    const variant_id = InternalId.parse(variantId)

    const { locale, ...searchParams } =
      ListProductVariantPricesSearchParams.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}/prices`,
      {
        ...options,
        locale,
        searchParams,
      },
      ListProductVariantPricesResponse,
    )
  }

  async getProductBlankMockups(
    productId: number,
    params: GetProductBlankMockupsSearchInput = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)

    const { locale, ...searchParams } =
      GetProductBlankMockupsSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/images`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductBlankMockupsResponse,
    )
  }

  async getProductVariantBlankMockups(
    variantId: number,
    params: GetVariantBlankMockupsSearchInput = {},
    options: Options = {},
  ) {
    const variant_id = InternalId.parse(variantId)

    const { locale, ...searchParams } =
      GetVariantBlankMockupsSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}/images`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetVariantBlankMockupsResponse,
    )
  }

  async getProductMockups(
    productId: number,
    params: GetProductMockupsSearchInput = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)

    const { locale, ...searchParams } =
      GetProductMockupsSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/mockup-styles`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductMockupsResponse,
    )
  }

  async getProductMockupTemplates(
    productId: number,
    params: GetProductMockupTemplatesSearchInput = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)

    const { locale, ...searchParams } =
      GetProductMockupTemplatesSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/mockup-templates`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductMockupTemplatesResponse,
    )
  }

  async getProductStockAvailability(
    productId: number,
    params: GetProductStockAvailabilitySearchInput = {},
    options: Options = {},
  ) {
    const product_id = InternalId.parse(productId)

    const { locale, ...searchParams } =
      GetProductStockAvailabilitySearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/availability`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductStockAvailabilityResponse,
    )
  }

  async getProductVariantStockAvailability(
    variantId: number,
    params: GetVariantStockAvailabilitySearchInput = {},
    options: Options = {},
  ) {
    const variant_id = InternalId.parse(variantId)

    const { locale, ...searchParams } =
      GetVariantStockAvailabilitySearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}/availability`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetVariantStockAvailabilityResponse,
    )
  }
}
