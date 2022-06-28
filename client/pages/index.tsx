import type { NextPage } from "next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Home: NextPage = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h3" align="center">Municipal Petitions for Everyone</Typography>
    </Box>
  );
};

export default Home;
