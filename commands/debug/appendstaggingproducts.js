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
  aliases: ["code-stagging"],
  waitMessage: "Wait...",
  callback: async function ({ client, command, msg, args }) {
    const { data: products } = await Moderation.getAllProduct();
    writeFileSync(
      "./assets/json/static/stagging.products.json",
      JSON.stringify(products, null, 2)
    );
    return msg.reply("Success!");
  },
};
