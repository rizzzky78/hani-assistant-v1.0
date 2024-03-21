const { Moderation } = require("@controllers/admin");
const {
  collections: {
    customer,
    customerOrderData,
    customerPaymentProof,
    approvalOrderData,
    product,
  },
} = require("@database/router");
const { writeFileSync } = require("fs");

/**
 * @memberof Customer
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["code-stock"],
  waitMessage: "Wait...",
  callback: async function ({ client, command, msg, args }) {
    await product
      .updateMany(
        {},
        {
          $set: {
            data: {
              stock: 50,
              sold: 0,
            },
          },
        }
      )
      .then(({ modifiedCount }) => {
        return msg.reply(`Success modified ${modifiedCount} product!.`);
      });
  },
};
