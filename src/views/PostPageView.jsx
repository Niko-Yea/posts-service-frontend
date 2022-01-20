import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useFetchPostByIdQuery,
  useDeletePostMutation,
  useEditPostMutation,
} from "../redux/posts/postsApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/authSelectors";

import ModalDeletePost from "../components/ModalDeletePost";
import ModalEditPost from "../components/ModalEditPost";

import { Box, Avatar, Typography, Button } from "@mui/material";

import { useSnackbar } from "notistack";

export default function PostPageView() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();
  const { data: post, isError } = useFetchPostByIdQuery(postId);

  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [openEditDialog, setEditDialog] = useState(false);

  const userId = useSelector(authSelectors.getUserId);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError, navigate]);

  const toggleDeleteModal = () => {
    setDeleteDialog((prev) => !prev);
  };

  const toggleEditModal = () => {
    setEditDialog((prev) => !prev);
  };

  const onDeleteClick = async () => {
    navigate("/myPosts");
    await deletePost(postId);
    enqueueSnackbar("Post was deleted", {
      variant: "success",
    });
  };

  const onEditClick = async (editedPost) => {
    editPost({ postId, editedPost });
    toggleEditModal();
  };

  return post ? (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {userId === post.owner._id && (
          <Box sx={{ marginTop: "10px", marginLeft: "auto" }}>
            <Button variant="contained" onClick={toggleEditModal}>
              Edit post
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: "10px", marginRight: "25px" }}
              onClick={toggleDeleteModal}
            >
              Delete post
            </Button>
            <ModalDeletePost
              toggleModal={toggleDeleteModal}
              open={openDeleteDialog}
              onDeleteClick={onDeleteClick}
            />
            <ModalEditPost
              toggleModal={toggleEditModal}
              post={post}
              onEditClick={onEditClick}
              open={openEditDialog}
            />
          </Box>
        )}
        <Box sx={{ margin: "50px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={post.owner.name}
              src={"http://localhost:2531" + post.owner.avatarURL}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h4">{post.owner.name}</Typography>
          </Box>
          <Box>
            <Typography variant="h3" align="center">
              {post.title}
            </Typography>
            <Typography variant="1" component="div">
              {post.body.split("\n").map((i, key) => {
                return (
                  <Typography key={key} paragraph variant="body1">
                    {i}
                  </Typography>
                );
              })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    <p>Loading...</p>
  );
}
