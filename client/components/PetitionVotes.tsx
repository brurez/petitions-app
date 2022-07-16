import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function PetitionVotes(props: { numberOfVotes: number }) {
    return (
        <Box sx={{textAlign: "center"}}>
            <Typography variant="body1">{props.numberOfVotes}</Typography>
            <Typography variant="body2">Votes</Typography>
        </Box>
    );
}
