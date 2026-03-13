import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { createCommentInDB, deleteAllCommentsFromDB, deleteOneCommentFromDB } from "../../firebase/comments";
import { DATA_DB_FIREBASE, DB_FIREBASE } from "../../firebase/configure.firebase";
import { createErrorNotification } from "../../firebase/helper.api";

export const CommentsContext = createContext();

export const commentsContextCustom = () =>{

const [commentsList, setCommentsList] = useState([]);


const createComment = async (data) =>{
// const createComment = async ({postAuthorUid,commentAuthorUid, text, postId, userName}) =>{
   const response =  await createCommentInDB(data)
   if(!response.ok) return response
   setCommentsList((prev) => [ response.data,...prev]);
}
const deleteComment = async(date, uid, id) =>{
    const response = await deleteOneCommentFromDB(date, uid, id);
    if(!response.ok) return createErrorNotification('Не удалось удалить файл')
    const i = commentsList.findIndex(item => item.date === date);
    const newComments = commentsList.filter((item, index) => index !== i);
    setCommentsList(newComments);
}
// const deleteAllComments = async({uid, id}) =>{
//     const response = await deleteAllCommentsFromDB({uid, id});
//     if(!response.ok) return createErrorNotification('Ошибка получения данных с сервера');
//     setCommentsList([]);
// }
const getCommentsList = async() =>{

}
return {
    commentsList,

    createComment,
    getCommentsList,
    setCommentsList,
    deleteComment,
    // deleteAllComments,
}
}

export const useCommentsContext = () => useContext(CommentsContext);