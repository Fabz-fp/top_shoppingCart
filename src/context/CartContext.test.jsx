import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext", () => {
  test("provides an empty cart initially", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual([]);
  });
})