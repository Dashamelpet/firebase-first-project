
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';

import { addPostToCurrentUser, changePostFromCurrentUser, deletePostFromCurrentUser, setCurrentUserPosts, store } from '../store';
import {
  createPostInDB,
  deleteOnePostFropDB,
  getOnePostFromDB,
  getOnePostFromDB_API,
  getPostsFromDB,
  updatePostFromDB_API,
} from '../../firebase/post/post';

import {
  addTopPostsForNew,
  getTopPostsFromDB,
  updateTopAuthor,
  updateTopLikesPostsDB,
} from '../../firebase/topPosts';
// import {  getCurrentUserPosts, store } from '../store';

const postOneTest = {
  avatar: 'url',
  date: 17929292929292, // UNIX
  like: 0,
  text: 'Hello',
};
//helper 
const sortAsc = (arr, key) =>{
  return arr.sort((a,b) => a[key] - b[key]);
}
export const PostsContext = createContext();

export const postsContextCustom = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [topNewPosts, setTopNewPosts] = useState([]);
  const [topLikesPosts, setTopLikesPosts] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [minForTop, setMinForTop] = useState({likes : 0, authors : 0});

  //! Top New

  const updateTopNewPosts = async ({ uid, id, name }) => {
    const response = await addTopPostsForNew({ uid, id, name });
    if (!response.ok) return 'error';
    setTopNewPosts(response.data);

  };

  const onUpdateNewTopPosts =  (data) =>{
    data.splice(14);
    setTopNewPosts(data);
  }
  const getNewTopPosts = async () => {
    const response = await getTopPostsFromDB('new');
    if (!response.ok) return 'error';

    onUpdateNewTopPosts(response.data);
  };

  //! top likes
  const onUpdateLikeTopPosts =  (data) =>{
    data.splice(14);
    setTopLikesPosts(data);
  }

  const getLikesTopPosts = async () => {
    const response = await getTopPostsFromDB('likes');
    if (!response.ok) return 'error';
    const sortedPosts = sortAsc(response.data, 'likes'); // sort по 0 - 9
    setMinForTop(prev => {
      return {...prev, likes: sortedPosts[0].likes}
    })
    // limit to show 15
    onUpdateLikeTopPosts(sortedPosts);
  };

  const updateTopLikesPosts = async ({ uid, id, name, countLikes }) => {
    if(minForTop.likes > countLikes) return;
    const responseLikes = await updateTopLikesPostsDB({ uid, id, name, countLikes });
    setTopLikesPosts(sortAsc(responseLikes.data, 'likes'));
  };

  //!top authors

  const getTopAuthors = async () => {
    const response = await getTopPostsFromDB('avtor');
    if (!response.ok) return 'error';
    const sortedAuthors = sortAsc(response.data, 'posts');
    // limit to show 15
    sortedAuthors.splice(15);
    setMinForTop(prev => {
      return {...prev, authors: sortedAuthors[0].posts}
    })
    setTopAuthors(sortedAuthors);
  };

  const onUpdateAutorsTop = async({uid,name}) => {
    const count = store.currentUserPosts.length;
    if(minForTop.authors > count) return;
    const responseAutors = await updateTopAuthor({uid, name, countPosts: count});
    if(!responseAutors.ok) return 'error'
    setTopAuthors(sortAsc(responseAutors.data,'posts'));
  }
  //! Post 

const deleteOnePost = async ({ uid, id, name }) => {
  const response = await deleteOnePostFropDB({ uid, id });
  if (!response.ok) return 'error';
  //! обновление в store
  deletePostFromCurrentUser(id);
  setTopNewPosts(response.topNewPosts);
  setTopLikesPosts(response.topLikesPosts);

  // сделать проверку на то что если автор и так не был в топе то и функцию удаления не запускать
  await onUpdateAutorsTop({uid, name})
};

const getCurrentPost = async (uid, id) => {
  const post = await getOnePostFromDB(uid, id);
  if (!post.ok) return 'error';
  return post.data;
};

const changeLiketoDB = async ({ uidURL, uidOwner, id, ownerName }) => {
  const response = await getOnePostFromDB_API(uidURL, id);
  if (!response.ok) return response;
  const likes = response.data.like;
  // ----
  const index = likes.indexOf(uidOwner);
  if (index === -1) likes.push(uidOwner);
  else likes.splice(index, 1);
  await updatePostFromDB_API({ uidURL, id, newPost: response.data });
  //!обновление в store
  changePostFromCurrentUser({id, newPost: response.data })
  updateTopLikesPosts({ uid: uidURL, id, name: ownerName, countLikes: likes.length });
  return response.data;
};


const createPost = async ({ uid, text, title, img, name }) => {
  const response = await createPostInDB({ uid, text, title, img });
  if (!response.ok) return false;
  addPostToPosts(response.data);
  addPostToCurrentUser(response.data); //!бновление в store

  await updateTopNewPosts({ uid, id: response.data.id, name });
  await onUpdateAutorsTop({uid, name})
  
  return response.data;
};

//posts
const addPostToPosts = (post) => {
  setUserPosts((prev) => [...prev, post]);
};

const getUserPosts = async (uid) => {
  try {
    const response = await getPostsFromDB(uid);
    if (!response.ok) return null;
    setUserPosts(response.data);
  } catch (e) {
    console.log(e);
  }
};

const getCurrentUserPosts = (posts) => {
  setUserPosts(posts);
}
return {
  userPosts,
    topNewPosts,
    topLikesPosts,
    topAuthors,

    createPost,
    addPostToPosts,
    getUserPosts,
    getCurrentPost,
    changeLiketoDB,
    getNewTopPosts,
    getLikesTopPosts,
    deleteOnePost,
    onUpdateAutorsTop,
    getTopAuthors,
    getCurrentUserPosts,
    onUpdateNewTopPosts,
    onUpdateLikeTopPosts,
  };
};
export const usePostsContext = () => useContext(PostsContext);
