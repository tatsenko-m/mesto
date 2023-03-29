class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector }) {
    this._profileTitleSelector = profileTitleSelector;
    this._profileSubtitleSelector = profileSubtitleSelector;
    this._profileAvatarSelector = profileAvatarSelector;
    this._profileTitleElement = document.querySelector(this._profileTitleSelector);
    this._profileSubtitleElement = document.querySelector(this._profileSubtitleSelector);
    this._profileAvatarElement = document.querySelector(this._profileAvatarSelector);
  }

  getUserInfo() {
    const currentUserInfo = {
      name: `${this._profileTitleElement.textContent}`,
      about: `${this._profileSubtitleElement.textContent}`,
      avatar: `${this._profileAvatarElement.src}`
    };
    return currentUserInfo;
  }

  setUserInfo(name, about) {
    this._profileTitleElement.textContent = name;
    this._profileSubtitleElement.textContent = about;
  }

  setAvatar(avatar) {
    this._profileAvatarElement.src = avatar;
  }
}

export default UserInfo;
