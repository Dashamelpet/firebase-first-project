import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AUTH_FIREBASE } from './configure.firebase';
import { responseBadApi, responseGoodApi } from './helper.api';

export const createUserAuth = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(AUTH_FIREBASE, email, password);
    return responseGoodApi(response.user)
  } catch(e){
    return responseBadApi(e.code)
  }
};
//!!!
export const signOutUser = async () => {
  try{
    const res = await signOut(AUTH_FIREBASE);
    return responseGoodApi(null)
  }catch(e){
    return responseBadApi(e.code)
  }
}

export const loginUserApi = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(AUTH_FIREBASE, email, password);
    console.log(response)
    return responseGoodApi(response.user)
  } catch (e) {
    console.log(e)
    return responseBadApi(e.code)
  }
};