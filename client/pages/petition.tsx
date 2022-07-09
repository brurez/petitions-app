import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {
  usePetitionCreateMutation,
  useUserLoginMutation,
} from "../generated/graphql";
import useCurrentUser from "../hooks/useCurrentUser";
import { Form } from "../lib/Form";
import Link from "next/link";
import useMessage from "../hooks/useMessage";
import { useRouter } from "next/router";
import { PostAdd } from "@mui/icons-material";
import {useEffect} from "react";

export default function PetitionCreatePage() {
  const [petitionCreate] = usePetitionCreateMutation();
  const { currentUser, isLoggedIn } = useCurrentUser();
  const { showErrorMessage, showSuccessMessage } = useMessage();
  const router = useRouter();

  useEffect(() => {
    if(!isLoggedIn) {
      router.push("/login")
    }
  })
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const petitionInput: any = Form.serialize(event.currentTarget);
    petitionCreate({ variables: { input: { petitionInput } } })
      .then((response) => {
        // @ts-ignore
        const { petition } = response.data?.petitionCreate;
        console.log(petition);
        showSuccessMessage("Petition created successfully");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage(err.message);
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PostAdd />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Petition
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          data-testid="title"
        />
        <TextField
          multiline
          rows={4}
          margin="normal"
          required
          fullWidth
          name="description"
          label="Description"
          type="description"
          id="description"
          autoComplete="description"
          data-testid="description"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Publish petition
        </Button>
      </Box>
    </Box>
  );
}
