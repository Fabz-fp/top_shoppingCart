import { useCart } from "../../context/CartContext";

function Cart() {
  const { cart } = useCart();

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
          <h2>{item.title}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>${item.price.toFixed(2)}</p>
          <p>${((item.price * item.quantity).toFixed(2))}</p>
        </article>
      ))}

      <p>Total: ${cartTotal.toFixed(2)}</p>
    </main>
  );
}

export default Cart;
