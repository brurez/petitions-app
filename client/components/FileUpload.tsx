import React from "react";
import clsx from "clsx";
import CloudUpload from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

// this component allows the user to upload an image by clicking with the mouse and selection a file
// or by dragging an image
export type FileUploadProps = {
  imageButton?: boolean;
  accept: string;
  hoverLabel?: string;
  dropLabel?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  image?: {
    url: string;
    imageStyle?: {
      width?: string;
      height?: string;
    };
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

// replace makeStyles with styled and define your styles as a function
const FileUploadRoot = styled("label")({
  cursor: "pointer",
  justifyContent: "center",
  display: "flex",
  "&:hover p,&:hover svg,& img": {
    opacity: 1,
  },
  "& p, svg": {
    opacity: 0.7,
  },
  "&:hover img": {
    opacity: 0.5,
  },
});

const NoMouseEventBox = styled(Box)({
  pointerEvents: "none",
});

const IconTextBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
});

const HiddenInput = styled("input")({
  display: "none",
});

const OnDragOverLabel = styled(FileUploadRoot)({
  "& img": {
    opacity: 0.5,
  },
  "& p, svg": {
    opacity: 1,
  },
});

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "260px",
  height = "100px",
  backgroundColor = "#fff",
  image: {
    url = "",
    imageStyle = {
      height: "inherit",
    },
  } = {},
  onChange,
  onDrop,
}) => {
  const [imageUrl, setImageUrl] = React.useState(url);
  const [labelText, setLabelText] = React.useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      onDrop(e);
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (imageButton && event.target.files[0]) {
      // @ts-ignore
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }

    onChange(event);
  };

  return (
    <>
      <HiddenInput
        onChange={handleChange}
        accept={accept}
        id="file-upload"
        type="file"
      />

      <FileUploadRoot htmlFor="file-upload" {...dragEvents}>
        <NoMouseEventBox
          width={width}
          height={height}
          bgcolor={backgroundColor}
        >
          {(!imageButton || isDragOver || isMouseOver) && (
            <>
              <IconTextBox height={height} width={width}>
                <CloudUpload fontSize="large" />
                <Typography>{labelText}</Typography>
              </IconTextBox>
            </>
          )}
        </NoMouseEventBox>
      </FileUploadRoot>
    </>
  );
};
