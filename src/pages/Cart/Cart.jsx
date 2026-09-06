import { useCart } from "../../context/CartContext";

function Cart() {
  const { cart, removeItem, increaseItem, decreaseItem } = useCart();

  if (cart.length === 0) {
    return (
      <main>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
      </main>
    );
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main>
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <article key={item.id}>
          <img
            src={item.image}
            alt={item.title}
          />
          
          <h2>{item.title}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>${item.price.toFixed(2)}</p>
          <p>${((item.price * item.quantity).toFixed(2))}</p>

          <button
            type="button"
            onClick={() => increaseItem(item.id)}
          >
            Increase
          </button>

          <button
            type="button"
            onClick={() => decreaseItem(item.id)}
          >
            Decrease
          </button>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </article>
      ))}

      <p>Total: ${cartTotal.toFixed(2)}</p>
    </main>
  );
}

export default Cart;
