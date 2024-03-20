const { Tools, PDF } = require("@function/tools");
const { cmdModules } = require("@libs/constants/command");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["bantuan"],
  category: "customer",
  permission: "common",
  typeArgs: "none",
  expectedArgs: "none",
  exampleArgs: "-",
  description: `Fitur pembantu Admin/Customer dalam menggunakan Chatbot.`,
  callback: async ({ msg, client, args, prefix }) => {
    /**
     * @type { Array<{ key: string; expectedArgs: string; exampleArgs: string; description: string }> }
     */
    const instanceCmd = [];
    for (const modules in cmdModules) {
      cmdModules[modules]
        .filter((v) => v.category === "customer")
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((v) => {
          instanceCmd.push({
            key: v.name,
            expectedArgs: v.expectedArgs,
            exampleArgs: v.name + " " + v.exampleArgs,
            description: v.description,
          });
        });
    }
    const captionCmd = instanceCmd
      .map((v) => {
        const { key, expectedArgs, exampleArgs, description } = v;
        const captions =
          `Kata Kunci: *${key}*\n` +
          `Format Argumen: *${expectedArgs}*\n` +
          `Contoh Argumen: *${exampleArgs}*\n` +
          `Deskripsi: ${description}`;
        return captions;
      })
      .join("\n\n");
    const caption =
      `----- *List Kode Perintah dan Deskripsi*\n\n` +
      `${captionCmd}\n\n` +
      `> _${process.env.CHATBOT_NAME} - copyright@2024_`;
    return client.sendMessage(msg.from, {
      text: caption,
    });
  },
};
