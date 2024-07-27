import * as sdk from "node-appwrite"

export const {
    API_KEY,
    PROJECT_ID,
    DATABASE_ID,
    NEXT_PUBLIC_ENDPOINT,
    DOCTOR_COLLECTION_ID,
    PATIENT_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env

const client = new sdk.Client()
.setKey(API_KEY!)
.setProject(PROJECT_ID!)
.setEndpoint(NEXT_PUBLIC_ENDPOINT!)

export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);
export const databases = new sdk.Databases(client);
export const messaging = new sdk.Messaging(client);