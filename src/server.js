const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const sequelize = require("./connections/database");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route(routes);

  // await sequelize.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)
  await sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  // await sequelize.sync({ alter: true }) // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
