<script setup lang="ts">
    interface Product {
        id : number;
        title : string;
        price : number;
        description : string;
        category : string;
        image : string;
        rating : {
            rate : number;
            count : number;
        };
    }

    defineProps<{
        product : Product | null;
    }>();

</script>

<template>
    <div v-if="product" class="product-card">
        <div class="product-image">
            <img :src="product.image" :alt="product.title" />
        </div>
        <div class="product-info">
            <h2 class="product-title">{{ product.title }}</h2>
            <div class="product-details">
                <p class="category"> {{ product.category }}</p>
                <div class="rating">
                    <span class="rating-text"> {{ product.rating.rate }}</span>
                    <div class="rating-circle">
                        <span 
                            v-for="star in 5"
                            :key="star"
                            class="circle"
                            :class=" star <= Math.round(product.rating.rate) ? 'filled' : 'empty' "
                            >
                             ●
                        </span>
                    </div>
                </div>
            </div>
            <p class="description"> {{ product.description}}</p>
            <p class="price"> \${{ product.price }}</p>
            <div class="actions">
                <button class="buy-now"> Buy Now </button>
                <button class="next-product" @click="$emit('next')"> Next Product </button>
            </div>
        </div>
    </div>

    <div v-else class="product-unavailable">
        <h2> This product is unavailable to show </h2>
        <button class="nect-product" @click="$emit('next')"> Next Product </button>
    </div>
</template>

<style scoped>

</style>