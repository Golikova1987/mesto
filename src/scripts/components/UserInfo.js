export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileDescription = document.querySelector(
      configInfo.profileDescriptionSelector
    );
    this._profileAvatar = document.querySelector(configInfo.profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
  }

  setUserInfo({ name, description, avatar }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
    this._profileAvatar.src = avatar;
  }

  setId(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }
}
