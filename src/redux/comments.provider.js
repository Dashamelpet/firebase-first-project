import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCommentInDB, deleteOneCommentFromDB } from "../firebase/comments";
import { createErrorNotification } from "../firebase/helper.api";

const commentsSlice = createSlice({
    name: 'comments',
    initialState:{
        commentsList: []
    },
    reducers:{
        getCommentsList: (state, action) =>{
            state.commentsList = action.payload
        },
        addCommentToList: (state, action) =>{
            state.commentsList.push(action.payload)
        },
        deleteCommentFromList:(state, action) =>{
            const i = state.commentsList.findIndex(item => item.date === action.payload);
            const newComments = state.commentsList.filter((item, index) => index !== i);
            state.commentsList = newComments;
        }
    },
})

export default commentsSlice.reducer;
export const {getCommentsList, addCommentToList, deleteCommentFromList} = commentsSlice.actions


export const createComment = createAsyncThunk(
    'comments/createComment',
    async (data, {dispatch}) => {
        const response =  await createCommentInDB(data)
        if(response.ok)  {
            dispatch(addCommentToList(response.data))
        }
        
        return response
    }
);
export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (data, {dispatch}) =>{
        const response = await deleteOneCommentFromDB(data.date, data.uid, data.id);
        if(!response.ok) return createErrorNotification('Не удалось удалить файл');
        dispatch(deleteCommentFromList(data.date));
    }
)