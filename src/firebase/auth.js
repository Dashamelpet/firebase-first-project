import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { AUTH_FIREBASE } from './configure.firebase';

export const createUserAuth = async (email, password) => {
  const response = await createUserWithEmailAndPassword(AUTH_FIREBASE, email, password);
  return response;
};
export const signOutUser = async () => await signOut(AUTH_FIREBASE);
