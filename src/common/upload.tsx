import tus from "tus-js-client";
export const uploadFile = (file: File | Blob | Pick<ReadableStreamDefaultReader<any>, "read">) => {
  var upload = new tus.Upload(file, {
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

  // Check if there are any previous uploads to continue.
  upload.findPreviousUploads().then(function (previousUploads) {
    // Found previous uploads so we select the first one.
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }

    // Start the upload
    upload.start();
  });
};
