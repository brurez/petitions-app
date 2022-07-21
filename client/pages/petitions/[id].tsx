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
import AppMap from "../../components/AppMap";
import { MediaFileList } from "../../components/MediaFileList";

export default function PetitionViewPage() {
  const router = useRouter();
  const {
    data,
    loading,
    refetch: refetchPetition,
  } = usePetitionQuery({
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
        {data?.petition.title}
      </Typography>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography>{data?.petition.description}</Typography>
      </Paper>
      <Paper sx={{ mt: 2, p: 2, width: "100%" }}>
        {!loading && (
          <>
            <AppMap
              petition={data?.petition}
              height={260}
              hideSearch
              closeZoom
            />
            <Box mt={2}>
              <Typography variant={"body1"} textAlign={"center"}>
                {data?.petition.address} - {data?.petition.city} -{" "}
                {data?.petition.country}
              </Typography>
            </Box>
          </>
        )}
      </Paper>
      <Paper sx={{ mt: 2, p: 2, width: "100%" }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"}>
          Images
        </Typography>
        <MediaFileList mediaFiles={data?.petition?.mediaFiles || []} />
      </Paper>
      <Paper
        sx={{
          mt: 2,
          p: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <PetitionVotes numberOfVotes={Number(data?.petition.numberOfVotes)} />
        <Button onClick={handleVoteClick}>Vote for this petition</Button>
      </Paper>
    </Box>
  );
}
