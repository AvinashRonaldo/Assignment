import CloudStorage from "../providers/cloudStorage";
import {storageBucket} from "../providers/locals";

const storageBuck = CloudStorage.bucket(storageBucket);
/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

export const uploadImage = (file,username) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const blob = storageBuck.file(
      `${username}-${timestamp}-${originalname.replace(/ /g, "_")}`
    );
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${
          storageBuck.name
        }${blob.name}`;
        console.log(publicUrl);
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
