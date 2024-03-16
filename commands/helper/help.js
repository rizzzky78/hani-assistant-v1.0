const { Tools, PDF } = require("@function/tools");
const { cmdModules } = require("@libs/constants/command");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["deprecated"],
  category: "general",
  description: `Fitur pembantu Admin/Customer dalam menggunakan Chatbot.`,
  callback: async ({ msg, client, args, prefix }) => {
    const [selection] = Tools.arrayModifier("l", args);
    if (selection) {
      if (selection === "list") {
        const sections = [];
        for (const category in cmdModules) {
          sections.push({
            title: category.toUpperCase(),
            rows: cmdModules[category]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((v) => ({
                title: v.name.toUpperCase(),
                rowId: `/${v.name}`,
                description: v.description,
              })),
          });
        }
        return client.sendMessage(msg.from, {
          title: `List Kode Perintah Chatbot`,
          text: `Berikut adalah list kode perintah keseluruhan Chatbot yang tersedia beserta deskripsinya. Untuk mengakses cukup pilih kode perintah dan kirim balik kode perintah tersebut.`,
          footer: `Chatbot Marketplace\ncopyright@2024`,
          buttonText: "List Kode Perintah",
          sections,
        });
      }
      if (selection === "admin") {
        return client.sendMessage(msg.from, {
          text: "Soon will be added!",
        });
      }
      if (selection === "customer") {
        return client.sendMessage(msg.from, {
          text: "Soon will be added!",
        });
      }
      if (selection === "rekap") {
        /**
         * @type { Array<{ cmdKeys: string; category: "admin" | "customer" | "general"; permission: string; typeArgs: string; expectedArgs: string; exampleArgs: string description: string }> }
         */
        const instanceCmdModule = [];
        for (const mod in cmdModules) {
          cmdModules[mod]
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((v) =>
              instanceCmdModule.push({
                cmdKeys: v.name,
                category: v.category,
                permission: v.strict,
                typeArgs: v.typeArgs,
                expectedArgs: v.expectedArgs,
                exampleArgs: v.exampleArgs,
                description: v.description,
              })
            );
        }
        const { doc } = await PDF.createPDF({
          document: PDF.mapInputData({
            data: { cmdModules: instanceCmdModule },
            type: "cmdmodules",
          }),
        });
        return client.sendMessage(msg.from, {
          document: doc,
          fileName: `Daftar Kode Perintah Chatbot`,
          mimetype: "application/pdf",
          caption: `Berikut adalah daftar atau list keseluruhan kode perintah yang terdapat pada sistem Chatbot.`,
        });
      }
    }
    const text =
      `Hi ${msg.pushName}!\n\n` +
      `Berikut adalah daftar kode perintah untuk mengakses sub bantuan lainnya:\n` +
      `- */tutorial*\n` +
      `- */bantuan admin*\n` +
      `- */bantuan customer*\n` +
      `- */bantuan list*\n` +
      `- */bantuan rekap*\n\n` +
      `*Tutorial*, jika Kamu user baru Kamu dapat mengakses tutorial panduan cara pakai Chatbot dengan kode perintah ini.\n` +
      `*Bantuan Admin* untuk melihat tata cara penggunaan Chatbot untuk sisi Admin (moderator) meliputi manajemen produk, pemesanan, pembayaran, dan lainnya.\n` +
      `*Bantuan Customer* untuk melihat tata cara penggunaan Chatbot untuk sisi Customer, meliputi cara mengakses, pemesanan, pembayaran, hingga pengelolaan pemesanan.\n` +
      `*Bantuan List* untuk melihat keseluruhan list pesan perintah yang tersedia.\n` +
      `*Bantuan Rekap* untuk merekap dan melihat keseluruhan kode perintah beserta deskripsinya dalam bentuk PDF.\n`;

    return client.sendMessage(msg.from, {
      text,
      footer: `Chatbot Marketplace\ncopyright@2024`,
      templateButtons: [
        {
          index: 0,
          quickReplyButton: {
            displayText: "Bantuan Admin",
            id: "/bantuan admin",
          },
        },
        {
          index: 1,
          quickReplyButton: {
            displayText: "Bantuan Customer",
            id: "/bantuan customer",
          },
        },
        {
          index: 2,
          quickReplyButton: {
            displayText: "List Perintah",
            id: "/bantuan list",
          },
        },
      ],
      mentions: [msg.sender],
    });
  },
};
