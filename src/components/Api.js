class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // getInitialCards() {
  // }
}

export default Api;
