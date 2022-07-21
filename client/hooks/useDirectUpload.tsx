import { DirectUpload } from "@rails/activestorage";
import { useMemo } from "react";

export default function useDirectUpload() {
  function upload(file, url) {
    const uploadClient = new DirectUpload(file, url);
    uploadClient.create((error, blob) => {
      console.log(error, blob);
    });
  }

  return { upload }
}
