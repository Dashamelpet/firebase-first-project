import { doc, setDoc, getDoc, getDocs, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { DB_FIREBASE, STORAGE_FIREBASE } from '../configure.firebase';
import { apiLoading, generateRandomString, responseBadApi, responseGoodApi } from '../helper.api';
import { addImgToApi, deleteImgFromApi } from '../apiImg';
import { deleteTopPosts } from '../topPosts';
import { setCurrentUserPosts } from '../../store/store';
import { deleteAllCommentsFromDB } from '../comments';
 
// export const apiLoading = (callback) => async (...arg) => {
//   store.startLoading()
//   const response = await callback(...arg);
//   store.stopLoading()
//   return response
// }

//helper
const postOneTest = {
  avatar: 'url',
  date: 17929292929292, // UNIX
  like: 0,
  text: 'Hello',
};

const createDataForPost = (text, title) => {
  return {
    date: Date.now(),
    like: [],
    text: text,
    title: title,

  };
};

//api
const createPostInDB_API = async ({ uid, text, title, img }) => {
  try {
    const id = generateRandomString();
    const responseImg = await addImgToApi({ uid, img, id });
    if (!responseImg.ok) return responseImg;
    const data = createDataForPost(text, title);
    const linkDoc = doc(DB_FIREBASE, 'users', uid, 'posts', id);
    data.id = id;
    await setDoc(linkDoc, data);
    return responseGoodApi(data);
  } catch (e) {
    return responseBadApi(e.code);
  }
};

export const getOnePostFromDB_API = async (uid, id) => {
  try {
    const linkDoc = doc(DB_FIREBASE, 'users', uid, 'posts', id);
    const response = await getDoc(linkDoc);
    const post = {
      id: response.id,
      ...response.data(),
    };
    return responseGoodApi(post);
  } catch (e) {
    return responseBadApi(e.code);
  }
};

export const getPostsFromDB_API = async (uid) => {
  try {
    const linkDoc = collection(DB_FIREBASE, 'users', uid, 'posts');
    const response = await getDocs(linkDoc);
    const posts = response.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
    return responseGoodApi(posts);
  } catch (e) {
    return responseBadApi(e.code);
  }
};
export const getMyPostsFromDB_API = async (uid) => {
  const response = await getPostsFromDB_API(uid)
  response.ok && setCurrentUserPosts(response.data);
}

const deleteOnePostFropDB_API = async ({ uid, id }) => {
  try {
    //удаляю картиинку
    const imgLink = uid + '/' + id;
    const responseImg = await deleteImgFromApi(imgLink);
    if (!responseImg.ok) return responseImg;
    //удаляю комментарии
    const responseComments = await deleteAllCommentsFromDB({uid, id});
    if(!responseComments.ok) return responseComments;
    //удаляю пост
    const linkDoc = doc(DB_FIREBASE, 'users', uid, 'posts', id);
    await deleteDoc(linkDoc);
    //обновляю топ
    const responseNew = await deleteTopPosts(id, 'new');
    if(!responseNew.ok) return responseNew;
    const responeLikes = await deleteTopPosts(id, 'likes');
    if(!responeLikes.ok) return responeLikes;
    return responseGoodApi({topLikesPosts:responeLikes.data, topNewPosts: responseNew.data});
  } catch (e) {
    return responseBadApi(e.code);
  }
};

export const updatePostFromDB_API = async ({ uidURL, id, newPost }) => {
  try {
    const linkDoc = doc(DB_FIREBASE, 'users', uidURL, 'posts', id);
    await updateDoc(linkDoc, newPost);
    return responseGoodApi();
  } catch (e) {
    return responseBadApi(e.code);
  }
};

export const deleteAllPostsFrom_DB = async(uid) => {
  try{
    const link = collection(DB_FIREBASE, 'users', uid, 'posts');
    const response = await getDocs(link);
    if(response.empty) return responseGoodApi();
    await Promise.all(response.docs.map(async(post) => {
      const postId = post.id;
      const responsePost = await deleteOnePostFropDB_API({uid, id: postId});
      if(!responsePost.ok) throw new Error(responsePost.code);
    }));
    return responseGoodApi();
  } catch(e){
    console.log(e);
    return responseBadApi(e.code)
  }
}

export const getPostsFromDB = getPostsFromDB_API;
// export const getPostsFromDB = apiLoading(getPostsFromDB_API);
export const createPostInDB = apiLoading(createPostInDB_API);
export const getOnePostFromDB = apiLoading(getOnePostFromDB_API);
export const deleteOnePostFropDB = apiLoading(deleteOnePostFropDB_API);
