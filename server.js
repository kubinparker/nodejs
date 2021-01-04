"use strict";

const Path = require("path");
const Hapi = require("@hapi/hapi");

const Settings = require("./settings");
const Routes = require("./lib/routes");
const Models = require("./lib/models/");


const init = async () => {
    /**
     * Create server and set port for server
     */
    const server = new Hapi.Server({ port: Settings.port });
    /**
     * hapi/vision: enable the view functionality in our server
     * hapi/inert: define folder as public to view
     */
    await server.register([require("@hapi/vision"), require("@hapi/inert")]);
    /**
     * Set path for view folder
     */
    server.views({
        engines: { pug: require("pug") },
        path: Path.join(__dirname, "lib/views"),
        compileOptions: {
            pretty: false
        },
        isCached: Settings.env === "production"
    });
    /**
     * Set route
     */
    server.route(Routes);
    /**
     * Connect to database and mapping with table
     */
    await Models.sequelize.sync();
    /**
     * Sever running
     */
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();