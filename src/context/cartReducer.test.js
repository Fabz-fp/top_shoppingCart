import { describe, expect, test } from "vitest";
import { cartReducer } from "./cartReducer";

describe("cartReducer", () => {
  test("returns the current state for an unknown action", () => {
    const state = [];

    expect(
      cartReducer(state, { type: "UNKNOWN" }),
    ).toEqual([]);
  });

  test("adds an item to the cart", () => {
    const product = {
      id: 1,
      title: "Test product",
      price: 19.99,
    };

    const state = cartReducer([], {
      type: "ADD_ITEM",
      payload: {
        product,
        quantity: 2,
      },
    });

    expect(state).toEqual([
      {
        ...product,
        quantity: 2,
      },
    ]);
  });
});