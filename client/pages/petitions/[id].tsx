import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  PetitionDetailsDocument,
  usePetitionDeleteMutation,
  usePetitionDetailsQuery,
  useVoteCreateMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import * as React from "react";
import { PetitionVotes } from "../../components/PetitionVotes";
import Button from "@mui/material/Button";
import useMessage from "../../hooks/useMessage";
import AppMap from "../../components/AppMap";
import { MediaFileList } from "../../components/MediaFileList";
import CommentSection from "../../components/CommentSection";
import { DateTime } from "luxon";
import Check from "@mui/icons-material/Check";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import { addApolloState, createApolloClient } from "../../lib/apolloClient";
import { Section } from "../../components/Section";
import useCurrentUser from "../../hooks/useCurrentUser";

function PetitionTopBarActions(props: {
  onEditClick: () => Promise<boolean>;
  onDeleteClick: () => void;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Button endIcon={<Edit />} onClick={props.onEditClick}>
        Edit
      </Button>
      <Button
        color={"error"}
        endIcon={<Delete />}
        onClick={props.onDeleteClick}
      >
        Delete
      </Button>
    </Box>
  );
}

// page to display a single petition
export default function PetitionViewPage() {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const {
    data,
    loading,
    refetch: refetchPetition,
  } = usePetitionDetailsQuery({
    variables: { id: Number(router.query.id) },
  });

  const [petitionDelete] = usePetitionDeleteMutation();

  const [voteCreate] = useVoteCreateMutation();
  const { showSuccessMessage, showErrorMessage } = useMessage();

  if (loading) return <CircularProgress />;

  // executed when the user click the button to vote
  const handleVoteClick = () => {
    // creates a vote on the server
    voteCreate({
      variables: {
        input: { voteInput: { petitionId: Number(router.query.id) } },
      },
    })
      .then((res) => {
        showSuccessMessage("Your vote was saved!");
        // reload the petition to show the change on vote count
        refetchPetition();
      })
      .catch((err) => showErrorMessage(err.message));
  };

  const handleDeleteClick = () => {
    petitionDelete({
      variables: {
        input: { id: String(router.query.id) },
      },
    })
      .then((res) => {
        showSuccessMessage("Petition deleted!");
        router.push("/");
      })
      .catch((err) => showErrorMessage(err.message));
  };

  const petition = data?.petition;

  // shows a loading spinner if the petition was not loaded yet
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
      {petition.id && petition.userId === currentUser?.id && (
        <PetitionTopBarActions
          onEditClick={() => router.push(`/petitions/${router.query.id}/edit`)}
          onDeleteClick={handleDeleteClick}
        />
      )}
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          display: "flex",
          justifyContent: "space-between",
        }}
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
      <Section sx={{ mt: 2 }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"}>
          About the petition
        </Typography>
        <Typography>{petition.description}</Typography>
      </Section>
      <Section sx={{ mt: 2 }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"} mb={2}>
          Issue location
        </Typography>
        <AppMap petition={petition} height={260} hideSearch closeZoom />
        <Box mt={2}>
          <Typography variant={"subtitle2"} textAlign={"center"}>
            {petition.address}, {petition.city} - {petition.country}
          </Typography>
        </Box>
      </Section>
      <Section sx={{ mt: 2 }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"}>
          Images
        </Typography>
        <MediaFileList mediaFiles={petition?.mediaFiles || []} />
      </Section>
      <Section
        sx={{
          mt: 2,
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
      </Section>
      <Section sx={{ mt: 2 }}>
        <Typography variant={"h5"} component={"h2"} textAlign={"center"}>
          Comments
        </Typography>
        <CommentSection
          comments={petition.comments}
          petitionId={petition.id}
          onCommentCreate={refetchPetition}
        />
      </Section>
    </Box>
  );
}

// this function is only executed on the server to preload the petition into the cache
// to allow the server-side rendering of the petition with all information necessary for search engines
export async function getServerSideProps(context) {
  const apolloClient = createApolloClient();
  await apolloClient.query({
    query: PetitionDetailsDocument,
    variables: { id: Number(context.query.id) },
  });

  return addApolloState(apolloClient, {
    props: {}, // will be passed to the page component as props
  });
}
