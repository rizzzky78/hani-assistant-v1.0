const { commonMessage, moderationMessage } = require("@config/messages");
const { Moderation } = require("@controllers/admin");
const { Validation } = require("@function/tools");
const logger = require("@libs/utils/logger");
const {
  metadata: { superAdmin, adminData },
} = require("@config/settings");

/**
 * @memberof Admin
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["cek-pesanan"],
  category: "admin",
  permission: "admin",
  typeArgs: "query",
  expectedArgs: "<ORD-ID-XXX>",
  exampleArgs: "ORD-ID-123ABCD",
  description: "Melihat detail informasi pemesanan Customer.",
  callback: async ({ msg, client, args }) => {
    const isAdmin = Validation.validateAdmin(msg.senderNumber, {
      superAdmin,
      adminData,
    });
    if (!isAdmin) {
      return msg.reply(commonMessage("unauthorizedForAdminOnly"));
    } else {
      if (!args || args.length !== 1) {
        return msg.reply(moderationMessage("invalid_QueryOrderIdInput"));
      } else {
        client
          .sendMessage(msg.from, {
            text: commonMessage("waitMessage"),
          })
          .then(async () => {
            const [orderId] = args;
            await Moderation.validateCustomerOrder(orderId)
              .then(async (isValidOrderId) => {
                if (!isValidOrderId) {
                  return msg.reply(
                    moderationMessage("notFound_OrderId")(orderId)
                  );
                }
                await Moderation.getCustomerOrder(orderId).then(
                  async (orderData) => {
                    return client.sendMessage(msg.from, {
                      text: JSON.stringify(orderData, null, 2),
                    });
                  }
                );
              })
              .catch((e) => {
                logger.error(e);
                console.error(e);
                return msg.reply(commonMessage("errorMessage"));
              });
          });
      }
    }
  },
};
