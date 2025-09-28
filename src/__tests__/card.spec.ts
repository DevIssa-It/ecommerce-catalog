import { mount } from '@vue/test-utils'
import ProductCard from '../components/ProductCard.vue'
import { describe, it, expect } from 'vitest'

describe('ProductCard.vue', () => {
  const product = {
    id: 1,
    title: 'Test Product',
    price: 10000,
    image: 'test.jpg',
    description: 'Deskripsi produk',
    category: 'test',
    rating: {
      rate: 4.5,
      count: 100
    }
  }

  it('renders product name and price', () => {
    const wrapper = mount(ProductCard, { props: { product } })
    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('10000')
  })

  it('emits "next" event when button clicked', async () => {
    const wrapper = mount(ProductCard, { props: { product } })
    await wrapper.find('.next-product').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('next')
  })
})