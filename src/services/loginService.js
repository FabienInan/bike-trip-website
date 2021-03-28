

let isAdmin = false;

export const postLogin = (login, pwd) => {
    return new Promise({data: {
        isAdmin: true
    }}).then(response => isAdmin = response.data.isAdmin);
}

export const getIsAdmin = () => isAdmin;