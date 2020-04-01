import express = require("express");
import IController from "./IController";

/**
 * This object create a Rest API Controller by instanciating all routes of a REST Controller
 * You'll need to create a child class of this one when you will need to implement actions for each routes.
 */
export default abstract class ARestAPIController implements IController
{
	constructor(private app:express.Express, private readonly ROUTE:string)
	{
		
	}
	
	/**
	 * Link the routes to their corresponding HTTP request.
	 * This method MUST be called, otherwise the Express app will not care about your routes.
	 */
	public initRoutes():void
	{
		this.app.get(`${this.ROUTE}/:id`, this.get);
		this.app.get(`${this.ROUTE}`, this.getAll);
		this.app.post(`${this.ROUTE}`, this.post);
		this.app.put(`${this.ROUTE}/:id`, this.put);
		this.app.delete(`${this.ROUTE}/:id`, this.delete);
	}
	protected abstract get(req:express.Request, res:express.Response):void;
	protected abstract getAll(req:express.Request, res:express.Response):void;
	protected abstract post(req:express.Request, res:express.Response):void;
	protected abstract put(req:express.Request, res:express.Response):void;
	protected abstract delete(req:express.Request, res:express.Response):void;
};