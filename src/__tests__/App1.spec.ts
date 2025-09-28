import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { describe, it, expect } from 'vitest'

describe('App.vue', () => {
  it('renders main message', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toMatch(/product/i)
  })
})