import * as dotenv from "dotenv";


dotenv.config();

export const port = process.env.PORT;
export const mongoDBURI = process.env.MONGODB_URI;
export const tokenSecret = process.env.JWT_TOKEN_SECRET;
export const storageBucket = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;
export const storageKeyPath = process.env.GOOGLE_CLOUD_STORAGE_KEY;
export const storageProjectId = process.env.GOOGLE_CLOUD_STORAGE_PROJECTID;
export const clientId = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const redirectURIGoogleSSO = process.env.REDIRECT_URI;