import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { AUTH_FIREBASE, STORAGE_FIREBASE } from './configure.firebase';
import { apiLoading, responseBadApi, responseGoodApi } from './helper.api';
import { deleteImgFromApi, getAvatarURL_IMG } from './apiImg';

export const createUserAuth = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(AUTH_FIREBASE, email, password);
    console.log('создано')
    return responseGoodApi(response.user)
  } catch(e){
    console.log(e)
    return responseBadApi(e.code)
  }
};
const signOutUser_API = async () => {
  try{
    await signOut(AUTH_FIREBASE);
    return responseGoodApi();
  }catch(e){
    return responseBadApi(e.code)
  }
}
 const loginUserApi_API = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(AUTH_FIREBASE, email, password);
    
    return responseGoodApi(response.user);
  } catch (e) {
    return responseBadApi(e.code);
  }
};
//!
const updatePhotoUserAvatarFirebase = async (file, uid) =>{
  try{
    const url = `${uid}/avatar`;
    if(file === null) {
      await deleteImgFromApi(url);
      return responseGoodApi(null);
    }else{
      const imgRef = ref(STORAGE_FIREBASE, url);
      await uploadBytesResumable(imgRef, file);
      return responseGoodApi(getAvatarURL_IMG(uid));
    }
  }catch(e){
    console.log(e)
  }
}

//!
export const updateUserProfile_AUTH = async ({userName, photoFile, uid}) =>{
  try{
    const response = await updatePhotoUserAvatarFirebase(photoFile, uid); 
   const avatar = response.data;
    await updateProfile(AUTH_FIREBASE.currentUser, {displayName: userName, photoURL: avatar || ''});
    return responseGoodApi({name: userName, avatar: avatar});
  }catch(e){
    return responseBadApi(e.code);
  }
}
export const updateUserProfileName_AUTH = async ({userName}) =>{
  try{
    await updateProfile(AUTH_FIREBASE.currentUser, {displayName: userName});
    return responseGoodApi({name: userName});
  }catch(e){
    return responseBadApi(e.code);
  }
}



export const loginUserApi = apiLoading(loginUserApi_API);
export const signOutUser = apiLoading(signOutUser_API);
export const updateUserProfile = apiLoading(updateUserProfile_AUTH);