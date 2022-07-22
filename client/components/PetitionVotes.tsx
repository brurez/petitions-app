import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function PetitionVotes(props: { numberOfVotes: number }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ textWeight: "bold" }}>
        {props.numberOfVotes}
      </Typography>
      <Typography variant="body1">Votes</Typography>
    </Box>
  );
}
