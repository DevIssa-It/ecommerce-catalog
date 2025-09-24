<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { fetchProductsById } from "./services/ProductService.ts";
import "./assets/styles.css"

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const index = ref(1);
const currentProduct = ref<Product | null>(null);

const loadProduct = async () => {
  try {
    const product =await fetchProductsById(index.value);
    if (
      product.category === "men's clothing" ||
      product.category === "women's clothing"
    ) {
      currentProduct.value = product;
    } else {
      currentProduct.value = null;
    }
  } catch {
    currentProduct.value = null;
  }
}

const nextProduct = () => {
  index.value++
  if (index.value > 20) index.value = 1;
  loadProduct(); {
  }
}

onMounted(loadProduct);

const pageClass = computed(() => {
  if (!currentProduct.value) return "page-unavailable";
  if (currentProduct.value.category === "men's clothing") return "page-men";
  if (currentProduct.value.category === "women's clothing") return "page-women";
  return "page-unavailable";
});

</script>

<template>
  <div :class="[ 'page', pageClass]">
    <productCard :product="currentProduct" @next="nextProduct" />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
