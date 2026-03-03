
import { doc, onSnapshot } from "firebase/firestore";
import {DB_FIREBASE } from "../configure.firebase";
import { responseGoodApi } from "../helper.api";

export const getUpdateForLivePost = ({uid, id}, callback) => {
    const link = doc(DB_FIREBASE, 'users', uid, 'posts', id);
    const snapshot = onSnapshot(link, (snapshot) => {
        const data = snapshot.data();
        callback(data)
    })
    return snapshot
}
export const getUpdateForLiveTopPosts = (topType,callback) => {
    const link = doc(DB_FIREBASE, 'posts', topType);
    const snapshot = onSnapshot(link, (snapshot) => {
        const data = snapshot.data();
        callback(data.data);
    })
    return snapshot
}