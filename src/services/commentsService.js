import { DELETE, GET, POST, TIMEOUT, jsonHeaders, urlPrefix } from "./constants";

export const saveComment = (comment, author, articleId) => {
    const data = {
        comment,
        author,
        articleId,
        date: new Date()
    }
    const requestOptions = {
        method: POST,
        headers: jsonHeaders,
        body: JSON.stringify({ data })
    };
    return fetch(`${urlPrefix}/saveComment`, requestOptions, TIMEOUT).then(response => response.json());
}

export const deleteComment = (id) => {
    const requestOptions = {
        method: DELETE,
        headers: jsonHeaders,
        body: JSON.stringify({id})
    };
    return fetch(`${urlPrefix}/deleteComment`, requestOptions, TIMEOUT).then(response => response.json());
}

export const getComments = (articleId) => {
    const requestOptions = {
        method: GET,
        headers: jsonHeaders
    };
    return fetch(`${urlPrefix}/getComments/${articleId}`, requestOptions, TIMEOUT).then(response => response.json());
}
