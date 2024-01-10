const mongoose = require("mongoose");
const { logger } = require("../utils");

// mongoose.Promise = global.Promise;

// const MONGODB_URI = `mongodb://${username}:${password}@${host}:${port}/${databaseName}`;
// const MONGODB_URI = 'mongodb://root:myMongoHuyen@127.0.0.1:27107/test';

const options = {
  maxPoolSize: 10,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  authSource: "admin",
  user: "root",
  pass: "myMongoHuyen",
};

if (!process.env.MONGODB_URI) {
  logger.error("Please set MONGO_URI");
  process.exit(-1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log("Successfully connected to Mongo DB");
  } catch (error) {
    console.log(error);
  }
})();

// mongoose.connect(process.env.MONGODB_URI, {
//   auth: {
//     user: 'root',
//     password: 'myMongoHuyen',
//   },
//   options,
// });

mongoose.connection.on("connected", () => {
  logger.info("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB connection error:", err);
  process.exit(-1);
});

mongoose.connection.on("disconnected", () => {
  logger.error("MongoDB disconnected");
});

module.exports = mongoose;
