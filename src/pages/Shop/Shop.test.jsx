import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Shop from "./Shop";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";

vi.mock("../../hooks/useProducts", () => ({
  useProducts: vi.fn(),
}));

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
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
];

beforeEach(() => {
  useCart.mockReturnValue({
    addItem: vi.fn(),
  });
});

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

  test("adds a product to the cart", async () => {
    const user = userEvent.setup();
    const addItem = vi.fn();

    useProducts.mockReturnValue({
      products: [mockProducts[0]],
      loading: false,
      error: null,
    });

    useCart.mockReturnValue({
      addItem,
    });

    render(<Shop />);

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );
    
    expect(addItem).toHaveBeenCalledWith(
      mockProducts[0],
      1,
    );
  });
});
