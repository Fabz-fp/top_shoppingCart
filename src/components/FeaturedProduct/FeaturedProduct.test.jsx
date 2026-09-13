import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import FeaturedProduct from "./FeaturedProduct";

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "A great Product",
  price: 29.99,
  image: "https://example.com/product.jpg",
};

describe("FeaturedProduct", () => {
  test("renders the product image, title and price", () => {
    render(<FeaturedProduct product={mockProduct} />);

    expect(
      screen.getByRole("img", { name: /test product/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /test product/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Price: $29.99")).toBeInTheDocument();
  });
});