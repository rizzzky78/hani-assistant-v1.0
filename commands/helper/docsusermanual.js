const { commonMessage } = require("@config/messages");
const { readFileSync } = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["tutorial"],
  category: "general",
  description: `Mengirim User Manual Chatbot dalam bentuk PDF.`,
  callback: async ({ msg, client, args, prefix }) => {
    client
      .sendMessage(msg.from, {
        text: commonMessage("waitMessage"),
      })
      .then(() => {
        return client.sendMessage(msg.from, {
          document: readFileSync("./assets/temp/technical-docs.pdf"),
          fileName: "Technical Docs & User Manual Chatbot",
          mimetype: "application/pdf",
        });
      });
  },
};
