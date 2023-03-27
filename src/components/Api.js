class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }
}

export default Api;
