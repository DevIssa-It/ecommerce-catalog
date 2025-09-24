<script setup lang="ts">
    import type { Product } from '../services/ProductService';
    import { ref, watch } from 'vue';

    const props = defineProps<{
        product : Product | null;
    }>();

    const emit = defineEmits<{
        next: [];
    }>();

    const isLoading = ref(false);
    const showUnavailable = ref(false);

    const handleUnavailableNext = () => {
        isLoading.value = true;
        showUnavailable.value = false;
        emit('next');
    };

    watch(() => props.product, (newProduct, oldProduct) => {
        // Jika ada product = tampilkan product
        if (newProduct !== null) {
            isLoading.value = false;
            showUnavailable.value = false;
        }
        // Jika dari product ke null = loading
        else if (oldProduct !== null && newProduct === null) {
            isLoading.value = true;
            showUnavailable.value = false;
            // Setelah delay, jika masih null = unavailable
            setTimeout(() => {
                if (props.product === null) {
                    isLoading.value = false;
                    showUnavailable.value = true;
                }
            }, 1200);
        }
        // Initial load (undefined ke null) = loading
        else if (oldProduct === undefined && newProduct === null) {
            isLoading.value = true;
            showUnavailable.value = false;
            // Timeout untuk initial load juga
            setTimeout(() => {
                if (props.product === null) {
                    isLoading.value = false;
                    showUnavailable.value = true;
                }
            }, 1200);
        }
    });

    // Watch untuk loading state yang di-trigger manual
    watch(() => isLoading.value, (newLoading) => {
        if (newLoading && props.product === null) {
            // Jika loading di-trigger manual dan product null, set timeout
            setTimeout(() => {
                if (props.product === null && isLoading.value) {
                    isLoading.value = false;
                    showUnavailable.value = true;
                }
            }, 1200);
        }
    });

</script>

<template>
    <div v-if="isLoading" class="product-card">
        <!-- Loading State -->
        <div class="product-image">
            <div class="shimmer-box image-shimmer"></div>
        </div>
        <div class="product-info">
            <div class="product-description">
                <div class="shimmer-box title-shimmer"></div>
                <div class="product-details">
                    <div class="shimmer-box category-shimmer"></div>
                    <div class="rating">
                        <div class="shimmer-box rating-shimmer"></div>
                        <div class="rating-circle">
                            <span v-for="star in 5" :key="star" class="circle empty shimmer-circle">●</span>
                        </div>
                    </div>
                </div>
                <div class="description-shimmer">
                    <div class="shimmer-box" style="width: 100%; height: 20px; margin-bottom: 8px;"></div>
                    <div class="shimmer-box" style="width: 90%; height: 20px; margin-bottom: 8px;"></div>
                    <div class="shimmer-box" style="width: 95%; height: 20px; margin-bottom: 8px;"></div>
                    <div class="shimmer-box" style="width: 85%; height: 20px;"></div>
                </div>
            </div>
            <div class="product-actions">
                <div class="shimmer-box price-shimmer"></div>
                <div class="actions">
                    <div class="shimmer-box button-shimmer"></div>
                    <div class="shimmer-box button-shimmer"></div>
                </div>
            </div>
        </div>
    </div>

    <div v-else-if="product" class="product-card">
        <!-- Product Data -->
        <div class="product-image">
            <img :src="product.image" :alt="product.title" />
        </div>
        <div class="product-info">
            <div class="product-description">
                <h1 class="product-title">{{ product.title }}</h1>
                <div class="product-details">
                    <span class="category">{{ product.category }}</span>
                    <div class="rating" :aria-label="`Rating: ${product.rating.rate} out of 5 stars`">
                        <span class="rating-text">{{ product.rating.rate }}/5</span>
                        <div class="rating-circle" role="img" :aria-label="`${product.rating.rate} out of 5 stars`">
                            <span 
                                v-for="star in 5"
                                :key="star"
                                class="circle animated"
                                :class="star <= Math.round(product.rating.rate) ? 'filled' : 'empty'"
                                :style="{ animationDelay: `${(star - 1) * 0.1}s` }"
                                :aria-hidden="true"
                                >
                                ●
                            </span>
                        </div>
                    </div>
                </div>
                <p class="description">{{ product.description }}</p>
            </div>
            <div class="product-actions">
                <div class="price" role="text" :aria-label="`Price: $${product.price}`">
                    ${{ product.price }}
                </div>
                <div class="actions">
                    <button class="buy-now" type="button" :aria-label="`Buy ${product.title} for $${product.price}`">
                        Buy Now
                    </button>
                    <button class="next-product" type="button" @click="$emit('next')" aria-label="View next product">
                        Next Product
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="product-unavailable">
        <img src="../assets/sad-face.png" alt="Sad face" class="sad-face" />
        <h2>This product is unavailable to show</h2>
        <button class="next-product" @click="handleUnavailableNext">Next Product</button>
    </div>
</template>

<style scoped>
.product-card {
    background: white;
    padding: 20px;
    border-radius: var(--card-radius);
    width: 100%;
    max-width: 1200px;
    min-height: 600px;
    max-height: 800px;
    box-shadow: var(--shadow);
    display: flex;
    gap: 20px;
    overflow: hidden;
}

@media (max-width: 768px) {
    .product-card {
        flex-direction: column;
        min-height: auto;
        max-height: none;
        padding: 15px;
        gap: 15px;
    }
    
    .product-image {
        max-height: 300px;
    }
    
    .product-info {
        padding: 10px;
    }
    
    .product-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        margin: 8px 0 6px 0;
        padding-bottom: 6px;
    }
    
    .category {
        font-size: 16px;
    }
    
    .rating-text {
        font-size: 16px;
    }
    
    .description {
        font-size: 16px;
    }
    
    .circle {
        width: 16px;
        height: 16px;
        line-height: 12px;
        font-size: 10px;
    }
    
    .product-actions {
        padding-top: 8px;
    }
    
    .actions {
        flex-direction: column;
        gap: 10px;
    }
    
    .buy-now, .next-product {
        padding: 12px;
        font-size: 16px;
    }
    
    .product-image img {
        max-width: 100%;
        max-height: 100%;
    }
}

.product-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.product-image img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
}

.product-description {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    min-height: 0;
}

.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    overflow: hidden;
}

.product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0 8px 0;
    border-bottom: 1px solid black;
    padding-bottom: 8px;
}

.category {
    font-family: 'inter', sans-serif;
    font-size: 18px;
    color: #3F3F3F;
}

.description {
    font-family: 'inter', sans-serif;
    font-size: 20px;
    color: #1E1E1E;
    margin-top: 0;
    flex: 1;
    overflow-y: auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.product-actions {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0;
    border-top: 1px solid black;
    padding-top: 10px;
}

.rating {
    display: flex;
    align-items: center;
    gap: 6px;
}

.rating-text {
    font-family: 'inter', sans-serif;
    font-size: 18px;
    color: #3F3F3F;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
}

.circle.empty {
    border: 2px solid var(--unavailable-border);
    background: white;
    color: transparent;
}

.actions {
    display: flex;
    gap: 20px;
    width: 100%;
}

.buy-now, .next-product {
    padding: 6px;
    border-radius: var(--btn-radius);
    border: none;
    cursor: pointer;
    font-weight: 600;
    flex: 1;
    transition: all 0.2s ease;
}

.buy-now:focus, .next-product:focus {
    outline: 2px solid var(--men-primary);
    outline-offset: 2px;
}

.next-product {
    border: 3px solid var(--men-primary);
    background: white;
    color: var(--unavailable-text);
}

.next-product:hover {
    background: var(--unavailable-bg);
}

.buy-now {
    background: var(--men-primary);
    color: white;
}

.buy-now:hover {
    background: var(--men-secondary);
}

.price {
    font-family: 'inter', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #1E1E1E;
    margin-bottom: 10px;
}

.product-title {
    font-family: 'inter', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #1E1E1E;
    margin: 0 0 12px 0;
    line-height: 1.2;
}

.circle.filled {
    background: var(--men-primary);
    color: white;
    border: 2px solid var(--men-primary);
}

@keyframes starPop {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.circle.animated {
    animation: starPop 0.6s ease-out;
    animation-fill-mode: both;
}

.circle.filled.animated {
    animation: starPop 0.6s ease-out;
    animation-fill-mode: both;
}

.shimmer-circle {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
    border: none !important;
    color: transparent !important;
}

.next-product:hover {
    background: var(--unavailable-bg);
}

/* Shimmer Animation */
@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
}

.shimmer-box {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.image-shimmer {
    width: 80%;
    height: 80%;
    border-radius: 8px;
}

.title-shimmer {
    width: 70%;
    height: 32px;
    margin-bottom: 12px;
}

.category-shimmer {
    width: 120px;
    height: 18px;
}

.rating-shimmer {
    width: 60px;
    height: 18px;
}

.price-shimmer {
    width: 80px;
    height: 24px;
    margin-bottom: 10px;
}

.button-shimmer {
    width: 100%;
    height: 38px;
    border-radius: var(--btn-radius);
}

.description-shimmer {
    flex: 1;
    padding-top: 8px;
}

.product-unavailable {
    background: white;
    padding: 20px;
    border-radius: var(--card-radius);
    width: 100%;
    max-width: 1200px;
    min-height: 600px;
    max-height: 800px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 20px;
    overflow: hidden;
}

@media (max-width: 768px) {
    .product-unavailable {
        height: auto;
        min-height: 400px;
        padding: 15px;
    }
    
    .product-unavailable h2 {
        font-size: 18px;
        text-align: center;
    }
    
    .product-unavailable .next-product {
        padding: 12px 20px;
        font-size: 16px;
        width: 90%;
        max-width: 280px;
    }
}

.sad-face {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 2;
    z-index: 1;
}

.product-unavailable h2 {
    position: relative;
    z-index: 2;
    margin-bottom: 20px;
}

.product-unavailable .next-product {
    position: relative;
    z-index: 2;
    padding: 10px 250px;
    border-radius: var(--btn-radius);
    border: 3px solid #1E1E1E;
    cursor: pointer;
    font-weight: 600;
    background-color: white;
    font-family: 'inter', sans-serif;
    font-size: 20px;
    color: #3F3F3F;
    transition: background-color 0.3s ease;
    width: auto;
    flex: none;
}

@media (max-width: 768px) {
    .product-unavailable .next-product {
        padding: 12px 20px !important;
        font-size: 16px !important;
        width: 90% !important;
        max-width: 280px !important;
    }
}

.product-unavailable .next-product:hover {
    background-color: #DCDCDC;
}

/* Shimmer Animation */
@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
}

.shimmer-box {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.image-shimmer {
    width: 80%;
    height: 80%;
    border-radius: 8px;
}

.title-shimmer {
    width: 70%;
    height: 32px;
    margin-bottom: 12px;
}

.category-shimmer {
    width: 120px;
    height: 18px;
}

.rating-shimmer {
    width: 60px;
    height: 18px;
}

.price-shimmer {
    width: 80px;
    height: 24px;
    margin-bottom: 10px;
}

.button-shimmer {
    width: 100%;
    height: 38px;
    border-radius: var(--btn-radius);
}

.description-shimmer {
    flex: 1;
    padding-top: 8px;
}

</style>