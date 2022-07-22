import { MediaFile } from "../generated/graphql";
import Card from "@mui/material/Card";
import { CardMedia, ImageList, ImageListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Image from "next/image";

export function MediaFileList(props: { mediaFiles: MediaFile[] }) {
  return (
    <ImageList cols={2}>
      {props.mediaFiles.length > 0 ? (
        props.mediaFiles.map((mediaFile) => (
          <ImageListItem key={mediaFile.id}>
            <Image src={String(mediaFile.url)} loading={"lazy"} alt={""} />
          </ImageListItem>
        ))
      ) : (
        <Typography textAlign={"center"}>
          Upload images to see it listed here
        </Typography>
      )}
    </ImageList>
  );
}
