import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Cart from "./Cart";
import { useCart } from "../../context/CartContext";
import userEvent from "@testing-library/user-event";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("cart", () => {
  test("displays an empty cart message when the cart is empty", () => {
    useCart.mockReturnValue({
      cart: [],
    });

    render(<Cart />);

    expect(
      screen.getByText(/your cart is empty/i),
    ).toBeInTheDocument();
  });

  test("displays items in the cart", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
      ],
    });

    render(<Cart />);

    expect(
      screen.getByRole("heading", {
        name: /test product/i,
      }),
    ).toBeInTheDocument();
  });

  test("displays the quantity of each cart item", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          title: "Another product",
          price: 20,
          quantity: 3,
        },
      ],
    });

    render(<Cart />);

    expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
  });

  test("displays the price of each cart item", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
      ],
    });

    render(<Cart />);

    expect(screen.getByText("Price: $10.00")).toBeInTheDocument();
  });

  test("displays the subtotal for each cart item", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
      ],
    });

    render(<Cart />);

    expect(screen.getByText("Sub Total: $20.00")).toBeInTheDocument();
  });

  test("displays the total for multiple cart items", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product one",
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          title: "Test product two",
          price: 15,
          quantity: 3,
        },
      ],
    });

    render(<Cart />);

    expect(screen.getByText("Total: $65.00")).toBeInTheDocument();
  });

  test("removes an item from the cart", async () => {
    const user = userEvent.setup();
    const removeItem = vi.fn();

    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
      ],
      removeItem,
    });

    render(<Cart />);

    await user.click(
      screen.getByRole("button", {
        name: /remove/i,
      }),
    );

    expect(removeItem).toHaveBeenCalledWith(1);
  });

  test("increases the quantity of a cart item", async () => {
    const user = userEvent.setup();
    const increaseItem = vi.fn();

    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
      ],
      increaseItem,
    });

    render(<Cart />);

    await user.click(
      screen.getByRole("button", {
        name: /increase/i,
      }),
    );

    expect(increaseItem).toHaveBeenCalledWith(1);
  });

  test("decreases the quantity of a cart item", async () => {
    const user = userEvent.setup();
    const decreaseItem = vi.fn();

    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
      ],
      decreaseItem,
    });

    render(<Cart />);

    await user.click(
      screen.getByRole("button", {
        name: /decrease/i,
      }),
    );

    expect(decreaseItem).toHaveBeenCalledWith(1);
  });

  test("displays the image of each cart item", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
          image: "https://example.com/product.jpg",
        },
      ],
    });

    render(<Cart />);

    expect(
      screen.getByRole("img", {
        name: /test product/i,
      }),
    ).toHaveAttribute(
      "src",
      "https://example.com/product.jpg",
    );
  });

  test("displays the cart item count", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Product one",
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          title: "Product two",
          price: 15,
          quantity: 3,
        },
      ],
    });

    render(<Cart />);

    expect(
      screen.getByText("Total items: 5"),
    ).toBeInTheDocument();
  });

  test("displays a checkout button", () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: "Test product",
          price: 10,
          quantity: 2,
        },
      ],
    });

    render(<Cart />);

    expect(
      screen.getByRole("button", { name: /checkout/i }),
    ).toBeInTheDocument();
  });
});
