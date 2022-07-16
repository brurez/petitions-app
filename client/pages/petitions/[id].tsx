import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  usePetitionQuery,
  useVoteCreateMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { CircularProgress, Paper } from "@mui/material";
import * as React from "react";
import { PetitionVotes } from "../../components/PetitionVotes";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import useMessage from "../../hooks/useMessage";

export default function PetitionViewPage() {
  const router = useRouter();
  const { data, loading, refetch: refetchPetition } = usePetitionQuery({
    variables: { id: Number(router.query.id) },
  });
  const [voteCreate] = useVoteCreateMutation();
  const { showSuccessMessage, showErrorMessage } = useMessage();

  if (loading) return <CircularProgress />;

  const handleVoteClick = () => {
    voteCreate({
      variables: {
        input: { voteInput: { petitionId: Number(router.query.id) } },
      },
    }).then((res) => {
      showSuccessMessage("Your vote was saved!");
      refetchPetition();
    }).catch( err => showErrorMessage(err.message));
  };

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
          <Button onClick={handleVoteClick}>Vote for this petition</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
