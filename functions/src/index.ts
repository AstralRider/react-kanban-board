/* eslint-disable max-len */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

export const newUser = functions.auth.user().onCreate(async (user) => {
  const userData = {
    boardNames: {},
    email: user.email,
    name: user.displayName,
    uid: user.uid,
  };
  try {
    await admin.firestore().collection('users').doc(user.uid).set(userData);
    functions.logger.log('Created new user', user.uid, ':', user.displayName);
  } catch (error) {
    functions.logger.error('There has been an error');
    console.error('Error adding new user document:', error);
  }
});
