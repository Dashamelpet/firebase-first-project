import { LoadingContext, loadingContextCustom } from "./loadingContext";

export const LoadingProvider = ({children}) =>{
    const store = loadingContextCustom();
    return(
        <LoadingContext.Provider value={store}>
            {children}
        </LoadingContext.Provider>
    );
}