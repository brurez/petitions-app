import TextField, { TextFieldProps } from "@mui/material/TextField";
import * as React from "react";

type ReadOnlyFieldProps = {
  hide?: boolean;
} & TextFieldProps;

export default function ReadOnlyField(props: ReadOnlyFieldProps) {
  return (
    <div style={{ display: "none" }}>
      <TextField
        {...props}
        defaultValue={props.defaultValue}
        id={props.name}
        label={props.label}
        name={props.name}
        autoComplete={props.name}
        data-testid={props.name}
      />
    </div>
  );
}
