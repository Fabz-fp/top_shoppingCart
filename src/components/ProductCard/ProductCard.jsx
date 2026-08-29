function ProductCard({ product }) {
  return (
    <article>
      <img
        src={product.image}
        alt={product.title}
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>${product.price.toFixed(2)}</p>
    </article>
  );
}

export default ProductCard;