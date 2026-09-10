import { Link } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";

function Home() {
  const { products } = useProducts();
  const { addItem } = useCart();

  return (
    <main>
      <h1>Welcome to Our Shop</h1>

      <p>
        Welcome to our online store. Browse our collection and find something
        you love.
      </p>

      <Link to="/shop">Shop Now</Link>

      <div className="home-products">
        {products.slice(0, 3).map((product) => (
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

export default Home;
