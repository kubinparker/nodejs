"use strict";

const {Note} = require('../models/');
const Slugify = require('flug');
const Path = require('path');

module.exports = {
    create: async (request, h) => {

        const result = await Note.create({
            date: new Date(),
            title: request.payload.noteTitle,
            slug: Slugify(request.payload.noteTitle, { lower: true }),
            description: request.payload.noteDescription,
            content: request.payload.noteContent
        });
      
        // Generate a new note with the 'result' data
        return result;
    },

    read: async (request, h) => {
        const note = await Note.findOne({
            where: {
                slug: request.params.slug
            }
        });
        return note;
    },

    update: async (request, h) => {

    }
};