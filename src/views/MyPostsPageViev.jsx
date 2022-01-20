import { useFetchPostsByUserQuery } from "../redux/posts/postsApi";
import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/authSelectors";

import PostsList from "../components/PostsList";
import PostsItems from "../components/PostsItems";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { useEffect } from "react";

import Modal from "../components/Modal";

export default function MyPostPageView() {
  const userId = useSelector(authSelectors.getUserId);

  const { data: posts, refetch } = useFetchPostsByUserQuery(
    userId ?? skipToken
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <PostsList>
        {posts &&
          posts.map((post) => <PostsItems item={post} key={post._id} />)}
      </PostsList>
      <Modal refetchUserPosts={refetch} />
    </>
  );
}
