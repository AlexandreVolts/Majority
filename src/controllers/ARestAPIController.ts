import express = require("express");
import IController from "./IController";

/**
 * This object create a Rest API Controller by instanciating all routes of a REST Controller
 * You'll need to create a child class of this one when you will need to implement actions for each routes.
 */
export default abstract class ARestAPIController implements IController
{
	constructor(app:express.Express, route:string)
	{
		app.get(`${route}/:id`, this.get);
		app.get(route, this.getAll);
		app.post(route, this.post);
		app.put(`${route}/:id`, this.put);
		app.delete(`${route}/:id`, this.delete);
	}
	
	protected abstract get(req:express.Request, res:express.Response):void;
	protected abstract getAll(req:express.Request, res:express.Response):void;
	protected abstract post(req:express.Request, res:express.Response):void;
	protected abstract put(req:express.Request, res:express.Response):void;
	protected abstract delete(req:express.Request, res:express.Response):void;
};