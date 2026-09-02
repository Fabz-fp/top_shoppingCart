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

  return (
    <main>
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>${item.price.toFixed(2)}</p>
        </article>
      ))}
    </main>
  );
}

export default Cart;
