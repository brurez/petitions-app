import Card from "@mui/material/Card";
import { CardContent, Divider, Paper, Stack } from "@mui/material";
import { Comment } from "../generated/graphql";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";

export default function CommentList({
  comments,
  ...props
}: {
  comments: Comment[];
  mt: number;
}) {
  if (comments.length === 0)
    return (
      <Box textAlign={"center"} {...props}>
        <Typography variant={"body2"}>No comments so far...</Typography>
      </Box>
    );

  return (
    <Stack spacing={1} {...props}>
      {comments.map((comment: Comment) => (
        <Box key={comment.id}>
          <Typography gutterBottom variant={"body1"}>
            {" "}
            {comment.commentText}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color={"text.secondary"} variant={"subtitle2"}>
              by {comment?.user?.firstName} {comment?.user?.lastName}{" "}
            </Typography>
            <Typography color={"text.secondary"} variant={"subtitle2"}>
              {DateTime.fromISO(comment?.createdAt).toLocaleString()}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Stack>
  );
}
