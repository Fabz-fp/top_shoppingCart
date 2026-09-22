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

      <p>
        Total items: {cart.reduce((total, item) => total + item.quantity, 0,)}
      </p>

      {cart.map((item) => (
        <article key={item.id} className="cart-item">
          <div className="cart-item-main">
            <img
              src={item.image}
              alt={item.title}
            />

            <div className="cart-item-info">
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Sub Total: ${(item.price * item.quantity).toFixed(2)}</p>

              <div className="cart-actions">
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
              </div>
            </div>
          </div>

          <h2>{item.title}</h2>
        </article>
      ))}

      <div className="total-container">
        <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>

        <button type="button" className="checkout">
          Checkout
        </button>
      </div>
    </main>
  );
}

export default Cart;
