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
    <div 
        v-if="product" 
        class="product-card"
        >
        <div class="product-image">
            <img :src="product.image" :alt="product.title" />
        </div>
        <div class="product-info">
            <div class="product-description">
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
            </div>
            <div class="product-actions">
                <p class="price"> ${{ product.price }}</p>
                <div class="actions">
                    <button class="buy-now"> Buy Now </button>
                    <button class="next-product" @click="$emit('next')"> Next Product </button>
            </div>
            </div>
        </div>
    </div>

    <div v-else class="product-unavailable">
        <img src="../assets/sad-face.png" alt="Sad face" class="sad-face" />
        <h2> This product is unavailable to show </h2>
        <button class="next-product" @click="$emit('next')"> Next Product </button>
    </div>
</template>

<style scoped>
.product-card {
    background: white;
    padding: 20px;
    border-radius: var(--card-radius);
    width: 1200px;
    height: 600px;
    box-shadow: var(--shadow);
    display: flex;
    gap: 20px;
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

.product-title {
    font-family: 'inter', sans-serif;
    font-size: 28px;
    margin-bottom: 12px;
    color: var(--men-primary);
}

.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
}

.product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
}


.product-actions {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0;
}

.price {
    font-weight: bold;
    margin: 12px 0;
    font-family: 'inter', sans-serif;
    font-size: 28px;
    color: var(--men-primary);
}

.rating {
    display: flex;
    align-items: center;
    gap: 6px;
}

.actions {
    display: flex;
    gap: 20px;
    width: 100%;
}

.buy-now, .next-product {
    padding: 12px;
    border-radius: var(--btn-radius);
    border: none;
    cursor: pointer;
    font-weight: 600;
    flex: 1;
}

.next-product {
    border: 3px solid #002772;
    background: white;
    color: #374151;
}

.next-product:hover {
    background: #DCDCDC;
}

.product-unavailable {
    background: white;
    padding: 20px;
    border-radius: var(--card-radius);
    width: 1200px;
    height: 600px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
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
    padding: 16px 250px;
    border-radius: var(--btn-radius);
    border: 3px solid #1E1E1E;
    cursor: pointer;
    font-weight: 600;
    background-color: white;
    color: #3F3F3F;
    transition: background-color 0.3s ease;
    width: auto;
    flex: none;
}

.product-unavailable .next-product:hover {
    background-color: #DCDCDC;
}

</style>