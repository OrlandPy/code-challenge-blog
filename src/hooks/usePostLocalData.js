import { useState, useEffect } from "react";

function usePostLocalData() {
    const [posts, setPosts] = useState([]);


    const setValue = (value) => {
        localStorage.setItem("localPostData", JSON.stringify(value));
        setPosts(Array.isArray(value) ? Array.from(value) : [])
    }

    useEffect(() => {
        try {
            const localPostData = JSON.parse(localStorage.getItem("localPostData"));
            setPosts(Array.isArray(localPostData) ? Array.from(localPostData) : []);
        }
        catch(e){null}
    }, [])

    return [posts, setValue];
}

export default usePostLocalData;