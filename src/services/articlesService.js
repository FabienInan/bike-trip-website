import { DELETE, GET, POST, TIMEOUT, jsonHeaders, urlPrefix } from "./constants";

export const saveArticle = (title, instagramId, content, language) => {
    const data = {
        [language]: {
            title,
            instagramId,
            content
        }
    }
    const requestOptions = {
        method: POST,
        headers: jsonHeaders,
        body: JSON.stringify({ data, date: new Date()})
    };
    return fetch(`${urlPrefix}/saveArticle`, requestOptions, TIMEOUT).then(response => response.json());
}

export const updateArticle = (title, instagramId, content, language, articleId) => {
    const data = {
        [language]: {
            title,
            instagramId,
            content
        }
    }
    const requestOptions = {
        method: POST,
        headers: jsonHeaders,
        body: JSON.stringify({ data, articleId, date: new Date()})
    };
    return fetch(`${urlPrefix}/updateArticle`, requestOptions, TIMEOUT).then(response => response.json());
}

export const deleteArticle = (id) => {
    const requestOptions = {
        method: DELETE,
        headers: jsonHeaders,
        body: JSON.stringify({id})
    };
    return fetch(`${urlPrefix}/deleteArticle`, requestOptions, TIMEOUT).then(response => response.json());
}

export const getArticles = () => {
    const requestOptions = {
        method: GET,
        headers: jsonHeaders
    };
    return fetch(`${urlPrefix}/getArticles`, requestOptions, TIMEOUT).then(response => response.json());
}