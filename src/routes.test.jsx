import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";

describe("Application routes", () => {
  function renderWithRouter(initialPath) {
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  }

  test("renders Home at /", () => {
    renderWithRouter("/");

    expect(
      screen.getByRole("heading", {
        name: /welcome to our shop/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders Shop at /shop", () => {
    renderWithRouter("/shop");

    expect(
      screen.getByRole("heading", {
        name: /^shop$/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders Cart at /cart", () => {
    renderWithRouter("/cart");

    expect(
      screen.getByRole("heading", {
        name: /shopping cart/i,
      }),
    ).toBeInTheDocument();
  });

  test("user can navigate between pages", async () => {
    const user = userEvent.setup();

    renderWithRouter("/");

    expect(
      screen.getByRole("heading", {
        name: /welcome to our shop/i,
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("link", {
        name: /^shop$/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /^shop$/i,
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("link", {
        name: /^cart$/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /shopping cart/i,
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("link", {
        name: /^home$/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /welcome to our shop/i,
      }),
    ).toBeInTheDocument();
  });
});
