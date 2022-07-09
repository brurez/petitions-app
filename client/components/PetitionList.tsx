import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActions, CardContent, Divider, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import useCurrentUser from "../hooks/useCurrentUser";

function PetitionItem({ id, title, description, numberOfVotes }) {
  const { currentUser } = useCurrentUser();

  let ownsPetition = false;
  if ("id" in currentUser) {
    ownsPetition = currentUser?.id === id;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1">{numberOfVotes}</Typography>
              <Typography variant="body2">Votes</Typography>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ flexDirection: "row-reverse" }}>
        <Link href={`petitions/${id}`}>
          <Button size="small">Learn More</Button>
        </Link>
        {ownsPetition && (
          <Link href={`petitions/${id}/edit`}>
            <Button size="small">Edit</Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}

export default function PetitionList({ petitions }) {
  return (
    <Grid container spacing={2}>
      {petitions.map((petition) => (
        <Grid item xs={12} md={6} key={petition.id}>
          <PetitionItem {...petition} />
        </Grid>
      ))}
    </Grid>
  );
}
