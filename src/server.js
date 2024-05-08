const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const sequelize = require("./connections/database");

const init = async () => {
  const server = Hapi.server({
    port: process.env.NODE_DOCKER_PORT || 9000,
    host: "0.0.0.0", // For development: "localhost" -> if you want to run and test it locally, "0.0.0.0" -> if you want to run and test it with docker container
  }); // For production: "YOUR_VPS_IP" -> if you want to run and test it in virtual private server

  await sequelize
    .authenticate()
    .then(() => {
      console.log("Success!");
    })
    .catch((err) => {
      console.log(err);
    });

  // await sequelize.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)
  await sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  // await sequelize.sync({ alter: true }) // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
