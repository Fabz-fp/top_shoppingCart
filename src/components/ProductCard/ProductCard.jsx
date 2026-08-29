import { useState } from "react";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <article>
      <img
        src={product.image}
        alt={product.title}
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

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
          value={quantity}
          onChange={(event) =>
            setQuantity(Number(event.target.value))
          }
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
    </article>
  );
}

export default ProductCard;