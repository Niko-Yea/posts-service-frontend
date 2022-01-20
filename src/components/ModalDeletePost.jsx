import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

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

export default function BasicModal({ toggleModal, open, onDeleteClick }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              onClick={onDeleteClick}
            >
              DELETE
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
