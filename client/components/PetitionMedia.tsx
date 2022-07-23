import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useState } from "react";
import { CircularProgress, Divider } from "@mui/material";
import { MediaFile, usePetitionMediaFileLazyQuery } from "../generated/graphql";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { Upload } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { MediaFileList } from "./MediaFileList";
import { FileUpload } from "./FileUpload";
import useMessage from "../hooks/useMessage";

export default function PetitionMedia({
  onChange,
  initialData,
}: {
  onChange: (a: number[]) => void;
  initialData: MediaFile[];
}) {
  const [mediaFileIds, setMediaFileIds] = useState<number[]>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [petitionMediaFileQuery] = usePetitionMediaFileLazyQuery();
  const [loading, setLoading] = useState<boolean>(false);
  const { showErrorMessage, showSuccessMessage } = useMessage();

  useEffect(() => {
    setMediaFiles(initialData);
  }, [initialData]);

  const getImages = async (ids) => {
    const newMediaFiles: MediaFile[] = [];
    for (const id of ids) {
      const res = await petitionMediaFileQuery({ variables: { id } });
      if (res.data?.petitionMediaFile)
        newMediaFiles.push(res.data?.petitionMediaFile);
    }
    setMediaFiles(newMediaFiles);
  };

  const handleUpload = (currentFile) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", currentFile);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/petition/media_files`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error) showSuccessMessage("Image uploaded successfully")
        else showErrorMessage("Problem trying to upload the image")
        setUploading(false);
        const ids = [...mediaFileIds, data.media_file_id];
        setMediaFileIds(ids);
        onChange(ids);
        setLoading(true);
        getImages(ids)
          .then(() => setLoading(false))
          .catch((err) => {
            showErrorMessage(err.message)
            setLoading(false)
          });
      }).catch(err => showErrorMessage(err.message));
  };

  const handleChange = (event) => {
    if (event.target.files !== null && event.target?.files?.length > 0) {
      handleUpload(event.target.files[0]);
    }
  };

  const handleDrop = (event) => {
    handleUpload(event.dataTransfer.files[0]);
  };

  return (
    <Box textAlign={"center"} sx={{ minHeight: 150 }}>
      {uploading ? (
          <Box m={2}><CircularProgress /></Box>
      ) : (
        <FileUpload
          onDrop={handleDrop}
          onChange={handleChange}
          accept={"image/*"}
        />
      )}
      <Divider sx={{ mb: 2}}/>
      <Typography variant={"h6"} component={"h4"}>
        Current images
      </Typography>
      {loading ? (
          <Box m={2}><CircularProgress /></Box>
      ) : (
        <Box mt={2}>
          <MediaFileList mediaFiles={mediaFiles} />{" "}
        </Box>
      )}
    </Box>
  );
}
