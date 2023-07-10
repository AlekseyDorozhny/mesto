export class UserInfo {
  constructor(userName, userActivity, avatar) {
    this.userName = userName;
    this.userActivity = userActivity;
    this.avatar = avatar;
  };

  getUserInfo() {
    const name = this.userName.textContent;
    const activity = this.userActivity.textContent;
    const userInfo = {name, activity, avatar}
    return userInfo
  };

  setUserInfo({name, activity, avatar, _id}) {
    this.userName.textContent = name;
    this.userActivity.textContent = activity;
    this.avatar.style = `background-image: url(${avatar})`
    this._id = _id;
  };
}


