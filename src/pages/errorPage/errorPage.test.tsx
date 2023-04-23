import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";
import { MemoryRouter } from "react-router-dom";

describe("ErrorPage component", () => {
  const text: string = "Page not found";

  it("renders the error text", () => {
    render(
      <MemoryRouter>
        <ErrorPage text={text} />
      </MemoryRouter>
    );

    const errorText = screen.getByText(text);

    expect(errorText).toBeInTheDocument();
  });
});
