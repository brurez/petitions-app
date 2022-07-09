import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";

export function PetitionForm(props: {
    onSubmit: (event: any) => void;
    action: string;
}) {
    return (
        <Box component="form" onSubmit={props.onSubmit} noValidate sx={{mt: 1}}>
            <TextField
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
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                {props.action}
            </Button>
        </Box>
    );
}
