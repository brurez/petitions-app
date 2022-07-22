import CommentForm from "./CommentForm";
import { CommentInput, useCommentCreateMutation } from "../generated/graphql";
import { Form } from "../lib/Form";
import useMessage from "../hooks/useMessage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CommentList from "./CommentList";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function CommentSection({
  comments,
  petitionId,
  onCommentCreate,
}) {
  const [commentCreate] = useCommentCreateMutation();
  const { showErrorMessage, showSuccessMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commentInput: CommentInput = Form.serialize(event.currentTarget);
    commentInput.petitionId = petitionId;
    setLoading(true);
    try {
      await commentCreate({ variables: { input: { commentInput } } });
      onCommentCreate();
      showSuccessMessage("Comment created successfully");
    } catch (e: any) {
      showErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography mt={2} mb={0} variant={"h6"}>
        Create a new comment
      </Typography>
      {loading ? (
        <Box textAlign={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component={"form"} onSubmit={handleSubmit}>
          <CommentForm />
        </Box>
      )}
      <CommentList mt={2} comments={comments || []} />
    </Box>
  );
}
