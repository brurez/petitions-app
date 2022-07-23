import {Grow, Paper, PaperProps} from "@mui/material";

export function Section({ children, sx, ...props }: PaperProps) {
  return (
    <Grow in={true}>
      <Paper sx={{ p: 2, width: "100%", maxWidth: 800, ...sx }} {...props}>
        {children}
      </Paper>
    </Grow>
  );
}
