import { describe, it, expect } from 'vitest'
import * as ProductService from '../services/ProductService'

describe('ProductService', () => {
  it('should fetch product by id', async () => {
    const product = await ProductService.fetchProductsById(1)
    expect(product).toHaveProperty('id', 1)
  })
})