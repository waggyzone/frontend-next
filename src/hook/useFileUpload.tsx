//@ts-check
import { useState } from "react";
import tus from "tus-js-client";

export const useFileUpload = (file: File) => {
  const [progress, setProgress] = useState(0);
  const upload = new tus.Upload(file, {
    endpoint: process.env.NEXT_PUBLIC_API_UR?.concat("/file/upload"),
    retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
      filename: file?.name,
      filetype: file?.type,
    },
    onError: function (error) {
      console.log("Failed because: " + error);
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log(bytesUploaded, bytesTotal, percentage + "%");
    },
    onSuccess: function () {
      console.log("Download %s from %s", upload.file.name, upload.url);
    },
  });

  upload.findPreviousUploads().then(function (previousUploads) {
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    upload.start();
  });
};
