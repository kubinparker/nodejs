"use strict";
const Path = require("path");
const Home = require("./controllers/home");

module.exports = [
	{
		method: "GET",
		path: "/",
		handler: Home,
		config: {
			description: "Gets all the notes available"
		}
	},
	{
		method: "POST",
		path: "/note",
		handler: (request, h) => {
		  	return "New note";
		},
		config: {
		  	description: "Adds a new note"
		}
	},
	{
		method: "GET",
		path: "/note/{slug}",
		handler: (request, h) => {
			return "This is a note";
		},
		config: {
			description: "Gets the content of a note"
		}
	},
	{
		method: "PUT",
		path: "/note/{slug}",
		handler: (request, h) => {
			return "Edit a note";
		},
		config: {
			description: "Updates the selected note"
		}
	},
	{
		method: "DELETE",
		path: "/note/{slug}",
		handler: (request, h) => {
			return "This note no longer exists";
		},
		config: {
			description: "Deletes the selected note"
		}
	}
];
