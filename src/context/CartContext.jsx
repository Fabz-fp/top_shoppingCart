/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  function addItem(product, quantity) {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        quantity,
      },
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}