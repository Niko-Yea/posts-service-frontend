import PostsList from "../components/PostsList";
import PostsItems from "../components/PostsItems";

import { useFetchPostsQuery } from "../redux/posts/postsApi";
import { useEffect } from "react";

export default function HomePageView() {
  const { data: posts, refetch } = useFetchPostsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <PostsList>
      {posts && posts.map((post) => <PostsItems item={post} key={post._id} />)}
    </PostsList>
  );
}
