import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  usePetitionDetailsQuery,
  usePetitionQuery,
  useVoteCreateMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { CircularProgress, Paper } from "@mui/material";
import * as React from "react";
import { PetitionVotes } from "../../components/PetitionVotes";
import Button from "@mui/material/Button";
import useMessage from "../../hooks/useMessage";
import AppMap from "../../components/AppMap";
import { MediaFileList } from "../../components/MediaFileList";
import CommentSection from "../../components/CommentSection";
import { DateTime } from "luxon";
import { Check } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

export default function PetitionViewPage() {
  const router = useRouter();
  const {
    data,
    loading,
    refetch: refetchPetition,
  } = usePetitionDetailsQuery({
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
    })
      .then((res) => {
        showSuccessMessage("Your vote was saved!");
        refetchPetition();
      })
      .catch((err) => showErrorMessage(err.message));
  };

  const petition = data?.petition;

  if (!petition)
    return (
      <Box textAlign={"center"}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        mt: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Typography variant="h4" component="h1" textAlign={"center"}>
        {petition.title}
      </Typography>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography mt={2} ml={1} variant={"body2"}>
          <strong>Created by: </strong> {petition?.user?.firstName}{" "}
          {petition?.user?.lastName}
        </Typography>
        <Typography mt={2} mr={1} variant={"body2"}>
          <strong>Date: </strong>{" "}
          {DateTime.fromISO(petition?.createdAt).toLocaleString()}
        </Typography>
      </Box>
      <Paper sx={{ mt: 2, p: 2, width: "100%" }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"}>
          About the petition
        </Typography>
        <Typography>{petition.description}</Typography>
      </Paper>
      <Paper sx={{ mt: 2, width: "100%" }}>
        {!loading && (
          <>
            <AppMap petition={petition} height={260} hideSearch closeZoom />
            <Box m={1}>
              <Typography variant={"body2"} textAlign={"center"}>
                {petition.address}, {petition.city} - {petition.country}
              </Typography>
            </Box>
          </>
        )}
      </Paper>
      <Paper sx={{ mt: 2, p: 2, width: "100%" }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"}>
          Images
        </Typography>
        <MediaFileList mediaFiles={petition?.mediaFiles || []} />
      </Paper>
      <Paper
        sx={{
          mt: 2,
          p: 2,
          width: "100%",
        }}
      >
        <Grid
          container
          justifyContent={"space-around"}
          alignItems={"center"}
          spacing={2}
        >
          <Grid item sm={6}>
            <PetitionVotes numberOfVotes={Number(petition.numberOfVotes)} />
          </Grid>
          <Grid item sm={6} textAlign={"center"}>
            <Button
              endIcon={<Check />}
              variant={"contained"}
              color={"success"}
              onClick={handleVoteClick}
              size={"large"}
            >
              Vote for this petition
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ mt: 2, p: 2, width: "100%" }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"}>
          Comments
        </Typography>
        <CommentSection
          comments={petition.comments}
          petitionId={petition.id}
          onCommentCreate={refetchPetition}
        />
      </Paper>
    </Box>
  );
}
