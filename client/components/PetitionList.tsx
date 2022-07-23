import Card from "@mui/material/Card";
import { CardActions, CardContent, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import useCurrentUser from "../hooks/useCurrentUser";
import { PetitionVotes } from "./PetitionVotes";
import { Room } from "@mui/icons-material";
import {Petition, PetitionFieldsFragment} from "../generated/graphql";

function PetitionItem({
  id,
  title,
  description,
  city,
  country,
  numberOfVotes,
  userId,
  onMarkerClick,
}) {
  const { currentUser } = useCurrentUser();

  let ownsPetition = false;
  if (currentUser) {
    ownsPetition = currentUser?.id === userId;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <PetitionVotes numberOfVotes={numberOfVotes} />
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle2"
              color={"text.secondary"}
              gutterBottom
              component="div"
            >
              {city} - {country}{" "}
              <Room
                color={"error"}
                sx={{ verticalAlign: "bottom", cursor: "pointer" }}
                onClick={onMarkerClick}
              />
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="body2"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ flexDirection: "row-reverse" }}>
        <Link href={`petitions/${id}`}>
          <Button size="small">Learn More</Button>
        </Link>
        {ownsPetition && (
          <Link href={`petitions/${id}/edit`}>
            <Button size="small">Edit</Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}

export default function PetitionList({
  petitions,
  onMarkerClick,
}: {
  petitions: PetitionFieldsFragment[];
  onMarkerClick: (a: number) => void;
}) {
  return (
    <Grid container spacing={2}>
      {petitions.map((petition) => (
        <Grid item xs={12} md={6} key={petition.id} id={`petition-${petition.id}`}>
          <PetitionItem
            {...petition}
            onMarkerClick={() => onMarkerClick(petition.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
