const myMessages = {
  loading: "Loading...",
  func: (arg1, arg2, arg3) => `String ${arg1}, ${arg2}, ${arg3}`,
};
/**
 *
 * @param { keyof myMessages } keys
 * @param  {...string} args
 */
const mapMessages = (keys, ...args) => {
  const state = typeof myMessages[keys] === "string";
  return state ? myMessages[keys] : myMessages[keys](...args);
};

const msgFunc = mapMessages("func", "Names", "Wumbo", "Patrick", "more");
const msgStr = mapMessages("loading");

console.log(msgFunc);
console.log(msgStr);
