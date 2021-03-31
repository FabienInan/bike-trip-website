import { POST, TIMEOUT, jsonHeaders, urlPrefix } from "./constants";

let isAdmin = false;

export const postLogin = (login, pwd)  => {
    const requestOptions = {
        method: POST,
        headers: jsonHeaders,
        body: JSON.stringify({ login, pwd})
    };
    return fetch(`${urlPrefix}/isAdmin`, requestOptions, TIMEOUT).then(response => response.json());
}

export const getIsAdmin = () => isAdmin;

export const setIsAdmin = (value) => isAdmin = value;