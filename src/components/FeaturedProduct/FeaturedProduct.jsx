function FeaturedProduct({ product }) {
  return (
    <article className="featured-product">
      <img
        src={product.image}
        alt={product.title}
      />

      <h2>{product.title}</h2>

      <p>Price: ${product.price.toFixed(2)}</p>
    </article>
  );
}

export default FeaturedProduct;