const PRODUCTS_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const response = await fetch(PRODUCTS_URL);

  return response.json();
}
