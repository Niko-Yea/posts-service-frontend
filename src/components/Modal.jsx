import { useState } from "react";
import { Box, Button, Modal, TextField, FormControl } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useCreatePostMutation } from "../redux/posts/postsApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ refetchUserPosts }) {
  const [createPost] = useCreatePostMutation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [lead, setLead] = useState("");
  const [body, setBody] = useState("");

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        break;

      case "lead":
        setLead(value);
        break;

      case "body":
        setBody(value);
        break;

      default:
        break;
    }
  };

  const resetState = () => {
    setTitle("");
    setLead("");
    setBody("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title, lead, body });
    toggleModal();
    resetState();
    refetchUserPosts();
  };

  return (
    <div>
      <Button
        sx={{ position: "fixed", right: 15, bottom: 25 }}
        variant="contained"
        endIcon={<AddIcon />}
        onClick={toggleModal}
      >
        Add post
      </Button>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <TextField
              label="Title"
              variant="filled"
              name="title"
              vlaue={title}
              onChange={handleChange}
            />
            <TextField
              label="Lead"
              variant="filled"
              sx={{ marginTop: "15px" }}
              name="lead"
              vlaue={lead}
              onChange={handleChange}
            />
            <TextField
              label="Article"
              multiline
              rows={6}
              variant="filled"
              sx={{ marginTop: "15px" }}
              name="body"
              value={body}
              onChange={handleChange}
            />
          </FormControl>
          <Box
            sx={{
              display: "block",
              marginTop: "15px",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              type="submit"
              onClick={handleSubmit}
            >
              ADD
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "100%", marginTop: "10px" }}
              onClick={toggleModal}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
