import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {MediaFile, Petition, PetitionFieldsFragment} from "../generated/graphql";
import AppMap from "./AppMap";
import ReadOnlyField from "./ReadOnlyField";
import { useEffect, useState } from "react";
import PetitionMedia from "./PetitionMedia";
import Paper from "@mui/material/Paper";
import { ButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import {Form} from "../lib/Form";

export function validatePetitionForm(fields: Petition): string | null {
  if (!fields.city)
    return "You need to add a location by typing the address on the map.";
  if (!fields.title) return "The title cannot be blank";
  if (!fields.description) return "The description cannot be blank";

  return null;
}

export function buildPetitionFormValues(event): { errorMessage?: string, input?: Petition } {
  event.preventDefault();
  const { mediaFile, mediaFileIds, ...fields } = Form.serialize(
      event.currentTarget
  );
  const petitionInput: Petition = fields;
  petitionInput.latitude = Number(petitionInput.latitude);
  petitionInput.longitude = Number(petitionInput.longitude);
  // @ts-ignore
  petitionInput.mediaFileIds = mediaFileIds ? mediaFileIds
      .split(",")
      .map((id) => Number(id)) : undefined;

  const errorMessage = validatePetitionForm(petitionInput);
  if (errorMessage) {
    return { errorMessage }
  }

  return { input: petitionInput }
}

export function PetitionForm(props: {
  onSubmit: (event: any) => void;
  action: string;
  initialData?: PetitionFieldsFragment;
}) {
  const [position, setPosition] = useState<any>(null);
  const [mediaFileIds, setMediaFileIds] = useState<number[]>([]);

  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

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
    setMediaFileIds(
      props.initialData?.mediaFiles?.map((mf: MediaFile) => mf.id) || []
    );
  }, [props.initialData]);

  return (
    <Box
      component="form"
      onSubmit={props.onSubmit}
      noValidate
      onKeyDown={handleKeyDown}
      sx={{ mt: 1 }}
    >
      <Paper sx={{ p: 2 }}>
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
      </Paper>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography align={"center"} variant={"h5"} component={"h2"}>
          Image upload
        </Typography>
        <PetitionMedia
          onChange={(ids) => setMediaFileIds(ids)}
          initialData={props.initialData?.mediaFiles || []}
        />
      </Paper>
      <Paper sx={{ p: 2, mt: 2 }}>
        <AppMap
          petition={{ ...props?.initialData, ...position }}
          height={260}
          onChange={handleMapChange}
        />
      </Paper>
      <ReadOnlyField value={mediaFileIds} name="mediaFileIds" />
      <ReadOnlyField value={position?.address} name="address" />
      <ReadOnlyField value={position?.city} name="city" />
      <ReadOnlyField value={position?.state} name="state" />
      <ReadOnlyField value={position?.country} name="country" />
      <ReadOnlyField value={position?.postalCode} name="postalCode" />
      <ReadOnlyField value={position?.latitude} name="latitude" />
      <ReadOnlyField value={position?.longitude} name="longitude" />

      <Box sx={{ display: "flex", my: 4 }}>
        <Button
          variant={"outlined"}
          sx={{ flex: 1 }}
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ ml: 2, flex: 1 }}>
          {props.action}
        </Button>
      </Box>
    </Box>
  );
}
