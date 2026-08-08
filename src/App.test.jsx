import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {
    test("renders the shopping cart application", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", {
                name: /shopping cart/i,
            }),
        ).toBeInTheDocument();
    });
});