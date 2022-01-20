import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";

export default function PostsList({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${item._id}`);
  };
  return (
    <>
      <ListItem button alignItems="flex-start" onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            alt={item.owner.name}
            src={"http://localhost:2531" + item.owner.avatarURL}
          />
        </ListItemAvatar>
        <ListItemText
          primary={item.title}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Author: {item.owner.name}
              </Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.lead}
              </Typography>
            </Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
