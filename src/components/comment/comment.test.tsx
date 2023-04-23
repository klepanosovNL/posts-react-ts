import React from "react";
import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment";

describe("ErrorPage component", () => {
  const data = {
    text: "some text",
    email: "some@gmail.com",
    name: "Tim",
  };

  it("renders the error text", () => {
    render(<Comment text={data.text} email={data.email} name={data.name} />);

    const text = screen.getByText(data.text);
    const email = screen.getByText(data.email);
    const name = screen.getByText(data.name);

    expect(text).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
});
