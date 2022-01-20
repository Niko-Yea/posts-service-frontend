import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

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

export default function BasicModal({ toggleModal, open, post, onEditClick }) {
  const [title, setTitle] = useState(post.title);
  const [lead, setLead] = useState(post.lead);
  const [body, setBody] = useState(post.body);

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

  return (
    <div>
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
              defaultValue={title}
              onChange={handleChange}
            />
            <TextField
              label="Lead"
              variant="filled"
              sx={{ marginTop: "15px" }}
              name="lead"
              vlaue={lead}
              defaultValue={lead}
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
              onClick={() => {
                onEditClick({ title, lead, body });
              }}
            >
              EDIT
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
