const { commonMessage, moderationMessage } = require("@config/messages");
const { Moderation } = require("@controllers/admin");
const { AdminInterface } = require("@function/distributor-data");
const { Validation, Tools, PDF } = require("@function/tools");
const logger = require("@libs/utils/logger");
const { superAdmin, adminData } = require("@config/settings").metadata;

/**
 * @memberof Admin
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["listtransaksi"],
  category: "admin",
  permission: "admin",
  typeArgs: "none",
  expectedArgs: "none",
  exampleArgs: "-",
  description: `Melihat daftar keseluruhan data transaksi pembayaran Customer dalam bentuk PDF.`,
  callback: async ({ msg, client, args }) => {
    const isAdmin = Validation.validateAdmin(msg.senderNumber, {
      superAdmin,
      adminData,
    });
    if (!isAdmin) {
      return msg.reply(commonMessage("unauthorizedForAdminOnly"));
    } else {
      client
        .sendMessage(msg.from, {
          text: commonMessage("waitMessage"),
        })
        .then(async () => {
          await Moderation.getBatchCustomerPaymentProof()
            .then(async (paymentData) => {
              if (!paymentData || paymentData.length === 0) {
                return msg.reply(
                  moderationMessage("notification_NoTransactionsExist")
                );
              } else {
                await PDF.createPDF({
                  document: PDF.mapInputData({
                    data: { payments: paymentData },
                    type: "payments",
                  }),
                }).then(({ doc }) => {
                  return client.sendMessage(msg.from, {
                    document: doc,
                    fileName: `Daftar Bukti Pembayaran Customer`,
                    mimetype: "application/pdf",
                    caption: `Dicetak pada tanggal: ${Tools.getDate()}`,
                  });
                });
              }
            })
            .catch((e) => {
              logger.error(e);
              console.error(e);
              return msg.reply(commonMessage("errorMessage"));
            });
        });
    }
  },
};
