import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import ProductCard from "./ProductCard";

const product = {
  id: 1,
  title: "Test Product",
  description: "A test product description",
  price: 29.99,
  image: "https://example.com/product.jpg",
};

describe("ProductCard", () => {
  test("renders product information", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("heading", {
        name: /test product/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/a test product description/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText("$29.99"),
    ).toBeInTheDocument();
  });

  test("renders the product image", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("img", {
        name: /test product/i,
      }),
    ).toHaveAttribute("src", product.image);
  });

  test("starts with a quantity of 1", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("spinbutton"),
    ).toHaveValue(1);
  });

  test("increments the quantity", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={product} />);

    const input = screen.getByRole("spinbutton");

    await user.click(
      screen.getByRole("button", {
        name: /increase quantity/i,
      }),
    );

    expect(input).toHaveValue(2);
  });

  test("decrements the quantity", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={product} />);

    const input = screen.getByRole("spinbutton");

    await user.click(
      screen.getByRole("button", {
        name: /increase quantity/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /decrease quantity/i,
      }),
    );

    expect(input).toHaveValue(1);
  });

  test("allows the user to manually change the quantity", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={product} />);

    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "5");

    expect(input).toHaveValue(5);
  });

  test("calls onAddToCart with the product and quantity", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "3");

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );

    expect(onAddToCart).toHaveBeenCalledWith(product, 3);
  });

  test("expands the description when Read More is clicked", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={product} />);

    const description = screen.getByText(
      /a test product description/i,
    );

    expect(description).toHaveClass("description-collapsed");

    await user.click(
      screen.getByRole("button", {
        name: /read more/i,
      }),
    );

    expect(description).toHaveClass("description-expanded");
  });
});