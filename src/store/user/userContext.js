import { onAuthStateChanged, updateEmail } from 'firebase/auth';
import { useEffect, useMemo } from 'react';
import { createContext, useContext, useState } from 'react';
import { getAvatarURL_IMG, onCommpressedImg } from '../../firebase/apiImg';
import { createUserAuth, loginUserApi, signOutUser, updateUserProfile, updateUserProfileName_AUTH, updateUserProfile_AUTH } from '../../firebase/auth';
import { AUTH_FIREBASE } from '../../firebase/configure.firebase';
import { getMyPostsFromDB_API, getPostsFromDB } from '../../firebase/post/post';
import { addUserToDB } from '../../firebase/userNames';
import { setAllUsers, setCurrentUser, setCurrentUserPosts, updateStoreNameUser } from '../store';
// import { getCurrentUser, store } from '../store';


export const UserContext = createContext();

const userModel = {
  email: '',
  uid: '',
  name: '',
  avatar: '',
};

export const useStoreUserContext = () => {
  const [user, setUser] = useState(null);
  const [isGetUser, setIsGetUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(AUTH_FIREBASE, async (currenUser) => {
      if (currenUser) {
        setUser({
          email: currenUser.email,
          uid: currenUser.uid,
          avatar: currenUser.photoURL || '',
          name: currenUser.displayName || '',
        });
        // currentUser в глобальный store
        setCurrentUser({email: currenUser.email,
          uid: currenUser.uid,
          avatar: currenUser.photoURL || '',
          name: currenUser.displayName || '',})
        //получение постов currentUser в store
        getMyPostsFromDB_API(currenUser.uid);
        // setCurrentUserPosts(response.data);

        // setCurrentUserPosts(currenUser.uid);
      } 
      setTimeout(() => {
        setIsGetUser(true);
      }, 500)
    });
    //добавление в store массив пользователей
    setAllUsers();
    
  }, []);

  const updateUserData = (data) => {
    setUser((prev) => {
      return {
        ...prev,
        email: data.email,
        uid: data.uid,
        avatar: data.photoURL || '',
        name: data.displayName || '',
      };
    });
  };

//!улучшить код
const updateNameUser = async ({userName, uid}) => {
    const response = await updateUserProfileName_AUTH({userName});
    if(!response.ok) return // Не удалось обновить профайл
    console.log('name update')
    setUser((prev) => {
      return {...prev, name: response.data.name}
    })
    updateStoreNameUser({newName:response.data.name ,uid});
  }

const updateFullDataUser = async ({userName, photoFile, uid}) => {
    const img = photoFile !== null ? await onCommpressedImg(photoFile) : null;
    const response = await updateUserProfile({userName, photoFile: img, uid});
    console.log('fulldata update')
    if(!response.ok) return // Не удалось обновить профайл
    setUser((prev) => {
      return {...prev, name: response.data.name, avatar: response.data.avatar}
    })
    updateStoreNameUser({newName:response.data.name ,uid});
}
  const onSignOut = async () => {
    await signOutUser();
    setUser(null);
  };
  const onCreateUser = async (email, password) => {
    const res = await createUserAuth(email, password);
    if (res.ok) {
      addUserToDB({uid: res.data.uid, name: 'user'})//добавление в store.allUser
      updateUserData(res.data);
      return { ok: true, code: null };
    } else {
      return { ok: false, code: res.code };
    }
  };
  const onSignUser = async (email, password) => {
    const res = await loginUserApi(email, password);
    if (res.ok) {
      updateUserData(res.data);
      return { ok: true, code: null };
    } else {
      return { ok: false, code: res.code };
    }
  };

  const isLogin = useMemo(() => (user ? true : false), [user]);

  return {
    user,
    isLogin,
    isGetUser,

    onSignOut,
    onCreateUser,
    onSignUser,
    updateNameUser,
    updateFullDataUser,
    updateUserData,
  };
};

export const useUserContext = () => useContext(UserContext);

