// import { getPostsFromDB,  } from "../firebase/post/post";

import { getAllUsersFromDB, updateNameUserToDB } from '../firebase/userNames';
import { setLoading } from '../redux/loading.provider';

export const store = {
  isLogin: false,//!
  currentUser: {},
  currentUserPosts: [],
  allUsers: [],

  startLoading: () => {},
  stopLoading: () => {},
};


//loading

export const setStoreLoading = (startLoading, stopLoading) =>{
  store.startLoading = startLoading;
  store.stopLoading = stopLoading;
}

export const setCurrentUser = (user) => {
  store.currentUser = user;
};


export const setCurrentUserPosts = (posts) => {
  store.currentUserPosts = posts;
};

export const deletePostFromCurrentUser = (id) => {
  store.currentUserPosts = store.currentUserPosts.filter((item) => item.id !== id);
};
export const addPostToCurrentUser = (post) => {
  store.currentUserPosts = [...store.currentUserPosts, post];
};
export const changePostFromCurrentUser = ({ id, newPost }) => {
  const index = store.currentUserPosts.findIndex((item) => item.id === id);
  if (index === -1) return;
  store.currentUserPosts[index] = newPost;
};

export const deleteAllPostsFromCurrentUser = () => {
  store.currentUserPosts = [];
};


// allUsers

export const setAllUsers = async () => {
  const response = await getAllUsersFromDB();
  if (response.ok) {
    store.allUsers = response.data;
  }
};
export const addUserToAllUsers = async({name, uid}) =>{
    const response = addUserToDB({name, uid});
    if(response.ok) store.allUsers = [...store.allUsers, response.data];
}
export const deleteCurrentUserFromAll = (uid) => {
  store.allUsers = store.allUsers.filter(item => !item.includes(uid));
}

export const updateStoreNameUser = async({newName ,uid}) => {
    const response = await updateNameUserToDB(newName ,uid);
    if(response.ok) {
        const index = store.allUsers.findIndex(item => item.includes(uid));
        store.allUsers[index] = response.data
    }
}

window.store = store;
