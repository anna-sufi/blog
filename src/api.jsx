const responseHandler = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

class Api {
    constructor({path, token, id}) {
        this.path = path;
        this.token = token;
        this.id = id;
    }
    getPosts() {
        return fetch(`${this.path}/posts`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    getProfile() {
        return fetch(`${this.path}/users/me`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    saveProfileInfo(name, about) {
        return fetch(`${this.path}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
              })
        }).then(responseHandler);
    }

    saveProfileAvatar(avatar) {
        return fetch(`${this.path}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
              })
        }).then(responseHandler);
    }

    getPost(id) {
        return fetch(`${this.path}/posts/${id}`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    getPostComments(id) {
        return fetch(`${this.path}/posts//comments/${id}`, {
            
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    sendComment(id, text) {
        return fetch(`${this.path}/posts//comments/${id}`, {
            method: "post",
            headers: {
                authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                text: text
                
              })
        }).then(responseHandler);
    }

    delComment(id, commId) {
        return fetch(`${this.path}/posts/comments/${id}/${commId}`, {
            method: "delete",
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    delPost(id) {
        return fetch(`${this.path}/posts/${id}`, {
            method: "delete",
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    putLike(postId) {
        return fetch(`${this.path}/posts/likes/${postId}`, {
            method: "put",            
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    offLike(postId) {
        return fetch(`${this.path}/posts/likes/${postId}`, {
            method: "delete",            
            headers: {
                authorization: `Bearer ${this.token}`
            }
        }).then(responseHandler);
    }

    signIn(email, password) {
        return fetch(`${this.path}/signin`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
              })
        }).then(responseHandler);
    }


    sendPost(title, text, image, tags) {
        return fetch(`${this.path}/posts`, {
            method: "post",
            headers: {
                authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                text: text,
                image: image,
                tags: tags
              })
        }).then(responseHandler);
    }

    savePost(id, image, tags, title, text) {
        return fetch(`${this.path}/posts/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: image,
                tags: tags,
                title: title,
                text: text
              })
        }).then(responseHandler);
    }

}



const config = {
    path: 'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU1YTVmNTk0N2M3MjkyZDhjMjA0ZmEiLCJpYXQiOjE2NTA2OTAwNzcsImV4cCI6MTY4MjIyNjA3N30.457WDX1bH8a5JcpKXRglQjL-WH1akJoQWeuFRpFtbdw'
}

const api = new Api(config);

export default api;