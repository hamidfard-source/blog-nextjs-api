import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const fn = createUploadthing();

export const ourFileRouter = {
  imageUploader: fn({ image: { maxFileCount: 1} })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("File URL: ",file.ufsUrl);

    }),
}satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;