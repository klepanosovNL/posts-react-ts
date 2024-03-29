import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getAllPosts } from "./postSlice";
import { selectPosts } from "./postSelectors";
import { getCommentsCount } from "../commentList/commentSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("postSlice", () => {
  it("should fetch posts successfully", async () => {
    const store = mockStore({});
    await store.dispatch(getAllPosts());

    const actions = store.getActions();

    await Promise.all([
      store.dispatch(getAllPosts.pending),
      store.dispatch(getCommentsCount.pending),
    ]);

    expect(actions[0].meta.requestStatus).toEqual("pending");
    expect(actions[1].meta.requestStatus).toEqual("pending");
    expect(actions[2].type).toEqual(getAllPosts.fulfilled.type);
    expect(actions[2].payload).toHaveLength(100);
  });

  it("should fetch posts failure", async () => {
    const store = mockStore({});

    await store.dispatch(getAllPosts());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getAllPosts.pending.type);
    expect(actions[2].type).toEqual(getAllPosts.fulfilled.type);
  });

  it("should select posts from the store", () => {
    const posts = [
      { id: 1, userId: 1, title: "olf", body: "Comment 1" },
      { id: 2, userId: 2, title: "olf", body: "Comment 1" },
    ];

    const store = { posts: { list: posts } };
    const selectedComments = selectPosts(store);

    expect(selectedComments).toEqual(posts);
  });
});
