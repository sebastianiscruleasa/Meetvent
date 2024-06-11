import Messages from "../constants/messages";

export async function doRequest(requestPath, requestObject) {
    const response = await fetch(requestPath, requestObject);
    if (!response.ok) {
        throw new Error(Messages.networkErrorMessage);
    }
    return await response.json();
}
