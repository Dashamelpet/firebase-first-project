import { PostsContext, postsContextCustom } from "./postsContext"

export const PostsProvider = ({children}) =>{
    const store = postsContextCustom();
    return(
        <PostsContext.Provider value={store}>
            {children}
        </PostsContext.Provider>
    ) 
}