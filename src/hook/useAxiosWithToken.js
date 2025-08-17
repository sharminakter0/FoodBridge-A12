import axios from 'axios';
import { getAuth } from 'firebase/auth';

async function getAxiosWithFirebaseToken() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.warn('No Firebase user logged in');
    return null;
  }

  try {
    const token = await user.getIdToken(); // get fresh Firebase ID token

    const instance = axios.create({
      baseURL: 'https://food-donation-server-mu.vercel.app',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    return instance;
  } catch (error) {
    console.error('Failed to get Firebase token', error);
    return null;
  }
}

export default getAxiosWithFirebaseToken;
