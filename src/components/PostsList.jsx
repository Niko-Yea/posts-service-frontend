import { List, Container } from "@mui/material";

export default function PostsList({ children }) {
  return (
    <Container maxWidth="xl">
      <List sx={{ width: "100%" }}>{children}</List>
    </Container>
  );
}
