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

    getPost(id) {
        return fetch(`${this.path}/posts/${id}`, {
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
}

const config = {
    path: 'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU1YTVmNTk0N2M3MjkyZDhjMjA0ZmEiLCJpYXQiOjE2NDk4NTU0NjMsImV4cCI6MTY4MTM5MTQ2M30.iWxNC587JOB0JGHpKXCDpJB8WsD2WVzJRxdcos1FV4w'
}

const api = new Api(config);

export default api;