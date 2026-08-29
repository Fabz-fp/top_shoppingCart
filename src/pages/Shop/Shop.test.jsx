import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Shop from "./Shop";
import { useProducts } from "../../hooks/useProducts";

vi.mock("../../hooks/useProducts", () => ({
  useProducts: vi.fn(),
}));

const mockProducts = [
  {
    id: 1,
    title: "Test Product One",
    description: "First product",
    price: 10,
    image: "https://example.com/one.jpg",
  },
  {
    id: 2,
    title: "Test Product Two",
    description: "Second product",
    price: 15,
    image: "https://example.com/two.jpg",
  },
]

describe("Shop", () => {
  test("displays a loading message while products are loading", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(<Shop />);

    expect(
      screen.getByText(/loading products/i),
    ).toBeInTheDocument();
  });

  test("displays an error message when products fail to load", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: new Error("Failed to fetch products"),
    });

    render(<Shop />);

    expect(
      screen.getByText(/failed to fetch products/i),
    ).toBeInTheDocument();
  });

  test("renders a ProductCard for each product", () => {
    useProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Shop />);

    expect(
      screen.getByRole("heading", {
        name: /test product one/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /test product two/i,
      }),
    ).toBeInTheDocument();
  });
});
