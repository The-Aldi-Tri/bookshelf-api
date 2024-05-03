const Hapi = require("@hapi/hapi");
const bookRoutes = require("./routes");

async function init() {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(bookRoutes);

  await server.start();
}

init();
