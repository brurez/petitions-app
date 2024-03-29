import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Head from "next/head";
import { useUserCreateMutation } from "../generated/graphql";
import { Form } from "../lib/Form";
import useMessage from "../hooks/useMessage";
import useCurrentUser from "../hooks/useCurrentUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import { Section } from "../components/Section";

export default function SignUpPage() {
  const [userCreate] = useUserCreateMutation();
  const { showErrorMessage, showSuccessMessage } = useMessage();
  const { setCurrentUser } = useCurrentUser();
  const router = useRouter();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userInput: any = Form.serialize(event.currentTarget);
    // calls the server to create a new user
    userCreate({ variables: { input: { userInput } } })
      .then((response) => {
        // @ts-ignore
        const { token, user } = response.data?.userCreate;
        setCurrentUser(user, token);
        showSuccessMessage("Account created successfully");
        router.push("/");
      })
      .catch((err) =>
        showErrorMessage(err.message)
      );
  };

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Section
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                data-testid="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                data-testid="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                data-testid="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                data-testid="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login">
                <MuiLink href="#" variant="body2">
                  Already have an account? Sign in
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Section>
    </Box>
  );
}
