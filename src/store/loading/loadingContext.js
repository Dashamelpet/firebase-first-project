import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { getLoadingContext } from "../store";

export const  LoadingContext = createContext();

export const loadingContextCustom = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getLoadingContext({startLoading, stopLoading})
    }, [])

    const startLoading = () => {setIsLoading(true);};
    const stopLoading = () => {setIsLoading(false);}
    return {
        isLoading,

        startLoading,
        stopLoading,
    }
}

export const useLoadingContext = () => useContext(LoadingContext);