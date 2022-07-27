import type { NextPage } from "next";
import {
  Chip,
  FormControl,
  Grow,
  Input,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import PetitionList from "../components/PetitionList";
import { PetitionsDocument, usePetitionsQuery } from "../generated/graphql";
import AppMap from "../components/AppMap";
import { useState } from "react";
import { addApolloState, createApolloClient } from "../lib/apolloClient";
import { isServer } from "../lib/isServer";
import { Done, Face, PlaceOutlined, Search } from "@mui/icons-material";
import { NoSsr } from "@mui/base";
import { Section } from "../components/Section";

const Home: NextPage = () => {
  const { isLoggedIn, currentUser } = useCurrentUser();
  const [center, setCenter] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const limit = 10;
  const [offset, setOffset] = useState<number>(0);
  const [onlyPetitionsOnMap, setOnlyPetitionsOnMap] = useState<boolean>(false);
  const [onlyCurrentUserPetitions, setOnlyCurrentUserPetitions] =
    useState<boolean>(false);
  const [radius, setRadius] = useState<number>(20);

  const router = useRouter();
  const { data, previousData, fetchMore } = usePetitionsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      search,
      limit,
      userId:
        onlyCurrentUserPetitions && currentUser?.id
          ? currentUser?.id
          : undefined,
      region:
        center && onlyPetitionsOnMap
          ? { latitude: center.lat, longitude: center.lng, radius }
          : null,
    },
  });

  const petitions = data?.petitions || previousData?.petitions || [];

  function handleCreateNewPetitionClick() {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    router.push("/petitions/create");
  }

  const handleMarkerClick = (id) => {
    const petition = petitions.find((p) => p.id === id);
    if (!petition) return;
    setCenter({ lat: petition.latitude, lng: petition.longitude });
    !isServer() && window.scrollTo(0, 0);
  };

  const handleLoadMoreClick = () => {
    const _offset = offset + limit;
    setOffset(_offset);
    fetchMore({ variables: { offset: _offset } });
  };

  console.log(radius);

  return (
    <Box sx={{ mt: 2 }}>
      <Grow in={true}>
        <Typography
          variant="h3"
          align="center"
          component={"h2"}
          sx={{ mt: 4, fontWeight: "bold" }}
        >
          Municipal Petitions for Everyone
        </Typography>
      </Grow>
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
      <NoSsr>
        <Paper sx={{ mt: 4, textAlign: "center" }}>
          <AppMap
            defaultCenter={center}
            petitions={petitions}
            height={400}
            onChange={(p, r) => {
              setCenter({ lat: p.latitude, lng: p.longitude });
              setRadius(r);
            }}
            onBoundsChange={(c, r) => {
              setCenter(c);
              setRadius(r);
            }}
          />
        </Paper>
      </NoSsr>
      <Section sx={{ mt: 2, width: "100%", maxWidth: "inherit" }}>
        <Typography variant="h4" align="center" component={"h2"} sx={{ mb: 1 }}>
          Petitions
        </Typography>

        <Box mb={2}>
          <FormControl variant="standard" sx={{ mb: 2 }} fullWidth>
            <Input
              id="input-with-icon-adornment"
              placeholder={"Search for petitions"}
              onChange={({ target: { value } }) => setSearch(value)}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Chip
            color={onlyPetitionsOnMap ? "primary" : "default"}
            label={"Only petitions on the map"}
            icon={onlyPetitionsOnMap ? <Done /> : <PlaceOutlined />}
            onClick={() => setOnlyPetitionsOnMap(!onlyPetitionsOnMap)}
          />
          <Chip
            color={onlyCurrentUserPetitions ? "primary" : "default"}
            label={"Only my petitions"}
            icon={onlyCurrentUserPetitions ? <Done /> : <Face />}
            onClick={() =>
              setOnlyCurrentUserPetitions(!onlyCurrentUserPetitions)
            }
          />
        </Box>

        <PetitionList petitions={petitions} onMarkerClick={handleMarkerClick} />
        <Box justifyContent={"center"} display={"flex"} pt={2}>
          <Button onClick={handleLoadMoreClick}>Load more petitions...</Button>
        </Box>
      </Section>
    </Box>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const apolloClient = createApolloClient();
  // loads query data into the Apollo cache
  await apolloClient.query({ query: PetitionsDocument });
  return addApolloState(apolloClient, {
    props: {}, // don't need any props as data was loaded into the cache
  });
}
