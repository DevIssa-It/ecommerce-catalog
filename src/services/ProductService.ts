const BASE_URL = "https://fakestoreapi.com/products";

export async function fetchProudctsById (id: number) {
    try {
        const response = await fetch (`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error (`Error fetching product with ID ${id}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error: ", error);
        throw error;
    }
}