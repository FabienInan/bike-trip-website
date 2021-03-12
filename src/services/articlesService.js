import { POST, TIMEOUT, jsonHeaders, urlPrefix } from "./constants";

export const saveArticle = (content) => {
    const requestOptions = {
        method: POST,
        headers: jsonHeaders,
        body: JSON.stringify({ data: content, date: new Date()})
    };
    return fetch(`${urlPrefix}/saveArticle`, requestOptions, TIMEOUT)
        .then(response => response.json());
}