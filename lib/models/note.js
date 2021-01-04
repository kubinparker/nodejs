"use strict";

const Moment = require("moment");

module.exports = (sequelize, DataTypes) => {

    const Note = sequelize.define("Note", {
        date: {
            type: DataTypes.DATE,
            get: function() {
                return Moment(this.getDataValue("date")).format("MMMM Do, YYYY");
            }
        },
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        description: DataTypes.STRING,
        content: DataTypes.STRING,
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    // alter: true => can change table contruct and save old data
    Note.sync({ alter: true })

    return Note;

};