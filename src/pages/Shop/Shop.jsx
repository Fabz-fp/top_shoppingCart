import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";

function Shop() {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();

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

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={addItem}
          />
        ))}
      </div>
    </main>
  );
}

export default Shop;
