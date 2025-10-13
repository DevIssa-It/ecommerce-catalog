<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from './components/ProductCard.vue'
import { fetchProductsById, type Product } from './services/ProductService.ts'
import './assets/styles.css'

const index = ref(1)
const currentProduct = ref<Product | null>(null)
const isProductAvailable = ref(false)

const loadProduct = async () => {
  currentProduct.value = null
  isProductAvailable.value = false

  try {
    const data = await fetchProductsById(index.value)

    // Directly assign the data to currentProduct for better accessibility
    currentProduct.value = data

    // Improved logic for product availability
    // Product is available only if it exists AND belongs to desired categories
    if (data && (data.category === "men's clothing" || data.category === "women's clothing")) {
      isProductAvailable.value = true
    } else {
      // Product exists but doesn't match category criteria
      isProductAvailable.value = false
      currentProduct.value = null
    }
  } catch (error) {
    // Enhanced error handling for API failures
    console.error('Failed to fetch product:', error)
    currentProduct.value = null
    isProductAvailable.value = false
  }
}

const nextProduct = () => {
  index.value++
  if (index.value > 20) index.value = 1
  loadProduct()
}

onMounted(loadProduct)

const pageClass = computed(() => {
  if (!isProductAvailable.value || !currentProduct.value) {
    return 'page-unavailable'
  }

  if (currentProduct.value.category === "men's clothing") return 'page-men'
  if (currentProduct.value.category === "women's clothing") return 'page-women'
  return 'page-unavailable'
})
</script>

<template>
  <div :class="['page', pageClass]">
    <productCard :product="isProductAvailable ? currentProduct : null" @next="nextProduct" />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
