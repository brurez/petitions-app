import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { Petition } from "../generated/graphql";
import AppMap from "./AppMap";

export function PetitionForm(props: {
  onSubmit: (event: any) => void;
  action: string;
  initialData?: Petition;
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={props.onSubmit}
      noValidate
      onKeyDown={handleKeyDown}
      sx={{ mt: 1 }}
    >
      <TextField
        defaultValue={props?.initialData?.title}
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
        data-testid="title"
      />
      <TextField
        defaultValue={props?.initialData?.description}
        multiline
        rows={4}
        margin="normal"
        required
        fullWidth
        name="description"
        label="Description"
        type="description"
        id="description"
        autoComplete="description"
        data-testid="description"
      />
      <Box mt={2}>
        <AppMap height={260} />
      </Box>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {props.action}
      </Button>
    </Box>
  );
}
