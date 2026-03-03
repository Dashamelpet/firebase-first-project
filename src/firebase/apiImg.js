import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import { STORAGE_FIREBASE } from "./configure.firebase";
import { apiLoading,responseBadApi, responseGoodApi } from "./helper.api";
import imageCompression from 'browser-image-compression';

// helper 

export const getURL_IMG = (uid, id) => {
    return `https://firebasestorage.googleapis.com/v0/b/test-server-d4f45.firebasestorage.app/o/${uid}%2F${id}?alt=media&token=16b58118-cfe6-48fc-833e-32d4d5c7394a`
}
export const getAvatarURL_IMG = (uid) => {
    return `https://firebasestorage.googleapis.com/v0/b/test-server-d4f45.firebasestorage.app/o/${uid}%2Favatar?alt=media&token=16b58118-cfe6-48fc-833e-32d4d5c7394a`
}
export const onCommpressedImg = async (file) =>{
    const options = {
        maxSizeMB: .5,
        maxWidthOrHeight: 980,
        useWebWorker: true,
      }
    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
      } catch (e) {
        console.log(e);
    }
}

// api 

export const addImgToApi_API = async ({uid, img, id}) => {
try {
    const compressedImg = await onCommpressedImg(img);
    // if(!compressedImg.ok) return compressedImg;
    const link = uid + '/' + id;
    const linkRef = ref(STORAGE_FIREBASE, link);
    await uploadBytesResumable(linkRef, compressedImg);
    return responseGoodApi();
} catch(e){
    console.log(e)
    return responseBadApi(e.code);
}
}

const deleteImgFromApi_API = async (imgLink) =>{
    try{
        const link = ref(STORAGE_FIREBASE, imgLink);
        await deleteObject(link);
        return responseGoodApi()
    } catch(e){
        return responseBadApi(e.code)
    }
}


export const deleteImgFromApi = apiLoading(deleteImgFromApi_API);
export const addImgToApi = apiLoading(addImgToApi_API);


