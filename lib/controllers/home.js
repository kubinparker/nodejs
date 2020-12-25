"use strict";

const Models = require("../models/");

module.exports = async (request, h) => {
    const result = await Models.Note.findAll({
        order: [["date", "DESC"]]
    });

    return {
        data: {
            notes: result
        },
        page: "Home — Notes Board",
        description: "Welcome to my Notes Board"
    };
};