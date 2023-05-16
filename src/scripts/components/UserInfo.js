export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileDescription = document.querySelector(configInfo.profileDescriptionSelector)
  };

  getUserInfo() {
    return {name: this._profileName.textContent, description: this._profileDescription.textContent};
  };

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.description;
  }
};