// upload/index.js
import { Storage } from "@google-cloud/storage";
import fs from "fs-extra";
import path from "path";

// ----------------- CONFIG -----------------
const BUCKET_NAME = "YOUR_BUCKET_NAME"; // replace with your bucket
const FILE_NAME = "routes.json"; // file name in GCS
const LOCAL_JSON_PATH = path.resolve("../../data/routes.json"); // path to your JSON
// ------------------------------------------

// Initialize GCS client
const storage = new Storage();

export async function uploadRoutes() {
  try {
    // Read JSON from local file
    const jsonData = await fs.readJSON(LOCAL_JSON_PATH);

    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    // Upload JSON to GCS
    await file.save(JSON.stringify(jsonData, null, 2), {
      contentType: "application/json",
      resumable: false,
    });

    // Make public
    await file.makePublic();

    console.log(
      `✅ JSON uploaded and public at: https://storage.googleapis.com/${BUCKET_NAME}/${FILE_NAME}`
    );
  } catch (err) {
    console.error("❌ Upload failed:", err);
  }
}
