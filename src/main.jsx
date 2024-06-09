import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./routes/Layout";
import NotFound from "./routes/NotFound";

import Create from "./components/Create";
import Edit from "./components/Edit";
import ListPostCardInfoSuspenseWrapper from "./components/PostCardInfoSuspenseWrapper.jsx";
import App from "./App.jsx";

import "./index.css";
import PostCardInfoSuspenseWrapper from "./components/PostCardInfoSuspenseWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} path="/" element={<App />} />
          <Route path="/create" element={<Create />} />
          <Route path=":id/edit" element={<Edit />} />
          <Route path=":id" element={<PostCardInfoSuspenseWrapper />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
