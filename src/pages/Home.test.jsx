import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Home from "./Home";

describe("Home", () => {
    test("renders the home page", () => {
        render(<Home />);

        expect(
            screen.getByRole("heading", { name: /welcome to our shop/i }),
        ).toBeInTheDocument();
    });
});