export function getRandomProducts(products, count) {
  return [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}