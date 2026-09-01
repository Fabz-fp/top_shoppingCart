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
    });

    expect(result.current.cart).toEqual([
      {
        ...product,
        quantity: 2,
      },
    ]);
  });

  test("increases an item's quantity", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 19.99,
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(product, 2);
      result.current.increaseItem(1);
    });

    expect(result.current.cart[0].quantity).toBe(3);
  });

  test("decreases an item's quantity", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 19.99,
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(product, 2);
      result.current.decreaseItem(1);
    });

    expect(result.current.cart[0].quantity).toBe(1);
  });

  test("removes an item", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 19.99,
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(product, 2)
      result.current.removeItem(1);
    });

    expect(result.current.cart).toEqual([]);
  });
});