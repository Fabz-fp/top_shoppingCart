import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
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
});