//@ts-check
import { useState } from "react";
import tus from "tus-js-client";

export const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("progress");

  const UploadFile = (file: File) => {
    const upload = new tus.Upload(file, {
      endpoint: process.env.NEXT_PUBLIC_API_UR?.concat("/file/upload"),
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file?.name,
        filetype: file?.type,
      },
      onError: function (error) {
        setStatus("error");
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setProgress(Number(percentage));
        setStatus("progress");
      },
      onSuccess: function () {
        setStatus("success");
      },
    });

    upload.findPreviousUploads().then(function (previousUploads) {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      upload.start();
    });
  };

  const result = { progress, status };
  return [result, UploadFile];
};
