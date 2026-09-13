import { Link } from "react-router";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import { useProducts } from "../../hooks/useProducts";
import { getRandomProducts } from "../../utils/getRandomProducts";

function Home() {
  const { products } = useProducts();

  return (
    <main>
      <h1>Welcome to Our Shop</h1>

      <p>
        Welcome to our online store. Browse our collection and find something
        you love.
      </p>

      <Link to="/shop">Shop Now</Link>

      <h2>Featured Products</h2>
      
      <div className="home-products">
        {getRandomProducts(products, 3).map((product) => (
          <FeaturedProduct
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}

export default Home;
