import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentRole } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const admin = await currentRole();

      if (admin !== "ADMIN") throw new Error("Unauthorized");

      return { user: admin };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("file url", file.url);

      return { imgUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
