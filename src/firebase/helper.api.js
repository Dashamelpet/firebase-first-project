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
 }
}