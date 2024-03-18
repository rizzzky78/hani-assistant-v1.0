const { commonMessage } = require("@config/messages");
const { Customer } = require("@controllers/customer");
const { CustomerInterface } = require("@function/distributor-data");
const logger = require("@libs/utils/logger");

/**
 * @memberof Customer
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["selesai", "sudah"],
  category: "customer",
  permission: "common",
  typeArgs: "none",
  expectedArgs: "none",
  exampleArgs: "-",
  description: `Mengambil form pemesanan produk untuk melakukan pemesanan.`,
  callback: async ({ client, msg }) => {
    client
      .sendMessage(msg.from, {
        text: commonMessage("waitMessage"),
      })
      .then(async () => {
        await Customer.validateByPhoneNumber(msg.senderNumber)
          .then(async (isCustomer) => {
            if (!isCustomer) {
              return msg.reply(commonMessage("notFound_CustomerHasNeverOrder"));
            }
            await Customer.validateExistingBuckets(msg.senderNumber).then(
              async (isBuckets) => {
                if (!isBuckets) {
                  return msg.reply(
                    commonMessage("notFound_CustomerHasEmptyBuckets")
                  );
                }
                await Customer.appendCustTakeAwayOrderFromBuckets(
                  msg.senderNumber
                ).then(async ({ status, orders }) => {
                  if (status === "failed") {
                    return msg.reply(commonMessage("errorMessage"));
                  }
                  client
                    .sendMessage(msh.from, {
                      text: JSON.stringify(
                        { message: "Orders Data", orders },
                        null,
                        2
                      ),
                    })
                    .then(
                      setTimeout(() => {
                        return client.sendMessage(msg.from, {
                          text: `konfirmasi-pembelian ${orders.data.orderId}`,
                        });
                      }, 3000)
                    );
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
  },
};
