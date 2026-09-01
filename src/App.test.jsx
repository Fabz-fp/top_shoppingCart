import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";
import { expect, test } from "vitest";

test("renders the navbar and the current page", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("navigation"),
  ).toBeInTheDocument();
});