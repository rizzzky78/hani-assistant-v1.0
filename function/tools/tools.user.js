class User {
  constructor() {
    this.startAutoDeleteTimer();
    /**
     * @type { Array<{ timeStamp: string; phoneNumber: string }> }
     */
    this.userState = [];
    /**
     * @type { string }
     */
    this.statePath = "./assets/json/user/customer-state.json";
    /**
     * @type { number }
     */
    this.checkInterval = 1 * 60 * 60 * 1000; // Two hours in milliseconds
  }

  /**
   * Append checking user/accessor, if exist it will return `true`,
   * if not it will append user data into JSON and return `false`
   * @param { string } phoneNumber
   * @returns { boolean }
   */
  checkUser(phoneNumber) {
    const { writeFileSync } = require("fs");
    const logUser = {
      timeStamp: new Date().toISOString(),
      phoneNumber,
    };
    this.loadUserState();

    const isExist = this.userState.some((u) => u.phoneNumber === phoneNumber);
    if (isExist) {
      return true;
    } else {
      this.userState.push(logUser);
      writeFileSync(this.statePath, JSON.stringify(this.userState, null, 2));
      return false;
    }
  }

  loadUserState() {
    const { readFileSync } = require("fs");
    try {
      const userStateData = readFileSync(this.statePath, "utf-8");
      this.userState = JSON.parse(userStateData);
    } catch (error) {
      // Handle file not found or other errors
      this.userState = [];
    }
  }

  startAutoDeleteTimer() {
    setInterval(() => {
      const currentTime = new Date().getTime();
      this.userState = this.userState.filter((user) => {
        const userTime = new Date(user.timeStamp).getTime();
        return currentTime - userTime <= this.checkInterval;
      });
      const { writeFileSync } = require("fs");
      writeFileSync(this.statePath, JSON.stringify(this.userState, null, 2));
    }, this.checkInterval);
  }
}

const UserInstance = new User();

module.exports = UserInstance;
