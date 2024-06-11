import {useEffect, useState} from "react";
import {doRequest} from "../util/request";

function useFetch(requestPath, requestObject) {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchMessages = async () => {
            const data = await doRequest(requestPath, requestObject);
            setData(data);
        };
        fetchMessages().catch((error) => console.log(error));
    }, []);
    return [data, setData];
}

export default useFetch;