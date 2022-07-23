import { useRouter } from "next/router";
import {
  Petition,
  usePetitionQuery,
  usePetitionUpdateMutation,
} from "../../../generated/graphql";
import { CircularProgress } from "@mui/material";
import {
  buildPetitionFormValues,
  PetitionForm,
  validatePetitionForm,
} from "../../../components/PetitionForm";
import { Form } from "../../../lib/Form";
import useMessage from "../../../hooks/useMessage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function PetitionEditPage() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data, loading } = usePetitionQuery({
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
      <Typography variant={"h3"} m={2}>
        Edit your Petition
      </Typography>
      <PetitionForm
        initialData={data?.petition}
        onSubmit={handleSubmit}
        action="Save"
      />
    </Box>
  );
}
