/**
 * @memberof Customer
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["test"],
  waitMessage: "Wait...",
  callback: async function ({ client, command, msg, args }) {
    const ids = msg.from;
    const cmds = command;
    return client.sendMessage(ids, {
      text: JSON.stringify({ ids, cmds }, null, 2),
    });
  },
};
