import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import Navbar from "./Navbar";
import { CartProvider, useCart } from "../../context/CartContext";

function CartTestButton() {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem(
          {
            id: 1,
            title: "Test Product",
            price: 10,
          },
          3,
        )
      }
    >
      Add Product
    </button>
  );
}


test("renders navigation links", () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();

  expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();

  expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
});

test("shows the number of items in the cart", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
        <CartTestButton />
      </CartProvider>
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("link", { name: /cart \(0\)/i }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", { name: /add product/i }),
  );

  expect(
    screen.getByRole("link", { name: /cart \(3\)/i }),
  ).toBeInTheDocument();
});
