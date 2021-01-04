"use strict";

const Fs = require('fs');
const Pug = require("pug");
const {Note} = require('../models/');
const Slugify = require('slug');
const Path = require('path');

module.exports = {
    create: async (request, h) => {
        const uploadFile = request.payload.upload || {};
        const publicPath = 'static/public';
        const uploadFolder = Path.join(__dirname,'..','..', publicPath, 'uploads');
        let uploadName = '';

        if (Object.keys(uploadFile).length) {
            uploadName = Path.basename(uploadFile.filename);
            const uploadPath = uploadFile.path;
            const destination = Path.join(uploadFolder, uploadName);

            Fs.mkdir(uploadFolder, { recursive: true }, (errors) => {
                if (errors) throw errors;
            });
            Fs.rename(uploadPath, destination, (err) => {
                if (err) throw err;
            });
        }

        const result = await Note.create({
            date: new Date(),
            title: request.payload.noteTitle,
            slug: Slugify(request.payload.noteTitle, { lower: true }),
            description: request.payload.noteDescription,
            content: request.payload.noteContent,
            image: uploadName
        });
      
        // Generate a new note with the 'result' data
        return Pug.renderFile(
            Path.join(__dirname, "../views/components/note.pug"),
            {
                note: result
            }
        );
    },

    read: async (request, h) => {
        const note = await Note.findOne({
            where: {
                slug: request.params.slug
            }
        });
        return h.view('note', {
            note,
            page: `${note.title} - Notes Borad`,
            description: note.description
        });
    },

    update: async (request, h) => {
        const values = {
            title: request.payload.noteTitle,
            description: request.payload.noteDescription,
            content: request.payload.noteContent
        };
        
        const options = {
            where: {
                slug: request.params.slug
            }
        };
        
        await Note.update(values, options);
        const result = await Note.findOne(options);
        
        return Pug.renderFile(
            Path.join(__dirname, "../views/components/note.pug"),
            {
                note: result
            }
        );
    },

    delete: async (request, h) => {
        await Note.destroy({
            where: {
                slug: request.params.slug
            }
        });
    
        return h.redirect("/");
    }
};