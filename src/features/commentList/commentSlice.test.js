import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  getCommentById,
  getCommentsCount,
  selectComments,
  selectCommentsCount,
  selectCommentsStatus,
} from "./commentSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("commentSlice", () => {
  it("should fetch comments by ID successfully", async () => {
    const store = mockStore({});
    await store.dispatch(getCommentById("1"));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getCommentById.pending.type);
    expect(actions[1].type).toEqual(getCommentById.fulfilled.type);
    expect(actions[1].payload).toHaveLength(5);
  });

  it("should handle failure when fetching comments by ID", async () => {
    const store = mockStore({});

    await store.dispatch(getCommentById("invalid-id"));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getCommentById.pending.type);
    expect(actions[1].type).toEqual(getCommentById.fulfilled.type);
  });

  it("should fetch comments count successfully", async () => {
    const store = mockStore({});
    await store.dispatch(getCommentsCount());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getCommentsCount.pending.type);
    expect(actions[1].type).toEqual(getCommentsCount.fulfilled.type);
    expect(actions[1].payload).toMatchObject({});
  });

  it("should handle failure when fetching comments count", async () => {
    const store = mockStore({});
    await store.dispatch(getCommentsCount());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getCommentsCount.pending.type);
    expect(actions[1].type).toEqual(getCommentsCount.fulfilled.type);
  });

  it("should select comments from the store", () => {
    const comments = [
      { id: 1, body: "Comment 1" },
      { id: 2, body: "Comment 2" },
    ];
    const store = { comments: { list: comments } };
    const selectedComments = selectComments(store);

    expect(selectedComments).toEqual(comments);
  });

  it("should select comments status from the store", () => {
    const status = "loading";
    const store = { comments: { status } };
    const selectedStatus = selectCommentsStatus(store);

    expect(selectedStatus).toEqual(status);
  });

  it("should select comments count from the store", () => {
    const commentsCount = { 1: 5, 2: 3 };
    const store = { comments: { commentsCount } };
    const selectedCommentsCount = selectCommentsCount(store);

    expect(selectedCommentsCount).toEqual(commentsCount);
  });
});
