import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { HTTPError } from 'ky'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  GetCatalogCategoryResponse,
  GetProductBlankMockupsResponse,
  GetProductMockupsResponse,
  GetProductMockupsSearchInput,
  GetProductMockupTemplatesResponse,
  GetProductResponse,
  GetProductSearchInput,
  GetProductSizeGuideResponse,
  GetProductSizeGuideSearchInput,
  GetProductStockAvailabilityResponse,
  GetProductStockAvailabilitySearchInput,
  GetProductVariantResponse,
  GetVariantStockAvailabilityResponse,
  GetVariantBlankMockupsResponse,
  GetVariantBlankMockupsSearchInput,
  GetVariantStockAvailabilitySearchInput,
  ListCatalogCategoriesResponse,
  ListProductCategoriesResponse,
  ListProductCategoriesSearchParams,
  ListProductPricesResponse,
  ListProductPricesSearchParams,
  ListProductsResponse,
  ListProductVariantPricesResponse,
  ListProductVariantPricesSearchParams,
  ListProductVariantsResponse,
  Locale,
  ListProductsSearchInput,
  PrintfulResponseError,
  GetProductBlankMockupsSearchInput,
} from '@printful-ts/schemas'

import {
  CatalogProductsServiceMock,
  getCategoryScenarios,
  getProductBlankMockupsScenarios,
  getProductMockupsScenarios,
  getProductSizeGuideScenarios,
  getProductStockAvailabilityScenarios,
  getProductVariantBlankMockupsScenarios,
  getProductVariantScenarios,
  getProductVariantStockAvailabilityScenarios,
  listCategoriesScenarios,
  listProductCategoriesScenarios,
  listProductPricesScenarios,
  listProductsScenarios,
  listProductVariantPricesScenarios,
  listProductVariantsScenarios,
  mockServer,
} from 'tests/mocks'
import { validateSchema } from 'tests/utils'
import {
  externalIdMock,
  getProductBlankMockupsSearchInputMock,
  getProductMockupsSearchInputMock,
  getProductMockupTemplatesSearchInputMock,
  getProductSearchInputMock,
  getProductSizeGuideSearchInputMock,
  getProductStockAvailabilitySearchInputMock,
  getVariantBlankMockupsSearchInputMock,
  getVariantStockAvailabilitySearchInputMock,
  idMock,
  listProductCategoriesSearchParamsMock,
  listProductPricesSearchParamsMock,
  listProductsSearchInputMock,
  listProductVariantPricesSearchParamsMock,
  localeMock,
} from 'tests/mocks/schemas'
import { getProductScenarios } from 'tests/mocks/scenarios/catalog/get-product.scenarios'
import { ZodError } from 'zod'
import { faker } from '@faker-js/faker'
import { getProductMockupTemplatesScenarios } from 'tests/mocks/scenarios/catalog/get-product-mockup-templates.scenarios'

describe('CatalogProductsService', () => {
  let service: CatalogProductsServiceMock
  let requestSpy: MockInstance<typeof service.makeRequest>

  beforeEach(() => {
    service = new CatalogProductsServiceMock()
    requestSpy = vi.spyOn(service, 'makeRequest')
  })

  describe('listProducts', () => {
    const errorScenarios = listProductsScenarios().errors

    it('should call the request method with correct parameters', async () => {
      const input = listProductsSearchInputMock()

      const {
        data: { locale, ...searchParams },
      } = validateSchema(ListProductsSearchInput, input)

      const response = await service.listProducts(input)

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.CATALOG_PRODUCTS,
        {
          locale,
          searchParams,
        },
        ListProductsResponse,
      )

      expect(ListProductsResponse.safeParse(response).success).toBe(true)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const response = await service.listProducts()
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        await expect(
          service.listProducts(undefined, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProduct', () => {
    const errorScenarios = getProductScenarios().errors

    it('should call the request method with correct parameters', async () => {
      const product_id = idMock()
      const inputMock: GetProductSearchInput = getProductSearchInputMock()

      const { locale, ...searchParams } = GetProductSearchInput.parse(inputMock)

      await service.getProduct(product_id, inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}`,
        {
          locale,
          searchParams,
        },
        GetProductResponse,
      )
    })

    it('should throw ZodError when product_id is not provided', async () => {
      await expect(service.getProduct(undefined)).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when input is not valid', async () => {
      const product_id = idMock()

      const input: GetProductSearchInput = {
        locale: 'pt_BR',
        // @ts-expect-error testing input validation
        selling_region_name: 'test',
      }

      await expect(service.getProduct(product_id, input)).rejects.toThrowError(
        ZodError,
      )

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock: GetProductSearchInput = getProductSearchInputMock()

        const response = await service.getProduct(product_id, inputMock)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock: GetProductSearchInput = getProductSearchInputMock()

        await expect(
          service.getProduct(product_id, inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('listProductVariants', () => {
    const errorScenarios = listProductVariantsScenarios().errors

    it('should call the request method with correct parameters when locale is provided', async () => {
      const product_id = idMock()
      const locale = localeMock()

      const response = await service.listProductVariants(product_id, locale)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/${PrintfulApiResources.CATALOG_VARIANTS}`,
        { locale },
        ListProductVariantsResponse,
      )

      expect(ListProductVariantsResponse.safeParse(response).success).toBe(true)
    })

    it('should call the request method with correct parameters when locale is not provided', async () => {
      const product_id = idMock()

      await service.listProductVariants(product_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/${PrintfulApiResources.CATALOG_VARIANTS}`,
        {},
        ListProductVariantsResponse,
      )
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()

        const response = await service.listProductVariants(product_id)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const locale = localeMock()

        await expect(
          service.listProductVariants(product_id, locale, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductVariant', () => {
    const errorScenarios = getProductVariantScenarios().errors

    it('should make the request with provided locale and return valid response', async () => {
      const variant_id = idMock()
      const locale: Locale = localeMock()

      const response = await service.getProductVariant(variant_id, locale)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}`,
        { locale },
        GetProductVariantResponse,
      )

      expect(GetProductVariantResponse.safeParse(response).success).toBe(true)
    })

    it('should trigger ZodError when variant_id is not provided', async () => {
      await expect(service.getProductVariant(undefined)).rejects.toThrowError(
        ZodError,
      )

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const locale: Locale = localeMock()

        const response = await service.getProductVariant(variant_id, locale)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const locale: Locale = localeMock()

        await expect(
          service.getProductVariant(variant_id, locale, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('listProductCategories', () => {
    const errorScenarios = listProductCategoriesScenarios().errors

    it('should call the request method with correct parameters', async () => {
      const product_id = idMock()
      const searchParams: ListProductCategoriesSearchParams =
        listProductCategoriesSearchParamsMock()

      const response = await service.listProductCategories(
        product_id,
        searchParams,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/${PrintfulApiResources.CATALOG_CATEGORIES}`,
        {
          searchParams,
        },
        ListProductCategoriesResponse,
      )

      expect(ListProductCategoriesResponse.safeParse(response).success).toBe(
        true,
      )
    })

    it('should make the request without searchParams and return valid response', async () => {
      const product_id = idMock()

      const response = await service.listProductCategories(product_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/${PrintfulApiResources.CATALOG_CATEGORIES}`,
        {
          searchParams: {},
        },
        ListProductCategoriesResponse,
      )

      expect(ListProductCategoriesResponse.safeParse(response).success).toBe(
        true,
      )
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const searchParams: ListProductCategoriesSearchParams =
          listProductCategoriesSearchParamsMock()

        const response = await service.listProductCategories(
          product_id,
          searchParams,
        )

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const searchParams: ListProductCategoriesSearchParams =
          listProductCategoriesSearchParamsMock()

        await expect(
          service.listProductCategories(product_id, searchParams, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('listCategories', () => {
    const errorScenarios = listCategoriesScenarios().errors

    it('should call the request method with correct parameters', async () => {
      const response = await service.listCategories()

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.CATALOG_CATEGORIES,
        {},
        ListCatalogCategoriesResponse,
      )

      expect(ListCatalogCategoriesResponse.safeParse(response).success).toBe(
        true,
      )
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const response = await service.listCategories()

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        await expect(
          service.listCategories({
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getCategory', () => {
    const errorScenarios = getCategoryScenarios().errors

    it('should call the request method with correct parameters', async () => {
      const category_id = idMock()

      await service.getCategory(category_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_CATEGORIES}/${category_id}`,
        {},
        GetCatalogCategoryResponse,
      )
    })

    it('should throw ZodError when category_id is not provided', async () => {
      await expect(service.getCategory(undefined)).rejects.toThrowError(
        ZodError,
      )

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const category_id = idMock()

        const response = await service.getCategory(category_id)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const category_id = idMock()

        await expect(
          service.getCategory(category_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductSizeGuide', () => {
    const errorScenarios = getProductSizeGuideScenarios().errors
    it('should make the request with provided searchParams and return valid response', async () => {
      const product_id = idMock()
      const inputMock: GetProductSizeGuideSearchInput =
        getProductSizeGuideSearchInputMock()

      const { locale, ...searchParams } =
        GetProductSizeGuideSearchInput.parse(inputMock)

      const response = await service.getProductSizeGuide(product_id, inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/sizes`,
        {
          locale,
          searchParams,
        },
        GetProductSizeGuideResponse,
      )

      expect(GetProductSizeGuideResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError when product_id is not provided', async () => {
      await expect(service.getProductSizeGuide(undefined)).rejects.toThrowError(
        ZodError,
      )

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when params is invalid', async () => {
      const product_id = idMock()
      const params = {
        unit: [faker.lorem.word()],
      }

      await expect(
        // @ts-expect-error params type is invalid
        service.getProductSizeGuide(product_id, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()

        const response = await service.getProductSizeGuide(product_id)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const params = getProductSizeGuideSearchInputMock()

        await expect(
          service.getProductSizeGuide(product_id, params, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('listProductPrices', () => {
    it('should call the request method with correct parameters when locale is provided', async () => {
      const product_id = idMock()
      const params = listProductPricesSearchParamsMock()

      const response = await service.listProductPrices(product_id, params)

      const { locale, ...searchParams } =
        ListProductPricesSearchParams.parse(params)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/prices`,
        { locale, searchParams },
        ListProductPricesResponse,
      )

      expect(ListProductPricesResponse.safeParse(response).success).toBe(true)
    })

    const errorScenarios = listProductPricesScenarios().errors

    it('should throw ZodError if provided params are invalid', async () => {
      const product_id = idMock()
      const params = listProductPricesSearchParamsMock()

      await expect(
        service.listProductPrices(product_id, {
          ...params,
          // @ts-expect-error expected wrong selling_region_name
          selling_region_name: faker.lorem.word(),
        }),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when product_id is not provided', async () => {
      const params = listProductPricesSearchParamsMock()

      await expect(
        service.listProductPrices(undefined, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const params = listProductPricesSearchParamsMock()

        const response = await service.listProductPrices(product_id, params)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const params = listProductPricesSearchParamsMock()

        await expect(
          service.listProductPrices(product_id, params, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('listProductVariantPrices', () => {
    it('should make the request and return valid response when all parameters are provided', async () => {
      const variant_id = idMock()
      const params = listProductVariantPricesSearchParamsMock()

      const response = await service.listProductVariantPrices(
        variant_id,
        params,
      )

      const { locale, ...searchParams } =
        ListProductVariantPricesSearchParams.parse(params)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}/prices`,
        { locale, searchParams },
        ListProductVariantPricesResponse,
      )

      expect(
        ListProductVariantPricesSearchParams.safeParse(response).success,
      ).toBe(true)
    })

    const errorScenarios = listProductVariantPricesScenarios().errors

    it('should throw ZodError if provided params are invalid', async () => {
      const variant_id = idMock()
      const params = listProductVariantPricesSearchParamsMock()

      await expect(
        service.listProductVariantPrices(variant_id, {
          ...params,
          // @ts-expect-error expected wrong selling_region_name
          selling_region_name: faker.lorem.word(),
        }),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when product_id is not provided', async () => {
      const params = listProductVariantPricesSearchParamsMock()

      await expect(
        service.listProductVariantPrices(undefined, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const params = listProductVariantPricesSearchParamsMock()

        const response = await service.listProductVariantPrices(
          variant_id,
          params,
        )

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const params = listProductVariantPricesSearchParamsMock()

        await expect(
          service.listProductVariantPrices(variant_id, params, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductBlankMockups', () => {
    const errorScenarios = getProductBlankMockupsScenarios().errors

    it('should make the request with provided searchParams and return valid response', async () => {
      const product_id = idMock()
      const inputMock = getProductBlankMockupsSearchInputMock()

      const { locale, ...searchParams } =
        GetProductBlankMockupsSearchInput.parse(inputMock)

      const response = await service.getProductBlankMockups(
        product_id,
        inputMock,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/images`,
        {
          locale,
          searchParams,
        },
        GetProductBlankMockupsResponse,
      )

      expect(GetProductBlankMockupsResponse.safeParse(response).success).toBe(
        true,
      )
    })

    it('should throw ZodError when product_id is not provided', async () => {
      const inputMock = getProductBlankMockupsSearchInputMock()

      await expect(
        service.getProductBlankMockups(undefined, inputMock),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when params is invalid', async () => {
      const product_id = idMock()
      const params: GetProductBlankMockupsSearchInput = {
        // @ts-expect-error string[] is not assignable to number[]
        mockup_style_ids: faker.helpers.multiple(externalIdMock, {
          count: { min: 1, max: 3 },
        }),
      }

      await expect(
        service.getProductBlankMockups(product_id, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductBlankMockupsSearchInputMock()

        const response = await service.getProductBlankMockups(
          product_id,
          inputMock,
        )

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductBlankMockupsSearchInputMock()

        await expect(
          service.getProductBlankMockups(product_id, inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductVariantBlankMockups', () => {
    const errorScenarios = getProductVariantBlankMockupsScenarios().errors

    it('should make the request with provided searchParams and return valid response', async () => {
      const variant_id = idMock()
      const inputMock = getVariantBlankMockupsSearchInputMock()

      const { locale, ...searchParams } =
        GetVariantBlankMockupsSearchInput.parse(inputMock)

      const response = await service.getProductVariantBlankMockups(
        variant_id,
        inputMock,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}/images`,
        {
          locale,
          searchParams,
        },
        GetVariantBlankMockupsResponse,
      )

      expect(GetVariantBlankMockupsResponse.safeParse(response).success).toBe(
        true,
      )
    })

    it('should throw ZodError when variant_id is not provided', async () => {
      const inputMock = getVariantBlankMockupsSearchInputMock()

      await expect(
        service.getProductVariantBlankMockups(undefined, inputMock),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when params is invalid', async () => {
      const variant_id = idMock()
      const params: GetVariantBlankMockupsSearchInput = {
        // @ts-expect-error string[] is not assignable to number[]
        mockup_style_ids: faker.helpers.multiple(externalIdMock, {
          count: { min: 1, max: 3 },
        }),
      }

      await expect(
        service.getProductVariantBlankMockups(variant_id, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const inputMock = getVariantBlankMockupsSearchInputMock()

        const response = await service.getProductVariantBlankMockups(
          variant_id,
          inputMock,
        )

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const inputMock = getVariantBlankMockupsSearchInputMock()

        await expect(
          service.getProductVariantBlankMockups(variant_id, inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductMockups', () => {
    const errorScenarios = getProductMockupsScenarios().errors

    it('should make the request with provided searchParams and return valid response', async () => {
      const product_id = idMock()
      const inputMock = getProductMockupsSearchInputMock()

      const { locale, ...searchParams } =
        GetProductMockupsSearchInput.parse(inputMock)

      const response = await service.getProductMockups(product_id, inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/mockup-styles`,
        {
          locale,
          searchParams,
        },
        GetProductMockupsResponse,
      )

      expect(GetProductMockupsResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError when product_id is not provided', async () => {
      const inputMock = getProductMockupsSearchInputMock()

      await expect(
        service.getProductMockups(undefined, inputMock),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when params is invalid', async () => {
      const product_id = idMock()
      const params: GetProductMockupsSearchInput = {
        // @ts-expect-error string is not assignable to SellingRegionName
        selling_region_name: faker.lorem.word(),
      }

      await expect(
        service.getProductMockups(product_id, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductMockupsSearchInputMock()

        const response = await service.getProductMockups(product_id, inputMock)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductMockupsSearchInputMock()

        await expect(
          service.getProductMockups(product_id, inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductMockupTemplates', () => {
    const errorScenarios = getProductMockupTemplatesScenarios().errors

    it('should make the request with provided searchParams and return valid response', async () => {
      const product_id = idMock()
      const inputMock = getProductMockupTemplatesSearchInputMock()

      const { locale, ...searchParams } =
        GetProductMockupsSearchInput.parse(inputMock)

      const response = await service.getProductMockupTemplates(
        product_id,
        inputMock,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/mockup-templates`,
        {
          locale,
          searchParams,
        },
        GetProductMockupTemplatesResponse,
      )

      expect(
        GetProductMockupTemplatesResponse.safeParse(response).success,
      ).toBe(true)
    })

    it('should throw ZodError when product_id is not provided', async () => {
      const inputMock = getProductMockupTemplatesSearchInputMock()

      await expect(
        service.getProductMockupTemplates(undefined, inputMock),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when params is invalid', async () => {
      const product_id = idMock()
      const params: GetProductMockupsSearchInput = {
        // @ts-expect-error string is not assignable to SellingRegionName
        selling_region_name: faker.lorem.word(),
      }

      await expect(
        service.getProductMockupTemplates(product_id, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductMockupTemplatesSearchInputMock()

        const response = await service.getProductMockupTemplates(
          product_id,
          inputMock,
        )

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductMockupTemplatesSearchInputMock()

        await expect(
          service.getProductMockupTemplates(product_id, inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductStockAvailability', () => {
    const errorScenarios = getProductStockAvailabilityScenarios().errors

    it('should make the request with provided searchParams and return valid response', async () => {
      const product_id = idMock()
      const inputMock = getProductStockAvailabilitySearchInputMock()

      const { locale, ...searchParams } =
        GetProductStockAvailabilitySearchInput.parse(inputMock)

      const response = await service.getProductStockAvailability(
        product_id,
        inputMock,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_PRODUCTS}/${product_id}/availability`,
        {
          locale,
          searchParams,
        },
        GetProductStockAvailabilityResponse,
      )

      expect(
        GetProductStockAvailabilityResponse.safeParse(response).success,
      ).toBe(true)
    })

    it('should throw ZodError when product_id is not provided', async () => {
      const inputMock = getProductStockAvailabilitySearchInputMock()

      await expect(
        service.getProductStockAvailability(undefined, inputMock),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when params is invalid', async () => {
      const product_id = idMock()
      const params: GetProductMockupsSearchInput = {
        // @ts-expect-error string is not assignable to SellingRegionName
        selling_region_name: faker.lorem.word(),
      }

      await expect(
        service.getProductStockAvailability(product_id, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductStockAvailabilitySearchInputMock()

        const response = await service.getProductStockAvailability(
          product_id,
          inputMock,
        )

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const product_id = idMock()
        const inputMock = getProductStockAvailabilitySearchInputMock()

        await expect(
          service.getProductStockAvailability(product_id, inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getProductVariantStockAvailability', () => {
    const errorScenarios = getProductVariantStockAvailabilityScenarios().errors

    it('should make the request with provided searchParams and return valid response', async () => {
      const variant_id = idMock()
      const inputMock = getVariantStockAvailabilitySearchInputMock()

      const { locale, ...searchParams } =
        GetVariantStockAvailabilitySearchInput.parse(inputMock)

      const response = await service.getProductVariantStockAvailability(
        variant_id,
        inputMock,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.CATALOG_VARIANTS}/${variant_id}/availability`,
        {
          locale,
          searchParams,
        },
        GetVariantStockAvailabilityResponse,
      )

      expect(
        GetVariantStockAvailabilityResponse.safeParse(response).success,
      ).toBe(true)
    })

    it('should throw ZodError when variant_id is not provided', async () => {
      const inputMock = getVariantStockAvailabilitySearchInputMock()

      await expect(
        service.getProductVariantStockAvailability(undefined, inputMock),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError when params is invalid', async () => {
      const variant_id = idMock()
      const params: GetVariantStockAvailabilitySearchInput = {
        // @ts-expect-error string is not assignable to SellingRegionName
        selling_region_name: faker.lorem.word(),
      }

      await expect(
        service.getProductVariantStockAvailability(variant_id, params),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const inputMock = getVariantStockAvailabilitySearchInputMock()

        const response = await service.getProductVariantStockAvailability(
          variant_id,
          inputMock,
        )

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const variant_id = idMock()
        const inputMock = getVariantStockAvailabilitySearchInputMock()

        await expect(
          service.getProductVariantStockAvailability(variant_id, inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })
})
