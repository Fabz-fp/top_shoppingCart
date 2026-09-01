import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext", () => {
  test("provides an empty cart initially", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual([]);
  });

  test("adds an item to the cart", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 20.99,
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(product, 2);
    })

    expect(result.current.cart).toEqual([
      {
        ...product,
        quantity: 2,
      },
    ]);
  });
});