import { GET, POST, TIMEOUT, jsonHeaders, urlPrefix } from "./constants";

export const saveComment = (comment, author) => {
    const data = {
        comment,
        author,
        date: new Date()
    }
    const requestOptions = {
        method: POST,
        headers: jsonHeaders,
        body: JSON.stringify({ data })
    };
    return fetch(`${urlPrefix}/saveComment`, requestOptions, TIMEOUT).then(response => response.json());
}

export const getComments = (articleId) => {
    const requestOptions = {
        method: GET,
        headers: jsonHeaders
    };
    return fetch(`${urlPrefix}/getComments/${articleId}`, requestOptions, TIMEOUT).then(response => response.json());
}