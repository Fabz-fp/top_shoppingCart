import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Home from "./Home";
import { MemoryRouter } from "react-router";
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
    {
    id: 3,
    title: "Test Product Three",
    description: "Third product",
    price: 20,
    image: "https://example.com/three.jpg",
  },
    {
    id: 4,
    title: "Test Product Four",
    description: "Fourth product",
    price: 25,
    image: "https://example.com/four.jpg",
  },
];

beforeEach(() => {
  useProducts.mockReturnValue({
    products: [],
    loading: false,
    error: null,
  });

  useCart.mockReturnValue({
    addItem: vi.fn(),
  });
});

describe("Home", () => {
  test("renders the home page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /welcome to our shop/i }),
    ).toBeInTheDocument();
  });

  test("renders a link to the shop", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", {
        name: /shop now/i,
      }),
    ).toHaveAttribute("href", "/shop");
  });

  test("displays three products", () => {
    useProducts.mockReturnValue({
      products: [
        mockProducts[0],
        mockProducts[1],
        mockProducts[2],
        mockProducts[3],
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getAllByRole("article"),
    ).toHaveLength(3);
  });
});
