import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { DB_FIREBASE } from './configure.firebase';
import { responseBadApi, responseGoodApi } from './helper.api';

export const getAllUsersFromDB = async () => {
  try {
    const link = doc(DB_FIREBASE, 'usernames', 'list');
    const response = await getDoc(link);
    if (!response.exists()) return responseGoodApi();
    const users = response.data().data;
    return responseGoodApi(users);
  } catch (e) {
    console.log(e);
    return responseBadApi(e.code);
  }
};

export const addUserToDB = async ({ name, uid }) => {
  try {
    const link = doc(DB_FIREBASE, 'usernames', 'list');
    const response = await getDoc(link);
    const users = response.data().data;
    console.log(users);
    const isAdded = users.find((item) => item.uid === uid);
    if (!isAdded) {
      users.push(name + '---' + uid);
      await updateDoc(link, { data: users });
      return responseGoodApi(name + '---' + uid);
    }
    return responseGoodApi();
  } catch (e) {
    console.log(e);
    responseBadApi(e.code);
  }
};

export const updateNameUserToDB = async (newName ,uid) =>{
    try {
        const link = doc(DB_FIREBASE, 'usernames', 'list');
        const response = await getDoc(link);
        if(!response.exists()) return responseGoodApi()
        const users = response.data().data;
        const indexToUpdate = users.findIndex(item => item.includes(uid));
        if(indexToUpdate !== -1) users[indexToUpdate] = newName + '---' + uid;
        await updateDoc(link, { data: users });
        return responseGoodApi(newName + '---' + uid)
    }catch(e){
    console.log(e)
        return responseBadApi(e.code)
    }
}

export const deleteNameUserToDB = async(uid) =>{
  try {
    const link = doc(DB_FIREBASE, 'usernames', 'list');
    const response = await getDoc(link);
    if(!response.exists()) return responseGoodApi();
    const users = response.data().data;
    const indexToDelete = users.findIndex(item => item.includes(uid));
    if(indexToDelete === -1) return responseGoodApi();
    users.splice(indexToDelete, 1);
    await updateDoc(link, { data: users });
    return responseGoodApi();
  }catch(e){
    console.log(e);
    return responseBadApi(e.code)
  }
}