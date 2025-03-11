import type { Options } from 'ky'
import {
  CATALOG_CATEGORY_RESOURCE,
  CATALOG_PRODUCTS_RESOURCE,
  CATALOG_VARIANTS_RESOURCE,
} from '@printful-ts/constants'
import { bound, trace } from '@printful-ts/decorators'
import {
  GetCatalogCategoryResponse,
  GetProductBlankMockupsResponse,
  GetProductBlankMockupsSearchParams,
  GetProductMockupsResponse,
  GetProductMockupsSearchParams,
  GetProductMockupTemplatesResponse,
  GetProductMockupTemplatesSearchParams,
  GetProductResponse,
  GetProductSearchParams,
  GetProductSizeGuideResponse,
  GetProductSizeGuideSearchParams,
  GetProductStockAvailabilityResponse,
  GetProductStockAvailabilitySearchParams,
  GetProductVariantResponse,
  GetVariantStockAvailabilityResponse,
  GetVariantStockAvailabilitySearchParams,
  GetVarianttBlankMockupsResponse,
  GetVarianttBlankMockupsSearchParams,
  Locale,
  ListCatalogCategoriesResponse,
  ListProductCategoriesResponse,
  ListProductCategoriesSearchParams,
  ListProductPricesResponse,
  ListProductPricesSearchParams,
  ListProductsResponse,
  ListProductsSearchParams,
  ListProductVariantPricesResponse,
  ListProductVariantPricesSearchParams,
  ListProductVariantsResponse,
} from '@printful-ts/schemas'
import { PrintfulApiService } from './printful-api.service'

export class CatalogProductsService extends PrintfulApiService {
  @bound
  @trace
  async listProducts(
    params: ListProductsSearchParams = {},
    options: Options = {},
  ) {
    const { locale, ...searchParams } = ListProductsSearchParams.parse(params)

    return await this.request(
      CATALOG_PRODUCTS_RESOURCE,
      {
        ...options,
        locale,
        searchParams,
      },
      ListProductsResponse,
    )
  }

  @bound
  @trace
  async getProduct(
    product_id: number,
    params: GetProductSearchParams,
    options: Options = {},
  ) {
    const { locale, ...searchParams } = GetProductSearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductResponse,
    )
  }

  @bound
  @trace
  async listProductVariants(
    product_id: number,
    locale?: Locale,
    options: Options = {},
  ) {
    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/${CATALOG_VARIANTS_RESOURCE}`,
      {
        ...options,
        locale,
      },
      ListProductVariantsResponse,
    )
  }

  @bound
  @trace
  async getProductVariant(
    variant_id: number,
    locale?: Locale,
    options: Options = {},
  ) {
    return await this.request(
      `${CATALOG_VARIANTS_RESOURCE}/${variant_id}`,
      {
        ...options,
        locale,
      },
      GetProductVariantResponse,
    )
  }

  @bound
  @trace
  async listProductCategories(
    product_id: number,
    params: ListProductCategoriesSearchParams,
    options: Options = {},
  ) {
    const searchParams = ListProductCategoriesSearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/${CATALOG_CATEGORY_RESOURCE}`,
      {
        ...options,
        searchParams,
      },
      ListProductCategoriesResponse,
    )
  }

  @bound
  @trace
  async listCategories(options: Options = {}) {
    return await this.request(
      `${CATALOG_CATEGORY_RESOURCE}`,
      options,
      ListCatalogCategoriesResponse,
    )
  }

  @bound
  @trace
  async getCategory(category_id: number, options: Options = {}) {
    return await this.request(
      `${CATALOG_CATEGORY_RESOURCE}/${category_id}`,
      options,
      GetCatalogCategoryResponse,
    )
  }

  @bound
  @trace
  async getProductSizeGuide(
    product_id: number,
    params: GetProductSizeGuideSearchParams = {},
    options: Options = {},
  ) {
    const { locale, ...searchParams } =
      GetProductSizeGuideSearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/${CATALOG_CATEGORY_RESOURCE}`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductSizeGuideResponse,
    )
  }

  @bound
  @trace
  async listProductPrices(
    product_id: number,
    params: ListProductPricesSearchParams = {},
    options: Options = {},
  ) {
    const { locale, ...searchParams } =
      ListProductPricesSearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/prices`,
      {
        ...options,
        locale,
        searchParams,
      },
      ListProductPricesResponse,
    )
  }

  @bound
  @trace
  async listProductVariantPrices(
    variant_id: number,
    params: ListProductVariantPricesSearchParams = {},
    options: Options = {},
  ) {
    const { locale, ...searchParams } =
      ListProductVariantPricesSearchParams.parse(params)

    return await this.request(
      `${CATALOG_VARIANTS_RESOURCE}/${variant_id}/prices`,
      {
        ...options,
        locale,
        searchParams,
      },
      ListProductVariantPricesResponse,
    )
  }

  @bound
  @trace
  async getProductBlankMockups(
    product_id: number,
    params: GetProductBlankMockupsSearchParams,
    options: Options,
  ) {
    const { locale, ...searchParams } =
      GetProductBlankMockupsSearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/images`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductBlankMockupsResponse,
    )
  }

  @bound
  @trace
  async getProductVariantBlankMockups(
    variant_id: number,
    params: GetVarianttBlankMockupsSearchParams,
    options: Options,
  ) {
    const { locale, ...searchParams } =
      GetVarianttBlankMockupsSearchParams.parse(params)

    return await this.request(
      `${CATALOG_VARIANTS_RESOURCE}/${variant_id}/images`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetVarianttBlankMockupsResponse,
    )
  }

  @bound
  @trace
  async getProductMockups(
    product_id: number,
    params: GetProductMockupsSearchParams,
    options: Options,
  ) {
    const { locale, ...searchParams } =
      GetProductMockupsSearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/mockup-styles`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductMockupsResponse,
    )
  }

  @bound
  @trace
  async getProductMockupTemplates(
    product_id: number,
    params: GetProductMockupTemplatesSearchParams,
    options: Options,
  ) {
    const { locale, ...searchParams } =
      GetProductMockupTemplatesSearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/mockup-styles`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductMockupTemplatesResponse,
    )
  }

  @bound
  @trace
  async getProductStockAvailability(
    product_id: number,
    params: GetProductStockAvailabilitySearchParams = {},
    options: Options = {},
  ) {
    const { locale, ...searchParams } =
      GetProductStockAvailabilitySearchParams.parse(params)

    return await this.request(
      `${CATALOG_PRODUCTS_RESOURCE}/${product_id}/availability`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetProductStockAvailabilityResponse,
    )
  }

  @bound
  @trace
  async getProductVariantStockAvailability(
    variant_id: number,
    params: GetVariantStockAvailabilitySearchParams = {},
    options: Options = {},
  ) {
    const { locale, ...searchParams } =
      GetVariantStockAvailabilitySearchParams.parse(params)

    return await this.request(
      `${CATALOG_VARIANTS_RESOURCE}/${variant_id}/availability`,
      {
        ...options,
        locale,
        searchParams,
      },
      GetVariantStockAvailabilityResponse,
    )
  }
}
