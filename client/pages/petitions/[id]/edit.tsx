import { useRouter } from "next/router";
import {
  usePetitionDetailsQuery,
  usePetitionUpdateMutation,
} from "../../../generated/graphql";
import { CircularProgress } from "@mui/material";
import {
  buildPetitionFormValues,
  PetitionForm,
} from "../../../components/PetitionForm";
import useMessage from "../../../hooks/useMessage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// page to edit a petition
export default function PetitionEditPage() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data, loading } = usePetitionDetailsQuery({
    variables: { id },
  });
  const { showErrorMessage, showSuccessMessage } = useMessage();

  const [petitionUpdate] = usePetitionUpdateMutation();

  const handleSubmit = (event: any) => {
    const { errorMessage, input } = buildPetitionFormValues(event);
    if (errorMessage) {
      showErrorMessage(errorMessage);
      return;
    }
    if (!input) return;

    petitionUpdate({
      variables: { input: { id: String(id), petitionInput: input } },
    })
      .then(() => {
        showSuccessMessage("Petition updated successfully");
        router.push("/");
      })
      .catch((err) => {
        showErrorMessage(err.message);
      });
  };

  if (loading)
    return (
      <Box textAlign={"center"} mt={4}>
        <CircularProgress />{" "}
      </Box>
    );

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box m={2}>
        <Typography variant={"h4"} component={"h2"}>
          Edit your Petition
        </Typography>
      </Box>
      <PetitionForm
        initialData={data?.petition}
        onSubmit={handleSubmit}
        action="Save"
      />
    </Box>
  );
}
