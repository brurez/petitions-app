import { MediaFile } from "../generated/graphql";
import { ImageList, ImageListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Image from "next/image";

export function MediaFileList(props: { mediaFiles: MediaFile[] }) {
  return props.mediaFiles.length > 0 ? (
    <ImageList cols={2}>
      {props.mediaFiles.map((mediaFile) => (
        <ImageListItem key={mediaFile.id} sx={{ height: 100}}>
          <img src={String(mediaFile.url)} />
        </ImageListItem>
      ))}
    </ImageList>
  ) : (
    <Typography m={2} textAlign={"center"} variant={"body2"}>
      Upload images to see it listed here
    </Typography>
  );
}
