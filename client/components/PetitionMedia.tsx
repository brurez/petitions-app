import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { MediaFile, usePetitionMediaFileLazyQuery } from "../generated/graphql";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { Upload } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { MediaFileList } from "./MediaFileList";

export default function PetitionMedia({
  onChange,
  initialData,
}: {
  onChange: (a: number[]) => void;
  initialData: MediaFile[];
}) {
  const [currentFile, setCurrentFile] = useState("");
  const [mediaFileIds, setMediaFileIds] = useState<number[]>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [petitionMediaFileQuery] = usePetitionMediaFileLazyQuery();
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleUpload = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", currentFile);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/petition/media_files`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUploading(false);
        const ids = [...mediaFileIds, data.media_file_id];
        setMediaFileIds(ids);
        onChange(ids);
        setLoading(true);
        getImages(ids)
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) setCurrentFile(e.target.files[0]);
  };

  return (
    <Box>
      <TextField
        hidden
        margin="normal"
        fullWidth
        name="mediaFile"
        type="file"
        id="mediaFile"
        autoComplete="mediaFile"
        data-testid="mediaFile"
        onChange={handleChange}
      />
      <LoadingButton
        variant={"outlined"}
        fullWidth
        onClick={handleUpload}
        sx={{ minWidth: 120 }}
        loading={uploading}
        endIcon={<Upload />}
      >
        Upload File
      </LoadingButton>
      {loading ? (
        <CircularProgress />
      ) : (
        <MediaFileList mediaFiles={mediaFiles} />
      )}
    </Box>
  );
}
