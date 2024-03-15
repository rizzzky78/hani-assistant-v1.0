/**
 * @type { import("../types").Session }
 */
const session = {
  sessionName: "DEVELOPER", //halal-mart-bc-cilacap-3 #origin
  userAgent: "Halal-Mart-Cilacap-3",
  autoReadMessages: true,
};

/**
 * @type { import("../types").MongoDBConfig }
 */
const mongoConfig = {
  //
  uri: `mongodb+srv://rizzzky:H6Pb3rN9GbocoDfY@bot-database.w7oyxwa.mongodb.net/?retryWrites=true&w=majority`, // jgn idubah
  databaseName: process.env.DB_NAME, // jgn diubah
  collection: {
    main: {
      customer: "Data-Customer-2023",
      products: "Data-Products",
      images: "Data-Images",
    },
    orderData: {
      customerOrderData: "Order-Data-Customer",
      approvalOrderData: "Order-Data-Approval",
    },
    payment: {
      transactionTracker: "Data-Transaction",
      customerPaymentProof: "Data-Customer-PaymentProof",
    },
    customerRegardsData: "Data-Regards",
  },
};

/**
 * @type { import("../types").Metadata }
 */
const metadata = {
  marketPlaceName: "Halal Mart BC Cilacap 3",
  organizationName: "HNI HPAI",
  superAdmin: {
    userName: "Rizky",
    phoneNumber: "6281329585825",
    phoneId: process.env.SUPER_ADMIN_ID, //"6281329585825@s.whatsapp.net",
  },
  adminData: [
    {
      name: "Rizky 3",
      phoneNumber: "62822281798830",
      phoneId: "6281329585825@.whatsapp.net",
      position: "Owner Chatbot Commerce",
    },
    {
      name: "Rizky 2",
      phoneId: "6281329585825@.whatsapp.net",
      phoneNumber: "6281329585825",
      position: "Developer Chatbot",
    },
    {
      name: "Rizky 1",
      phoneId: "6281329585825@.whatsapp.net",
      phoneNumber: "6281329585825",
      position: "Another Role",
    },
  ],
  paymentPlatform: [
    {
      provider: "GOPAY",
      key: "08123456789",
      name: "Wumbo",
    },
    {
      provider: "SHOPEEPAY",
      key: "08123456789",
      name: "Wumbo",
    },
    {
      provider: "BRI",
      key: "123456789",
      name: "Wumbo",
    },
    {
      provider: "BSI",
      key: "123456789",
      name: "Wumbo",
    },
  ],
};

module.exports = { session, mongoConfig, metadata };
//
