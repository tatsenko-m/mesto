class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }, profileAvatarElement) {
    this._profileTitleSelector = profileTitleSelector;
    this._profileSubtitleSelector = profileSubtitleSelector;
    this._profileTitleElement = document.querySelector(this._profileTitleSelector);
    this._profileSubtitleElement = document.querySelector(this._profileSubtitleSelector);
    this._profileAvatarElement = profileAvatarElement;
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
    if (name) {
      this._profileTitleElement.textContent = name;
    }
    if (about) {
      this._profileSubtitleElement.textContent = about;
    }
  }

  setAvatar(avatar) {
    if (avatar) {
      this._profileAvatarElement.src = avatar;
    }
  }
}

export default UserInfo;
