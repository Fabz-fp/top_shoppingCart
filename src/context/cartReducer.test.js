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

  test("increases quantity when adding an existing item", () => {
    const product = {
      id: 1,
      title: "Test product",
      price: 19.99,
    };

    const state = [
      {
        ...product,
        quantity: 2,
      },
    ];

    const newState = cartReducer(state, {
      type: "ADD_ITEM",
      payload: {
        product,
        quantity: 3,
      },
    });

    expect(newState).toEqual([
      {
        ...product,
        quantity: 5,
      },
    ]);
  });

  test("increases an item's quantity", () => {
    const state = [
      {
        id: 1,
        title: "Test product",
        price: 19.99,
        quantity: 2,
      },
    ];

    const newState = cartReducer(state, {
      type: "INCREASE_ITEM",
      payload: 1,
    });

    expect(newState[0].quantity).toBe(3);
  });
});