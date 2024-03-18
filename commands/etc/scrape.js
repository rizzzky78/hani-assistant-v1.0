const { commonMessage } = require("@config/messages");
const { Tools } = require("@function/tools");
const { captureScreenshots } = require("@libs/utils/http");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["scrape"],
  callback: async ({ msg, client, fullArgs }) => {
    const chunk = Tools.arrayModifier("n", fullArgs.split("#"));
    if (!chunk) {
      return msg.reply("NO-DATA");
    }
    if (chunk && chunk.length > 0) {
      client
        .sendMessage(msg.from, {
          text: commonMessage("waitMessage"),
        })
        .then(async () => {
          await captureScreenshots(chunk)
            .then((pdf) => {
              return client.sendMessage(msg.from, {
                document: pdf,
                fileName: "Data Hasil Scrape",
                mimetype: "application/pdf",
              });
            })
            .catch((e) => {
              console.error(e);
              return msg.reply("ERROR!" + new Error(e));
            });
        });
    }
  },
};
