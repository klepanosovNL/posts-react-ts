import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Post } from "./Post";
import { MemoryRouter } from "react-router-dom";

describe("Post component", () => {
  const data = {
    title: "Test Title",
    description: "Test Description",
    id: 1,
  };

  const commentsCount = {
    1: 3,
    2: 0,
  };

  const mockStore = configureStore([]);

  it("renders post title and description", () => {
    const store = mockStore({
      comments: {
        commentsCount,
      },
    });

    render(
      <Provider store={store}>
        <Post title={data.title} description={data.description} id={data.id} />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const title = screen.getByText(data.title);
    const description = screen.getByText(data.description);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("renders link to comments with comments count when comments count is available", () => {
    const store = mockStore({
      comments: {
        commentsCount,
      },
    });

    render(
      <Provider store={store}>
        <Post title={data.title} description={data.description} id={data.id} />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const link = screen.getByText(`View all ${commentsCount["1"]} comments`);

    expect(link).toBeInTheDocument();
  });

  it("renders 'No comments' when comments count is not available", () => {
    data.id = 3;

    const store = mockStore({
      comments: {
        commentsCount,
      },
    });

    render(
      <Provider store={store}>
        <Post title={data.title} description={data.description} id={data.id} />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const noComments = screen.getByText("No comments");
    expect(noComments).toBeInTheDocument();
  });
});
