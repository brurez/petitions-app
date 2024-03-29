import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useUserLoginMutation } from "../generated/graphql";
import useCurrentUser from "../hooks/useCurrentUser";
import { Form } from "../lib/Form";
import Link from "next/link";
import useMessage from "../hooks/useMessage";
import { useRouter } from "next/router";
import {Section} from "../components/Section";

export default function LogInPage() {
  const [userLogin] = useUserLoginMutation();
  const { setCurrentUser } = useCurrentUser();
  const { showErrorMessage, showSuccessMessage } = useMessage();
  const router = useRouter();

  // executed when the button is clicked
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userLoginInput: any = Form.serialize(event.currentTarget);
    // calls the server to check if the user credentials are correct
    userLogin({ variables: { input: { userLoginInput } } })
      .then((response) => {
        // @ts-ignore
        const { token, user } = response.data?.userLogin;
        setCurrentUser(user, token);
        showSuccessMessage("You are now logged in");
        router.push("/");
      })
      .catch((err) => {
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
      <Section sx={{ p: 4, mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", textAlign: "center" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            data-testid="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            data-testid="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid>
              <Link href="/signup">
                <MuiLink href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Section>
    </Box>
  );
}
