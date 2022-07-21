import { useRouter } from "next/router";
import {
  Petition,
  usePetitionQuery,
  usePetitionUpdateMutation,
} from "../../../generated/graphql";
import { CircularProgress } from "@mui/material";
import {
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
    event.preventDefault();
    const { mediaFile, mediaFileIds, ...fields } = Form.serialize(
      event.currentTarget
    );
    const petitionInput: Petition = fields;
    petitionInput.latitude = Number(petitionInput.latitude);
    petitionInput.longitude = Number(petitionInput.longitude);
    // @ts-ignore
    petitionInput.mediaFileIds = mediaFileIds
        .split(",")
        .map((id) => Number(id));

    const errorMessage = validatePetitionForm(petitionInput);
    if (errorMessage) {
      showErrorMessage(errorMessage);
      return;
    }

    petitionUpdate({ variables: { input: { id: String(id), petitionInput } } })
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
