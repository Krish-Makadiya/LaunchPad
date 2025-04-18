import admin from "firebase-admin";
import { readFile } from 'fs/promises';
const serviceAccount = JSON.parse(
  await readFile(new URL('./launchpad-34d32-firebase-adminsdk-fbsvc-be84eba273.json', import.meta.url))
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;