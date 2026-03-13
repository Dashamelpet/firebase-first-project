
import { doc, onSnapshot } from "firebase/firestore";
import {DB_FIREBASE } from "../configure.firebase";
import { createErrorNotification, responseGoodApi } from "../helper.api";

export const getUpdateForLivePost = ({uid, id}, callback) => {
    const link = doc(DB_FIREBASE, 'users', uid, 'posts', id);
    const snapshot = onSnapshot(link, (snapshot) => {
        if(!snapshot.exists()) return
        const data = snapshot.data();
        if(!data) return createErrorNotification('Пост не найден')
        callback(data)
    })
    return snapshot
}
export const getUpdateForLiveTop = (topType,callback) => {
    const link = doc(DB_FIREBASE, 'posts', topType);
    const snapshot = onSnapshot(link, (snapshot) => {
        const data = snapshot.data();
        console.log(data)
        if(!data) return createErrorNotification('Ошибка при получении данных с сервера.')
        callback(data.data);
    })
    return snapshot
}
