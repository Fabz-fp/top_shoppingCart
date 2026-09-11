import { describe, expect, test } from "vitest";
import { getRandomProducts } from "./getRandomProducts";

const mockProducts = [
  { id: 1, title: "Products One" },
  { id: 2, title: "Products Two" },
  { id: 3, title: "Products Three" },
  { id: 4, title: "Products Four" },
];

describe("getRandomProducts", () => {
  test("returns the requested number of products", () => {
    const result = getRandomProducts(mockProducts, 3);

    expect(result).toHaveLength(3);
  });
});