import { store } from "../store/store"

export const responseBadApi = (code) => {
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