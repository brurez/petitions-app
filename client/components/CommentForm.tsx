import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";

export default function CommentForm() {
  return (
    <>
      <TextField
        multiline
        rows={4}
        margin="normal"
        required
        fullWidth
        name="commentText"
        label="Your comment"
        type="commentText"
        id="commentText"
        autoComplete="commentText"
        data-testid="commentText"
      />
      <Button variant={"outlined"} type={"submit"}>
        Submit comment
      </Button>
    </>
  );
}
