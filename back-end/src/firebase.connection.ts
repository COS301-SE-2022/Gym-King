const firebaseAdmin = require('firebase-admin');
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
export const storageRef = admin.storage().bucket(process.env.FIREBASE_DB_URL);
