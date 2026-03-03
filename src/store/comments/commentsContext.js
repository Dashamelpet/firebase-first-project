import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { createCommentInDB, deleteOneCommentFromDB } from "../../firebase/comments";

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
    if(!response.ok) return 'error';
    const i = commentsList.findIndex(item => item.date === date);
    const newComments = commentsList.filter((item, index) => index !== i);
    setCommentsList(newComments);
}

const getCommentsList = async() =>{

}
return {
    commentsList,

    createComment,
    getCommentsList,
    setCommentsList,
    deleteComment,
}
}

export const useCommentsContext = () => useContext(CommentsContext);