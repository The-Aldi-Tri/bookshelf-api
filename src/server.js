const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const sequelize = require("./connection/database");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route(routes);

  await sequelize.sync();

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
