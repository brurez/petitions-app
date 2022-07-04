import type { NextPage } from "next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { isLoggedIn } = useCurrentUser();
  const router = useRouter();

  function handleCreateNewPetitionClick() {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    router.push("/petition");
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
    </Box>
  );
};

export default Home;
