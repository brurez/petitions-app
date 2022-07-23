import type { NextPage } from "next";
import { CircularProgress, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import PetitionList from "../components/PetitionList";
import { PetitionsDocument, usePetitionsQuery } from "../generated/graphql";
import AppMap from "../components/AppMap";
import { useState } from "react";
import {addApolloState, createApolloClient} from "../lib/apolloClient";
import { isServer } from "../lib/isServer";

const Home: NextPage = () => {
  const { isLoggedIn } = useCurrentUser();
  const router = useRouter();
  const { data, loading } = usePetitionsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [center, setCenter] = useState<any>(null);
  function handleCreateNewPetitionClick() {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    router.push("/petitions/create");
  }

  const handleMarkerClick = (id) => {
    const petition = data?.petitions.find((p) => p.id === id);
    if (!petition) return;
    setCenter({ lat: petition.latitude, lng: petition.longitude });
    !isServer() && window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ mt: 4, fontWeight: "bold" }}
      >
        Municipal Petitions for Everyone
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleCreateNewPetitionClick}
          size="large"
          sx={{ mt: 4 }}
        >
          Create new petition
        </Button>
      </Box>
      <Paper sx={{ mt: 4, textAlign: "center" }}>
        <AppMap
          defaultCenter={center}
          petitions={data?.petitions || []}
          height={400}
        />
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          Petitions
        </Typography>

        <PetitionList
          petitions={data?.petitions || []}
          onMarkerClick={handleMarkerClick}
        />
      </Box>
    </Box>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const apolloClient = createApolloClient()
  await apolloClient.query({ query: PetitionsDocument });

  return addApolloState(apolloClient, {
    props: {}, // will be passed to the page component as props
  });
}
