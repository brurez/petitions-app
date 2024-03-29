import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {
  MediaFile,
  Petition,
  PetitionDetailFieldsFragment,
} from "../generated/graphql";
import AppMap, { PositionI } from "./AppMap";
import ReadOnlyField from "./ReadOnlyField";
import { useEffect, useState } from "react";
import PetitionMedia from "./PetitionMedia";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { Form } from "../lib/Form";
import { Section } from "./Section";

// returns an error message if any field is invalid
export function validatePetitionForm(fields: Petition): string | null {
  if (!fields.city)
    return "You need to add a location by typing the address on the map.";
  if (!fields.title) return "The title cannot be blank";
  if (!fields.description) return "The description cannot be blank";

  return null;
}

// process the form input elements and created a PetitionInput object
export function buildPetitionFormValues(event): {
  errorMessage?: string;
  input?: Petition;
} {
  event.preventDefault();
  const { mediaFile, mediaFileIds, ...fields } = Form.serialize(
    event.currentTarget
  );
  const petitionInput: Petition = fields;
  petitionInput.latitude = Number(petitionInput.latitude);
  petitionInput.longitude = Number(petitionInput.longitude);
  // @ts-ignore
  petitionInput.mediaFileIds = mediaFileIds
    ? mediaFileIds.split(",").map((id) => Number(id))
    : undefined;

  const errorMessage = validatePetitionForm(petitionInput);
  if (errorMessage) {
    return { errorMessage };
  }

  return { input: petitionInput };
}

// component that show the form fields necessary to create and update petitions
export function PetitionForm(props: {
  onSubmit: (event: any) => void;
  action: string;
  initialData?: PetitionDetailFieldsFragment;
}) {
  const [position, setPosition] = useState<PositionI | null>(null);
  const [mediaFileIds, setMediaFileIds] = useState<number[]>([]);

  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleMapChange = (position) => {
    setPosition(position);
  };

  // executed on initialData changes to set the position and mediaFileIds state
  useEffect(() => {
    if (props.initialData)
      setPosition({
        latitude: props.initialData.latitude,
        longitude: props.initialData.longitude,
        address: props.initialData.address,
        city: props.initialData.city,
        state: props.initialData.state,
        country: props.initialData.country,
        postalCode: props.initialData.postalCode,
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
      sx={{ mt: 1, width: "100%", maxWidth: 800 }}
    >
      <Section>
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
      </Section>
      <Section sx={{ mt: 2 }}>
        <Typography align={"center"} variant={"h5"} component={"h3"}>
          Petition media
        </Typography>
        <PetitionMedia
          onChange={(ids) => setMediaFileIds(ids)}
          initialData={props.initialData?.mediaFiles || []}
        />
      </Section>
      <Section sx={{ pt: 2, mt: 2 }}>
        <Box mb={2}>
          <Typography align={"center"} variant={"h5"} component={"h3"} mb={2}>
            Issue location
          </Typography>
        </Box>
        <AppMap
          petition={
            props?.initialData
              ? { ...props.initialData, ...position }
              : undefined
          }
          height={260}
          onPositionChange={handleMapChange}
        />
      </Section>

      <ReadOnlyField value={mediaFileIds} name="mediaFileIds" />
      {/* The fields bellow are not display to the user, they are changed by Google Map  */}
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
