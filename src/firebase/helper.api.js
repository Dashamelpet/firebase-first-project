import { Bounce, toast } from "react-toastify";
import { store } from "../store/store"

export const createErrorNotification = (text) => {
    toast.error(text || 'Error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        style: {
            background: "#5E548E",
            color: "#fff"
          }
        });
}

export const responseBadApi = (code) => {
    createErrorNotification(getTextErrorModal(code));
    return {ok : false, data : null, code}
}
export const responseGoodApi = (data) => {
    return {ok : true, data, code: null}
}
export const getTextErrorModal = (code)  => {
 switch(code){
    case 'auth/email-already-in-use': return "Пользователь уже зарегестрирован"
    case 'auth/invalid-credential': return "Ведите корректный пароль"
    case 'auth/invalid-email': return "Неверный email формат"
    case 'auth/user-not-found': return "Пользователь не найден"
    case 'auth/weak-password': return "Пароль слишком короткий"
    case 'inputs-is-empty': return "Заполните все данные"
 }
}

// loading

export const apiLoading = (callback) => async (...arg) => {
    store.startLoading()
    const response = await callback(...arg);
    store.stopLoading()
    return response
}

// id 

export function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * 15));
    }
    return result;
  }