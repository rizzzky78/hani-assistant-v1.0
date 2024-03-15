const { commonMessage } = require("@config/messages");
const { Moderation } = require("@controllers/admin");
const { Tools } = require("@function/tools");
const logger = require("@libs/utils/logger");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["bukti"],
  category: "customer",
  permission: "common",
  typeArgs: "query",
  expectedArgs: "<INV-ID-XXX>",
  exampleArgs: "INV-ID-123ABCDE",
  description: `Melihat detail pemesanan.`,
  callback: async ({ client, msg, args }) => {
    const [invoiceId] = Tools.arrayModifier("u", args);
    if (!invoiceId) {
      return msg.reply("Silahkan masukan ID Invoice pemesanan.");
    }
    client
      .sendMessage(msg.from, {
        text: commonMessage("waitMessage"),
      })
      .then(async () => {
        await Moderation.validateInvoiceId(invoiceId)
          .then(async (isInvoice) => {
            if (!isInvoice) {
              return msg.reply("ID Invoice tidak ditemukan!");
            } else {
              await Moderation.getOrdersDetails(invoiceId).then(
                (orderDetails) => {
                  const [orderData, paymentData, approvalData] = orderDetails;
                  client
                    .sendMessage(msg.from, {
                      text: JSON.stringify(
                        { message: "Order Data", data: orderData },
                        null,
                        2
                      ),
                    })
                    .then(
                      setTimeout(() => {
                        client
                          .sendMessage(msg.from, {
                            text: JSON.stringify(
                              { message: "Payment Data", data: paymentData },
                              null,
                              2
                            ),
                          })
                          .then(
                            setTimeout(() => {
                              return client.sendMessage(msg.from, {
                                text: JSON.stringify(
                                  {
                                    message: "Approval Data",
                                    data: approvalData,
                                  },
                                  null,
                                  2
                                ),
                              });
                            }, 3000)
                          );
                      }, 3000)
                    );
                }
              );
            }
          })
          .catch((e) => {
            logger.error(e);
            console.error(e);
            return msg.reply(commonMessage("errorMessage"));
          });
      });
  },
};
