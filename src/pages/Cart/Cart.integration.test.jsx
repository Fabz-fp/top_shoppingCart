import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import Cart from "./Cart";
import { CartProvider, useCart } from "../../context/CartContext";

function AddProduct() {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem(
          {
            id: 1,
            title: "Test product",
            price: 10,
            image: "https://example.com/product.jpg",
          },
          1,
        )
      }
    >
      Add Product
    </button>
  );
}

test("increases the quantity of a cart item", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <AddProduct />
      <Cart />
    </CartProvider>,
  );

  await user.click(
    screen.getByRole("button", {
      name: /add product/i,
    }),
  );

  expect(
    screen.getByText(/quantity: 1/i),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", {
      name: /increase/i,
    }),
  );

  expect(
    screen.getByText(/quantity: 2/i),
  ).toBeInTheDocument();
});

test("does not decrease a cart item's quantity below 1", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <AddProduct />
      <Cart />
    </CartProvider>,
  );

  await user.click(
    screen.getByRole("button", {
      name: /add product/i,
    }),
  );

  await user.click(
    screen.getByRole("button", {
      name: /decrease/i,
    }),
  );

  expect(
    screen.getByText(/quantity: 1/i),
  ).toBeInTheDocument();
});

test("removes an item from the cart", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <AddProduct />
      <Cart />
    </CartProvider>,
  );

  await user.click(
    screen.getByRole("button", {
      name: /add product/i,
    }),
  );

  expect(
    screen.getByRole("heading", {
      name: /test product/i,
    }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", {
      name: /remove/i,
    }),
  );

  expect(
    screen.queryByRole("heading", {
      name: /test product/i,
    }),
  ).not.toBeInTheDocument();
});