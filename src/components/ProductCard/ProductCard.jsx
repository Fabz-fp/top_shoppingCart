import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <article>
      <img
        src={product.image}
        alt={product.title}
      />

      <h2>{product.title}</h2>

      <p className={showDescription ? "description-expanded" : "description-collapsed"}>
        {product.description}
      </p>

      <button
        type="button"
        onClick={() => setShowDescription((current) => !current)}
      >
        {showDescription ? "Read Less" : "Read More"}
      </button>

      <p>${product.price.toFixed(2)}</p>

      <div>
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() =>
            setQuantity((currentQuantity) =>
              Math.max(1, currentQuantity - 1),
            )
          }
        >
          -
        </button>

        <input
          type="number"
          min="1"
          aria-label="Quantity"
          value={quantity}
          onChange={(event) => {
            const value = Number(event.target.value);

            if (event.target.value === "") {
              setQuantity("");
              return;
            }

            setQuantity(Math.max(1, value));
          }}
        />

        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() =>
            setQuantity((currentQuantity) =>
              currentQuantity + 1,
            )
          }
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          if (quantity < 1) {
            setQuantity(1);
            return;
          }

          onAddToCart(product, quantity);
          setQuantity(1);
        }}
      >
        Add To Cart
      </button>
    </article>
  );
}

export default ProductCard;