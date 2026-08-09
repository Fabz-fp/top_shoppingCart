import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Shop from "./Shop";

describe("Shop", () => {
    test("renders the shop page", () => {
        render(<Shop />);

        expect(
            screen.getByRole("heading", { name: /shop/i }),
        ).toBeInTheDocument();
    });
});