import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Petition, usePetitionCreateMutation } from "../../generated/graphql";
import useCurrentUser from "../../hooks/useCurrentUser";
import useMessage from "../../hooks/useMessage";
import { useRouter } from "next/router";
import { PostAdd } from "@mui/icons-material";
import {
  buildPetitionFormValues,
  PetitionForm,
} from "../../components/PetitionForm";

// page to create a new petition
export default function PetitionCreatePage() {
  const [petitionCreate] = usePetitionCreateMutation();
  const { isLoggedIn } = useCurrentUser();
  const { showErrorMessage, showSuccessMessage } = useMessage();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login");
    }
  });

  // executed when the user clicks the button to create a new petition
  const handleSubmit = (event: any) => {
    const { errorMessage, input } = buildPetitionFormValues(event);
    // shows an error message and stops execution if the form validation fails
    if (errorMessage) {
      showErrorMessage(errorMessage);
      return;
    }
    if(!input) return;

    // calls the server to create the petition
    petitionCreate({ variables: { input: { petitionInput: input } } })
      .then(() => {
        showSuccessMessage("Petition created successfully");
        router.push("/");
      })
      .catch((err) => {
        showErrorMessage(err.message);
      });
  };

  return (
    <Box
      sx={{
        marginTop: 2,
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
      <PetitionForm onSubmit={handleSubmit} action="Publish petition" />
    </Box>
  );
}
