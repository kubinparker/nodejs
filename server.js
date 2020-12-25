"use strict";

const Hapi = require("hapi");
const Settings = require("./settings");
const Routes = require("./lib/routes");
const Models = require("./lib/models/");


const init = async () => {
    const server = new Hapi.Server({ port: Settings.port });

    server.route(Routes);
    await Models.sequelize.sync();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();