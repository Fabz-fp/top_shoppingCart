import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Home from "./Home";
import { MemoryRouter } from "react-router";

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
});