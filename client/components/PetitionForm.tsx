import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { Petition } from "../generated/graphql";
import AppMap, { Position } from "./AppMap";
import ReadOnlyField from "./ReadOnlyField";
import { useEffect, useState } from "react";

export function PetitionForm(props: {
  onSubmit: (event: any) => void;
  action: string;
  initialData?: Petition;
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const [position, setPosition] = useState<any>(null);

  const handleMapChange = (position) => {
    setPosition(position);
  };

  useEffect(() => {
    setPosition({
      address: props.initialData?.address,
      city: props.initialData?.city,
      state: props.initialData?.state,
      country: props.initialData?.country,
      postalCode: props.initialData?.postalCode,
    });
  }, [props.initialData]);

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
        <AppMap
          petition={{ ...props?.initialData, ...position }}
          height={260}
          onChange={handleMapChange}
        />
      </Box>
      <ReadOnlyField value={position?.address} name="address" />
      <ReadOnlyField value={position?.city} name="city" />
      <ReadOnlyField value={position?.state} name="state" />
      <ReadOnlyField value={position?.country} name="country" />
      <ReadOnlyField value={position?.postalCode} name="postalCode" />
      <ReadOnlyField value={position?.latitude} name="latitude" />
      <ReadOnlyField value={position?.longitude} name="longitude" />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {props.action}
      </Button>
    </Box>
  );
}
