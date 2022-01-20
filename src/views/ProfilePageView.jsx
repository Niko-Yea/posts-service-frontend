import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/authSelectors";
import {
  useUploadPhotoMutation,
  useDeletePhotoMutation,
} from "../redux/photos/photosApi";

import { Box, Avatar, Button, Input } from "@mui/material";

export default function ProfilePageView({ refetch }) {
  const userAvatar = useSelector(authSelectors.getUserAvatar);
  const userName = useSelector(authSelectors.getUserName);
  const [uploadPhoto] = useUploadPhotoMutation();
  const [deletePhoto] = useDeletePhotoMutation();

  const changeAndSubmit = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("data", file);
    await uploadPhoto(formData);
    refetch();
  };

  const onDeleteClick = async (e) => {
    e.preventDefault();
    await deletePhoto(userAvatar);
    refetch();
  };

  return (
    <Box sx={{ margin: "50px" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar
          alt={userName}
          src={"http://localhost:2531" + userAvatar}
          sx={{ width: 100, height: 100 }}
        />
        <label htmlFor="contained-button-file">
          <Input
            name="data"
            accept="image/*"
            id="contained-button-file"
            type="file"
            sx={{ display: "none" }}
            onChange={changeAndSubmit}
          />
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            component="span"
          >
            CHANGE PHOTO
          </Button>
        </label>
        <Button
          onClick={onDeleteClick}
          sx={{ marginTop: "15px" }}
          variant="outlined"
          component="span"
        >
          DELETE PHOTO
        </Button>
      </Box>
    </Box>
  );
}
