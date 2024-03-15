const { MongoClient, ServerApiVersion } = require("mongodb");
const { uri } = require("@config/settings").mongoConfig;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = { client };
