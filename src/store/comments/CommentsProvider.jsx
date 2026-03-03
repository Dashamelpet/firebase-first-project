import { CommentsContext, commentsContextCustom } from "./commentsContext";


export const CommentsProvider = ({children}) =>{
    const store = commentsContextCustom();
    return(
        <CommentsContext.Provider value={store}>
            {children}
        </CommentsContext.Provider>
    ) 
}