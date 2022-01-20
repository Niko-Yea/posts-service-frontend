import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "./redux/auth/authApi";
import authSelectors from "./redux/auth/authSelectors";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { refresh } from "./redux/auth/authSlice";

import "normalize.css";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import HomePageView from "./views/HomePageView";
import SignupView from "./views/SignupView";
import SigninView from "./views/SigninView";
import TopBar from "./components/TopBar";
import MyPostPageView from "./views/MyPostsPageViev";
import PostPageView from "./views/PostPageView";
import ProfilePageView from "./views/ProfilePageView";
import NotFoundPageView from "./views/NotFoundPageView";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.getToken);
  const { data, refetch, isFetching } = useGetCurrentUserQuery(
    token ?? skipToken
  );

  useEffect(() => {
    if (token === null) {
      return;
    }
    dispatch(refresh(data));
  }, [token, dispatch, data]);

  return (
    !isFetching && (
      <>
        <TopBar />
        <Suspense fallback={<p>LOADING...</p>}>
          <Routes>
            <Route path="/" element={<HomePageView />} />
            <Route
              path="/signin"
              element={
                <PublicRoute restricted>
                  <SigninView />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute restricted>
                  <SignupView />
                </PublicRoute>
              }
            />
            <Route
              path="/myPosts"
              element={
                <PrivateRoute>
                  <MyPostPageView />
                </PrivateRoute>
              }
            />
            <Route
              path="/post/:postId"
              element={
                <PublicRoute>
                  <PostPageView />
                </PublicRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePageView refetch={refetch} />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPageView />} />
          </Routes>
        </Suspense>
      </>
    )
  );
}

export default App;
