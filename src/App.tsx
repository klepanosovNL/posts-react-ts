import React from "react";
import { Route, Routes } from "react-router-dom";

import { PostList } from "./features/postList/PostList";
import { CommentList } from "./features/commentList/CommentList";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import { Header } from "./components/header/Header";

import "./App.css";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/comments/:id" element={<CommentList />} />
        <Route
          path="*"
          element={<ErrorPage text="Cannot find this resources" />}
        />
      </Routes>
    </div>
  );
};

export default App;
