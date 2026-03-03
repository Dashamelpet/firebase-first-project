import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { DB_FIREBASE } from './configure.firebase';
import { responseBadApi, responseGoodApi } from './helper.api';

const limitPosts = 20;
const limitAuthors = 20;

//general top posts
export const getTopPostsFromDB = async (type) => {
  try {
    const linkDoc = doc(DB_FIREBASE, 'posts', type);
    const response = await getDoc(linkDoc);
    const posts = response.data().data;
    return responseGoodApi(posts);
  } catch (e) {
    return responseBadApi(e.code);
  }
};
export const deleteTopPosts = async (id, type) => {
  try {
    const linkDoc = doc(DB_FIREBASE, 'posts', type);
    const response = await getDoc(linkDoc);
    const posts = response.data().data;
    const index = posts.findIndex((item) => item.id == id);
    index !== -1 && posts.splice(index, 1);
    await setDoc(linkDoc, { data: posts });
    return responseGoodApi(posts);
  } catch (e) {
    responseBadApi(e.code);
  }
};

// top new
export const addTopPostsForNew = async (post) => {
  // { uid, id, name}
  try {
    const linkDoc = doc(DB_FIREBASE, 'posts', 'new');
    const response = await getDoc(linkDoc);
    const posts = response.data().data;
    if (posts.length >= limitPosts) posts.pop();
    // самый первый елемент массива как самый новый
    posts.unshift(post);
    await setDoc(linkDoc, { data: posts });
    return responseGoodApi(posts);
  } catch (e) {
    return responseBadApi(e.code);
  }
};

//top likes
export const updateTopLikesPostsDB = async ({ uid, id, name, countLikes }) => {
  try {
    const linkDoc = doc(DB_FIREBASE, 'posts', 'likes');
    const response = await getDoc(linkDoc);
    const posts = response.data().data;
    const postForUpdate = posts.find((item) => item.id === id);
    const countPostsInTop = posts.length;
    const minCountLikes = Math.min(...posts.map((item) => item.likes));

    if (postForUpdate) postForUpdate.likes = countLikes;//проверка есть ли пост в топе
    else if (countPostsInTop < limitPosts) posts.push({ uid, id, name, likes: countLikes });//проверка свободного места в топе 
    else if (minCountLikes <= countLikes ){//проверка может ли заменить пост котого из топа
      const index = posts.findIndex((item) => item.likes === minValue);
      posts.splice(index, 1, { uid, id, name, likes: countLikes });
    }
    await updateDoc(linkDoc, { data: posts });
    return responseGoodApi(posts);
  } catch (e) {
    console.log(e);
    responseBadApi(e.code);
  }
};

//top author

export const updateTopAuthor = async ({ uid, name, countPosts }) => {
  try {
    const linkDoc = doc(DB_FIREBASE, 'posts', 'avtor');
    const response = await getDoc(linkDoc);
    const authors = response.data().data;
    const authorForUpdate = authors.find((item) => item.uid === uid);
    const countAuthorsInTop = authors.length;
    const minCountPosts = Math.min(...authors.map((item) => item.posts));

    if (authorForUpdate) authorForUpdate.posts = countPosts;//проверка есть ли пользователь в топе
    else if (countAuthorsInTop < limitAuthors) authors.push({ uid, name, posts: countPosts });//проверка свободного места в топе 
    else if (minCountPosts <= countPosts) { //проверка может ли заменить пользователь котого из топа
      const index = authors.findIndex((item) => item.posts === minCountPosts);
      authors.splice(index, 1, { uid, id, name, posts: countPosts });
    }
   
    await updateDoc(linkDoc, { data: authors });
    return responseGoodApi(authors);
  } catch (e) {
    responseBadApi(e.code);
  }
};

