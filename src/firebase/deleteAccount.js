import { deleteAllPostsFromCurrentUser, deleteCurrentUserFromAll } from '../store/store';
import { createErrorNotification, responseBadApi, responseGoodApi } from './helper.api';
import { deleteAllPostsFrom_DB } from './post/post';
import { deleteImgFromApi_API } from './apiImg';
import { deleteUserFromTopAuthors } from './topPosts';
import { deleteUserAuth, signOutUser } from './auth';
import { useUserContext } from '../store/user/userContext';
import { deleteNameUserToDB } from './userNames';

export const deleteAccount = async ({ uid }) => {
  try{
    // remove posts, comments, posts from topNew, topLikes
    const responsePosts = await deleteAllPostsFrom_DB(uid);
    if (!responsePosts.ok) return responsePosts;
    console.log('posts deleted')
    // remove posts from store
    deleteAllPostsFromCurrentUser(); //!
    console.log('post store deleted')
    // remove avatar
    const responseImg = await deleteImgFromApi_API(`${uid}/avatar`);
    console.log(responseImg)
    if (!responseImg.ok) return responseImg;
    // remove user from top author
    console.log('image deleted')
    const responseAuthors = await deleteUserFromTopAuthors({uid});
    if (!responseAuthors.ok) return responseAuthors;
    console.log('top author deleted')
    // remove user from store
    deleteCurrentUserFromAll(uid); //!
    console.log('user store  deleted');
    //remove user from datastore
    const responseUserList = await deleteNameUserToDB(uid);
    if (!responseUserList.ok) return responseUserList;
    console.log('UserList  deleted');
    // remove user account
    const responseUser = await  deleteUserAuth();
    console.log('user deleted')
    if(!responseUser.ok) return responseUser;
    return responseGoodApi()
  } catch(e){
    console.log(e);
    return responseBadApi(e.code)
  }
};
