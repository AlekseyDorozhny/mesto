export class UserInfo {
  constructor(userName, userActivity) {
    this.userName = userName;
    this.userActivity = userActivity;
  };

  getUserInfo() {
    const name = this.userName.textContent;
    const activity = this.userActivity.textContent;
    const userInfo = {name, activity}
    return userInfo
  };

  setUserInfo({name, activity}) {
    this.userName.textContent = name;
    this.userActivity.textContent = activity;
  };
}
