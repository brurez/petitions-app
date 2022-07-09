import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { usePetitionQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

export default function PetitionViewPage() {
  const router = useRouter();
  const { data, loading } = usePetitionQuery({
    variables: { id: Number(router.query.id) },
  });

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography>{data?.petition.title}</Typography>
      <Typography>{data?.petition.numberOfVotes}</Typography>
      <Typography>{data?.petition.description}</Typography>
    </Box>
  );
}
