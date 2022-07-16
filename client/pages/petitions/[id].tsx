import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { usePetitionQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { CircularProgress, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { AccountBalance } from "@mui/icons-material";
import * as React from "react";
import { PetitionVotes } from "../../components/PetitionVotes";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function PetitionViewPage() {
  const router = useRouter();
  const { data, loading } = usePetitionQuery({
    variables: { id: Number(router.query.id) },
  });

  if (loading) return <CircularProgress />;

  return (
    <Paper
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Typography variant="h5" component="h1">
        {data?.petition.title}
      </Typography>
      <Box sx={{ mt: 2, p: 4 }}>
        <Typography>{data?.petition.description}</Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={6}>
          <PetitionVotes numberOfVotes={Number(data?.petition.numberOfVotes)} />
        </Grid>
        <Grid xs={6}>
          <Button>Vote for this petition</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
