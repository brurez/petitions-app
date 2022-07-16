import { useRouter } from "next/router";
import {
  usePetitionQuery,
  usePetitionUpdateMutation,
} from "../../../generated/graphql";
import { CircularProgress } from "@mui/material";
import { PetitionForm } from "../../../components/PetitionForm";
import { Form } from "../../../lib/Form";
import useMessage from "../../../hooks/useMessage";

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
    const petitionInput: any = Form.serialize(event.currentTarget);
    // @ts-ignore
    petitionUpdate({ variables: { input: { id, petitionInput } } })
      .then((response) => {
        // @ts-ignore
        showSuccessMessage("Petition updated successfully");
        router.push("/");
      })
      .catch((err) =>
        showErrorMessage(err.message)
      );
  };

  if (loading) return <CircularProgress />;

  return (
    <PetitionForm
      initialData={data?.petition}
      onSubmit={handleSubmit}
      action="Save"
    />
  );
}
