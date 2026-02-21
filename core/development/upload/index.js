// upload/index.js
import { Storage } from "@google-cloud/storage";

import { nodes, routes } from "../../../data/index.js";

const BUCKET_NAME = "great-unknown.appspot.com"; // your bucket
const GCS_FOLDER = "cdn"; // subfolder in bucket

// Initialize GCS client
const storage = new Storage({ keyFilename: "json/service-account.json" });


/**
 * Upload a JSON object to a file in GCS
 * @param {string} fileName - the file name under GCS_FOLDER
 * @param {any} jsonData - JSON data to upload
 */
async function uploadJSON(fileName, jsonData) {
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(`${GCS_FOLDER}/${fileName}`);

    await file.save(JSON.stringify(jsonData, null, 2), {
      contentType: "application/json",
      resumable: false,
    });

    // console.log(
    //   `✅ ${fileName} uploaded and public at: https://storage.googleapis.com/${BUCKET_NAME}/${GCS_FOLDER}/${fileName}`
    // );
  } catch (err) {
    console.error(`❌ Upload failed for ${fileName}:`, err);
  }
}

await uploadJSON("nodes.json", JSON.stringify(nodes));
await uploadJSON("routes.json", JSON.stringify(routes));
