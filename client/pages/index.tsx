import type { NextPage } from "next";
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import PetitionList from "../components/PetitionList";
import { usePetitionsQuery } from "../generated/graphql";
import AppMap from "../components/AppMap";

const Home: NextPage = () => {
  const { isLoggedIn } = useCurrentUser();
  const router = useRouter();
  const { data, loading } = usePetitionsQuery();
  function handleCreateNewPetitionClick() {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    router.push("/petitions/create");
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h3" align="center" sx={{ mt: 4 }}>
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
      <Box mt={2}>
        <AppMap
          petitions={loading || !data?.petitions ? [] : data?.petitions}
          height={400}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
          Petitions
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <PetitionList petitions={data?.petitions} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
