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
import {
  PetitionsDocument,
  usePetitionDeleteMutation,
  usePetitionsQuery,
} from "../generated/graphql";
import AppMap from "../components/AppMap";
import { useCallback, useEffect, useState } from "react";
import { addApolloState, createApolloClient } from "../lib/apolloClient";
import { isServer } from "../lib/isServer";
import { Done, Face, PlaceOutlined, Search } from "@mui/icons-material";
import { NoSsr } from "@mui/base";
import { Section } from "../components/Section";
import useMessage from "../hooks/useMessage";

type CenterType = {
  lat: number;
  lng: number;
};

// Application home page
const Home: NextPage = () => {
  const { isLoggedIn, currentUser } = useCurrentUser();
  // center of the map position state
  const [center, setCenter] = useState<CenterType | null>(null);
  // petition's search string state
  const [search, setSearch] = useState<string>("");
  // how many petitions are loaded
  const limit = 10;
  // petition's offset used for pagination
  const [offset, setOffset] = useState<number>(0);
  // state for the search filter that only show petitions present on the map
  const [onlyPetitionsOnMap, setOnlyPetitionsOnMap] = useState<boolean>(false);
  // state for the search filter to display only the petitions created by the current user
  const [onlyCurrentUserPetitions, setOnlyCurrentUserPetitions] =
    useState<boolean>(false);
  // half of the distance in km covered by the bounderies of the map
  const [radius, setRadius] = useState<number>(20);

  const buildVariables = useCallback(
    () => ({
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
    }),
    [
      center,
      onlyCurrentUserPetitions,
      currentUser,
      onlyPetitionsOnMap,
      radius,
      search,
    ]
  );

  const router = useRouter();
  const { showSuccessMessage } = useMessage();
  const { data, previousData, fetchMore, refetch } = usePetitionsQuery({
    notifyOnNetworkStatusChange: true,
    variables: buildVariables(),
  });
  const [deletePetition] = usePetitionDeleteMutation();

  // Refetch the petitions when some state that variables depends change
  useEffect(() => {
    refetch(buildVariables());
  }, [center, onlyPetitionsOnMap, onlyCurrentUserPetitions, radius]);

  const petitions = data?.petitions || previousData?.petitions || [];
  // executed when the button to create a new petition is clicked
  function handleCreateNewPetitionClick() {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    router.push("/petitions/create");
  }
  // executed when a marker in the map is clicked
  const handleMarkerClick = (id) => {
    const petition = petitions.find((p) => p.id === id);
    if (!petition) return;
    setCenter({ lat: petition.latitude, lng: petition.longitude });
    !isServer() && window.scrollTo(0, 0);
  };

  const handleDeleteClick = (id) => {
    deletePetition({
      variables: { input: { id } },
    }).then(() => {
      refetch(buildVariables());
      showSuccessMessage("Petition deleted");
    });
  };

  // executed when the "Load more" button is clicked
  const handleLoadMoreClick = () => {
    const _offset = offset + limit;
    setOffset(_offset);
    fetchMore({ variables: { offset: _offset } });
  };

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
      <Paper sx={{ mt: 4, textAlign: "center" }}>
        <AppMap
          defaultCenter={center ? center : undefined}
          petitions={petitions}
          height={400}
          onCenterChange={(c) => {
            setCenter(c);
          }}
          onRadiusChange={(r) => {
            setRadius(r);
          }}
        />
      </Paper>
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
            onClick={() => {
              setOnlyPetitionsOnMap(!onlyPetitionsOnMap);
              refetch();
            }}
          />
          <Chip
            color={onlyCurrentUserPetitions ? "primary" : "default"}
            label={"Only my petitions"}
            icon={onlyCurrentUserPetitions ? <Done /> : <Face />}
            onClick={() =>
              setOnlyCurrentUserPetitions(!onlyCurrentUserPetitions)
            }
            disabled={!isLoggedIn}
          />
        </Box>

        <PetitionList
          petitions={petitions}
          onMarkerClick={handleMarkerClick}
          onDeleteClick={handleDeleteClick}
        />
        <Box justifyContent={"center"} display={"flex"} pt={2}>
          <Button onClick={handleLoadMoreClick}>Load more petitions...</Button>
        </Box>
      </Section>
    </Box>
  );
};

export default Home;

// This function is only executed in the backend to preload the petition's cache
// and render the HTML full of petitions on the server before sending it to the browser
export async function getServerSideProps(context) {
  const apolloClient = createApolloClient();
  // loads query data into the Apollo cache
  await apolloClient.query({
    query: PetitionsDocument,
    variables: { limit: 10, search: "", userId: undefined, region: null },
  });
  return addApolloState(apolloClient, {
    props: {}, // don't need any props as data was loaded into the cache
  });
}
