import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import Navbar from "./Navbar";

describe("Navbar", () => {
    test("renders navigation links", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        expect(
            screen.getByRole("link", { name: /home/i }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /shop/i }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /cart/i }),
        ).toBeInTheDocument();
    });

    test("links point to the correct pages", () => {
                render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );
        
        expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
            "href",
            "/",
        );

        expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute(
            "href",
            "/shop",
        );

        expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute(
            "href",
            "/cart",
        );
    });
});