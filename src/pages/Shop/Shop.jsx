import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";

function Shop() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <main>
        <h1>Shop</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return(
      <main>
        <h1>Shop</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Shop</h1>

      <div>
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}

export default Shop;
