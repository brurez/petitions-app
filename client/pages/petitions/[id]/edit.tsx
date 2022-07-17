import { useRouter } from "next/router";
import {
  Petition,
  usePetitionQuery,
  usePetitionUpdateMutation,
} from "../../../generated/graphql";
import { CircularProgress } from "@mui/material";
import { PetitionForm } from "../../../components/PetitionForm";
import { Form } from "../../../lib/Form";
import useMessage from "../../../hooks/useMessage";
import Box from "@mui/material/Box";

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
    const petitionInput: Petition = Form.serialize(event.currentTarget);
    petitionInput.postalCode = Number(petitionInput.postalCode);
    petitionInput.latitude = Number(petitionInput.latitude);
    petitionInput.longitude = Number(petitionInput.longitude);
    petitionUpdate({ variables: { input: { id: String(id), petitionInput } } })
      .then(() => {
        showSuccessMessage("Petition updated successfully");
        router.push("/");
      })
      .catch((err) => showErrorMessage(err.message));
  };

  if (loading) return <CircularProgress />;

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PetitionForm
        initialData={data?.petition}
        onSubmit={handleSubmit}
        action="Save"
      />
    </Box>
  );
}
