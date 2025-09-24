export interface Product {
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

const BASE_URL = "https://fakestoreapi.com/products";

function isValidProduct(data: unknown): data is Product {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    
    const obj = data as Record<string, unknown>;
    const rating = obj.rating as Record<string, unknown>;
    
    return (
        typeof obj.id === 'number' &&
        typeof obj.title === 'string' &&
        typeof obj.price === 'number' &&
        typeof obj.description === 'string' &&
        typeof obj.category === 'string' &&
        typeof obj.image === 'string' &&
        typeof obj.rating === 'object' &&
        obj.rating !== null &&
        typeof rating.rate === 'number' &&
        typeof rating.count === 'number'
    );
}

export async function fetchProductsById(id: number): Promise<Product> {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching product with ID ${id}: ${response.statusText}`);
        }
        const data = await response.json();
        
        if (!isValidProduct(data)) {
            throw new Error(`Invalid product data received for ID ${id}`);
        }
        
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to fetch product ${id}: ${errorMessage}`);
    }
}