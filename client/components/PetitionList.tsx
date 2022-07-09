import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActions, CardContent, Divider, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function PetitionItem({ title, description, numberOfVotes }) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Box sx={{textAlign: "center"}}>
              <Typography variant="body1">
                {numberOfVotes}
              </Typography>
              <Typography variant="body2">
                Votes
              </Typography>
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default function PetitionList({ petitions }) {
  return (
    <Grid container spacing={2}>
      {petitions.map((petition) => (
        <Grid item xs={12} md={6}>
          <PetitionItem {...petition} />
        </Grid>
      ))}
    </Grid>
  );
}
