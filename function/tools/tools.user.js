const {
  collections: { userState },
} = require("@database/router");
const { Collection } = require("mongodb");
const { writeFileSync, readFileSync } = require("fs");

class User {
  constructor() {
    this.startAutoDeleteTimer();
    /**
     * @type { Array<import("@interface/schema").UserState> }
     */
    this.userState = [];
    /**
     * @type { string }
     */
    this.statePath = "./assets/json/user/customer-state.json";
    /**
     * @type { number }
     */
    this.checkInterval = 2 * 60 * 60 * 1000; // Two hours in milliseconds
    /**
     * @type { Collection<import("@interface/schema").UserState> }
     */
    this.userStateCollection = userState;
  }

  /**
   * Append checking user/accessor, if exist it will return `true`,
   * if not it will append user data into JSON and return `false`
   * @param { string } phoneNumber
   * @returns { Promise<boolean> }
   */
  async checkUser(phoneNumber) {
    const logUser = {
      timeStamp: new Date().toISOString(),
      phoneNumber,
    };
    await this.loadUserState();

    try {
      const isExistingUser = this.userState.some(
        (u) => u.phoneNumber === phoneNumber
      );
      if (isExistingUser) {
        return true;
      } else {
        await this.userStateCollection.insertOne(logUser);
        return false;
      }
    } catch {
      const isExist = this.userState.some((u) => u.phoneNumber === phoneNumber);
      if (isExist) {
        return true;
      } else {
        this.userState.push(logUser);
        writeFileSync(this.statePath, JSON.stringify(this.userState, null, 2));
        return false;
      }
    }
  }

  async loadUserState() {
    try {
      this.userState = await this.userStateCollection.find().toArray();
    } catch {
      // Handle file not found or other errors
      const userStateData = readFileSync(this.statePath, "utf-8");
      this.userState = JSON.parse(userStateData);
    }
  }

  startAutoDeleteTimer() {
    setInterval(async () => {
      const currentTime = new Date().getTime();
      try {
        await userState.deleteMany({
          timeStamp: { $lte: new Date(currentTime - this.checkInterval) },
        });
      } catch {
        const filtered = (this.userState = this.userState.filter((user) => {
          const userTime = new Date(user.timeStamp).getTime();
          return currentTime - userTime <= this.checkInterval;
        }));
        writeFileSync(this.statePath, JSON.stringify(filtered, null, 2));
      }
    }, this.checkInterval);
  }
}

const UserInstance = new User();

module.exports = UserInstance;
