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

  function increaseItem(id) {
    dispatch({
      type: "INCREASE_ITEM",
      payload: id,
    });
  }

  function decreaseItem(id) {
    dispatch({
      type: "DECREASE_ITEM",
      payload: id,
    });
  }

  function removeItem(id) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increaseItem,
        decreaseItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}