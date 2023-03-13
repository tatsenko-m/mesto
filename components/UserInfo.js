class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._profileTitleSelector = profileTitleSelector;
    this._profileSubtitleSelector = profileSubtitleSelector;
    this._profileTitleElement = document.querySelector(this._profileTitleSelector);
    this._profileSubtitleElement = document.querySelector(this._profileSubtitleSelector);
  }

  getUserInfo() {
    const currentUserInfo = {
      name: `${this._profileTitleElement.textContent}`,
      about: `${this._profileSubtitleElement.textContent}`
    };
    return currentUserInfo;
  }

  setUserInfo(name, about) {
    this._profileTitleElement.textContent = name;
    this._profileSubtitleElement.textContent = about;
  }
}

export default UserInfo;
