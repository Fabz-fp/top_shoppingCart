import { describe, expect, test, vi } from "vitest";
import { getProducts } from "./productApi";

describe("productApi", () => {
  test("fetches products from FakeStore API", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Test Product",
        price: 29.99,
      },
    ];

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      }),
    );

    const products = await getProducts();

    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");

    expect(products).toEqual(mockProducts);
  });

  test("throws an error when the API request fails", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    );

    await expect(getProducts()).rejects.toThrow(
      "Failed to fetch products",
    );
  });
});
