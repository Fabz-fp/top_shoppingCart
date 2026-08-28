import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getProducts } from "../services/productApi";
import { useProducts } from "./useProducts";

vi.mock("../services/productApi", () => ({
  getProducts: vi.fn(),
}));

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("fetches and returns products", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Test Product",
        price: 29.99,
      },
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();

    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  test("returns an error when fetching products fails", async () => {
    const mockError = new Error("Failed to fetch products");

    getProducts.mockRejectedValue(mockError);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(mockError);

    expect(getProducts).toHaveBeenCalledTimes(1);
  });
});