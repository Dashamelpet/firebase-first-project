import { collection, deleteDoc, doc, documentId, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore";
import { DB_FIREBASE } from "./configure.firebase";
import { generateRandomString, responseBadApi, responseGoodApi } from "./helper.api";

//helper
const createDataForComment = (commentAuthorUid, text, userName) => {
    return {
      text: text,
      authorID: commentAuthorUid,
      userName,
      // id: generateRandomString(),//просто для отображения
    };
  };

  //api
export const createCommentInDB = async({postAuthorUid,commentAuthorUid, text, postId, userName}) => {
    try{
        // const idComment = generateRandomString();
        const date = Date.now().toString();
        const data = createDataForComment(commentAuthorUid, text, userName);
        data.date = date;
        const linkDoc = doc(DB_FIREBASE, 'users', postAuthorUid, 'posts', postId, 'comments', date);
        await setDoc(linkDoc, data);
        return responseGoodApi(data);
    }catch(e){
        console.log(e)
        return responseBadApi(e.code);
    }
}
export const getCommentsDateFromDB = async({postAuthorUid, postId}) =>{
    try{
        const linkDoc = collection(DB_FIREBASE, 'users', postAuthorUid, 'posts', postId, 'comments');
        const q = query(
            linkDoc,
            orderBy(documentId(), 'desc'),
            // limit(20)
        )
        const response = await getDocs(q);
        const comments = response.docs.map((item) => {
            return {...item.data(), date : item.id}
        });
        return responseGoodApi(comments);
    }catch(e){
        console.log(e)
        return responseBadApi(e.code)
    }
}

export const deleteOneCommentFromDB = async(date, uid, id) =>{
    try{
        const linkDoc = doc(DB_FIREBASE, 'users', uid, 'posts', id, 'comments', date);
        await deleteDoc(linkDoc);
        return responseGoodApi()
    }catch(e){
        console.log(e.code)
        return responseBadApi(e.code)
    }
}