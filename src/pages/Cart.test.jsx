import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Cart from "./Cart";

describe("cart", () => {
    test("renders the cart page", () => {
        render(<Cart />);

        expect(
            screen.getByRole("heading", { name: /shopping cart/i }),
        ).toBeInTheDocument();
    });
});